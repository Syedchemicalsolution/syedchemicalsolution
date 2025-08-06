// Google Drive API integration
const GOOGLE_DRIVE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
const SCOPES = "https://www.googleapis.com/auth/drive.file"

let gapi: any
let tokenClient: any

export const initializeGoogleDrive = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false

  try {
    // Load Google APIs
    await new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://apis.google.com/js/api.js"
      script.onload = resolve
      document.head.appendChild(script)
    })

    await new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.onload = resolve
      document.head.appendChild(script)
    })

    // Initialize gapi
    gapi = (window as any).gapi
    await gapi.load("client", async () => {
      await gapi.client.init({
        apiKey: GOOGLE_DRIVE_API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      })
    })

    // Initialize Google Identity Services
    tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: SCOPES,
      callback: "", // Will be set later
    })

    return true
  } catch (error) {
    console.error("Failed to initialize Google Drive:", error)
    return false
  }
}

export const authenticateGoogleDrive = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!tokenClient) {
      resolve(false)
      return
    }

    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        resolve(false)
        return
      }
      resolve(true)
    }

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: "consent" })
    } else {
      tokenClient.requestAccessToken({ prompt: "" })
    }
  })
}

export const saveToGoogleDrive = async (fileName: string, data: any): Promise<boolean> => {
  try {
    const fileMetadata = {
      name: fileName,
      parents: ["appDataFolder"], // Store in app-specific folder
    }

    const form = new FormData()
    form.append("metadata", new Blob([JSON.stringify(fileMetadata)], { type: "application/json" }))
    form.append("file", new Blob([JSON.stringify(data)], { type: "application/json" }))

    const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${gapi.client.getToken().access_token}`,
      }),
      body: form,
    })

    return response.ok
  } catch (error) {
    console.error("Failed to save to Google Drive:", error)
    return false
  }
}

export const loadFromGoogleDrive = async (fileName: string): Promise<any> => {
  try {
    // Search for the file
    const response = await gapi.client.drive.files.list({
      q: `name='${fileName}' and parents in 'appDataFolder'`,
      spaces: "appDataFolder",
    })

    const files = response.result.files
    if (!files || files.length === 0) {
      return null
    }

    // Get the file content
    const fileId = files[0].id
    const fileResponse = await gapi.client.drive.files.get({
      fileId: fileId,
      alt: "media",
    })

    return JSON.parse(fileResponse.body)
  } catch (error) {
    console.error("Failed to load from Google Drive:", error)
    return null
  }
}

export const deleteFromGoogleDrive = async (fileName: string): Promise<boolean> => {
  try {
    // Search for the file
    const response = await gapi.client.drive.files.list({
      q: `name='${fileName}' and parents in 'appDataFolder'`,
      spaces: "appDataFolder",
    })

    const files = response.result.files
    if (!files || files.length === 0) {
      return true // File doesn't exist, consider it deleted
    }

    // Delete the file
    const fileId = files[0].id
    await gapi.client.drive.files.delete({
      fileId: fileId,
    })

    return true
  } catch (error) {
    console.error("Failed to delete from Google Drive:", error)
    return false
  }
}

// Fallback to localStorage if Google Drive fails
export const saveData = async (key: string, data: any): Promise<boolean> => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Failed to save data:", error)
    return false
  }
}

export const loadData = async (key: string): Promise<any> => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Failed to load data:", error)
    return null
  }
}
