// Google Drive integration for data backup
declare global {
  interface Window {
    gapi: any
  }
}

// Configuration - these should be set in environment variables
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "your_google_client_id_here"
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "your_google_api_key_here"
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
const SCOPES = "https://www.googleapis.com/auth/drive.file"

let isGapiInitialized = false
let isGoogleDriveReady = false

export const initializeGoogleDrive = async (): Promise<boolean> => {
  try {
    // Check if configuration is available
    if (GOOGLE_CLIENT_ID === "your_google_client_id_here" || GOOGLE_API_KEY === "your_google_api_key_here") {
      console.warn("Google Drive not configured. Using localStorage only.")
      return false
    }

    if (typeof window === "undefined") {
      return false
    }

    // Load Google API script if not already loaded
    if (!window.gapi) {
      await loadGoogleAPI()
    }

    if (isGapiInitialized) {
      return isGoogleDriveReady
    }

    // Initialize Google API
    await new Promise<void>((resolve, reject) => {
      window.gapi.load("client:auth2", async () => {
        try {
          await window.gapi.client.init({
            apiKey: GOOGLE_API_KEY,
            clientId: GOOGLE_CLIENT_ID,
            discoveryDocs: [DISCOVERY_DOC],
            scope: SCOPES,
          })

          isGapiInitialized = true
          isGoogleDriveReady = true
          resolve()
        } catch (error) {
          console.error("Failed to initialize Google API:", error)
          isGoogleDriveReady = false
          reject(error)
        }
      })
    })

    return isGoogleDriveReady
  } catch (error) {
    console.error("Failed to initialize Google Drive:", error)
    isGoogleDriveReady = false
    return false
  }
}

const loadGoogleAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://apis.google.com/js/api.js"
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load Google API script"))
    document.head.appendChild(script)
  })
}

export const authenticateGoogleDrive = async (): Promise<boolean> => {
  try {
    if (!isGoogleDriveReady) {
      const initialized = await initializeGoogleDrive()
      if (!initialized) {
        return false
      }
    }

    const authInstance = window.gapi.auth2.getAuthInstance()

    if (!authInstance.isSignedIn.get()) {
      await authInstance.signIn()
    }

    return authInstance.isSignedIn.get()
  } catch (error) {
    console.error("Google Drive authentication failed:", error)
    return false
  }
}

export const saveData = async (fileName: string, data: any): Promise<boolean> => {
  try {
    // Always save to localStorage first
    localStorage.setItem(fileName, JSON.stringify(data))

    // Try to save to Google Drive if available
    if (!isGoogleDriveReady) {
      console.log("Google Drive not available, data saved to localStorage only")
      return true
    }

    const authInstance = window.gapi.auth2.getAuthInstance()
    if (!authInstance.isSignedIn.get()) {
      console.log("Not signed in to Google Drive, data saved to localStorage only")
      return true
    }

    const fileContent = JSON.stringify(data, null, 2)
    const boundary = "-------314159265358979323846"
    const delimiter = "\r\n--" + boundary + "\r\n"
    const close_delim = "\r\n--" + boundary + "--"

    const metadata = {
      name: `${fileName}.json`,
      parents: ["appDataFolder"],
    }

    const multipartRequestBody =
      delimiter +
      "Content-Type: application/json\r\n\r\n" +
      JSON.stringify(metadata) +
      delimiter +
      "Content-Type: application/json\r\n\r\n" +
      fileContent +
      close_delim

    // Check if file exists
    const existingFiles = await window.gapi.client.drive.files.list({
      q: `name='${fileName}.json' and parents in 'appDataFolder'`,
      spaces: "appDataFolder",
    })

    let request
    if (existingFiles.result.files.length > 0) {
      // Update existing file
      const fileId = existingFiles.result.files[0].id
      request = window.gapi.client.request({
        path: `https://www.googleapis.com/upload/drive/v3/files/${fileId}`,
        method: "PATCH",
        params: {
          uploadType: "multipart",
        },
        headers: {
          "Content-Type": `multipart/related; boundary="${boundary}"`,
        },
        body: multipartRequestBody,
      })
    } else {
      // Create new file
      request = window.gapi.client.request({
        path: "https://www.googleapis.com/upload/drive/v3/files",
        method: "POST",
        params: {
          uploadType: "multipart",
        },
        headers: {
          "Content-Type": `multipart/related; boundary="${boundary}"`,
        },
        body: multipartRequestBody,
      })
    }

    await request
    console.log(`Data saved to Google Drive: ${fileName}`)
    return true
  } catch (error) {
    console.error("Failed to save to Google Drive:", error)
    // Data is still saved to localStorage, so return true
    return true
  }
}

export const loadData = async (fileName: string): Promise<any> => {
  try {
    // Try to load from Google Drive first if available
    if (isGoogleDriveReady) {
      const authInstance = window.gapi.auth2.getAuthInstance()
      if (authInstance.isSignedIn.get()) {
        try {
          const files = await window.gapi.client.drive.files.list({
            q: `name='${fileName}.json' and parents in 'appDataFolder'`,
            spaces: "appDataFolder",
          })

          if (files.result.files.length > 0) {
            const fileId = files.result.files[0].id
            const file = await window.gapi.client.drive.files.get({
              fileId: fileId,
              alt: "media",
            })

            const data = JSON.parse(file.body)
            // Also save to localStorage for offline access
            localStorage.setItem(fileName, JSON.stringify(data))
            console.log(`Data loaded from Google Drive: ${fileName}`)
            return data
          }
        } catch (error) {
          console.warn("Failed to load from Google Drive, falling back to localStorage:", error)
        }
      }
    }

    // Fallback to localStorage
    const localData = localStorage.getItem(fileName)
    if (localData) {
      console.log(`Data loaded from localStorage: ${fileName}`)
      return JSON.parse(localData)
    }

    return null
  } catch (error) {
    console.error("Failed to load data:", error)
    return null
  }
}

export const isGoogleDriveConnected = (): boolean => {
  if (!isGoogleDriveReady) return false

  try {
    const authInstance = window.gapi.auth2.getAuthInstance()
    return authInstance.isSignedIn.get()
  } catch (error) {
    return false
  }
}

export const disconnectGoogleDrive = async (): Promise<boolean> => {
  try {
    if (!isGoogleDriveReady) return true

    const authInstance = window.gapi.auth2.getAuthInstance()
    if (authInstance.isSignedIn.get()) {
      await authInstance.signOut()
    }

    isGoogleDriveReady = false
    return true
  } catch (error) {
    console.error("Failed to disconnect Google Drive:", error)
    return false
  }
}
