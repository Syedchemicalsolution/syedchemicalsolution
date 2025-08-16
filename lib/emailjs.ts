// EmailJS integration for sending order notifications
declare global {
  interface Window {
    emailjs: any
  }
}

export const loadEmailJS = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false)
      return
    }

    if (window.emailjs) {
      resolve(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
    script.onload = () => {
      const config = JSON.parse(localStorage.getItem("emailJSConfig") || "{}")
      if (config.publicKey && window.emailjs) {
        window.emailjs.init(config.publicKey)
      }
      resolve(true)
    }
    script.onerror = () => resolve(false)
    document.head.appendChild(script)
  })
}

export const sendOrderNotification = async (orderData: any, adminEmail: string): Promise<boolean> => {
  try {
    // Load EmailJS if not already loaded
    const emailJSLoaded = await loadEmailJS()
    if (!emailJSLoaded) {
      console.warn("Failed to load EmailJS")
      return false
    }

    // Get EmailJS configuration
    const emailJSConfig = JSON.parse(localStorage.getItem("emailJSConfig") || "{}")

    if (!emailJSConfig.serviceId || !emailJSConfig.templateId || !emailJSConfig.publicKey) {
      console.warn("EmailJS not configured properly")
      return false
    }

    // Prepare email data
    const emailData = {
      to_email: emailJSConfig.adminEmail || adminEmail,
      subject: `🛒 New Order #${orderData.id} - The Century Scents`,
      customer_name: orderData.customer?.name || "Unknown Customer",
      customer_phone: orderData.customer?.phone || "Not provided",
      customer_email: orderData.customer?.email || "Not provided",
      order_id: orderData.id,
      total_amount: orderData.total?.toLocaleString() || "0",
      total_items: orderData.totalItems || 0,
      order_date: new Date(orderData.date).toLocaleDateString(),
      customer_address: orderData.customer?.address || "Not provided",
      customer_city: orderData.customer?.city || "Not provided",
      customer_notes: orderData.customer?.notes || "None",
      admin_link: `${window.location.origin}/secret-admin-portal-2024/dashboard?order=${orderData.id}`,
      items_list: (orderData.items || [])
        .map((item) => `${item.name} x ${item.quantity} = Rs ${(item.price * item.quantity).toLocaleString()}`)
        .join(", "),
      message: `
New Order Details:
- Order ID: #${orderData.id}
- Customer: ${orderData.customer?.name || "Unknown"}
- Phone: ${orderData.customer?.phone || "Not provided"}
- Total: Rs ${orderData.total?.toLocaleString() || "0"}
- Items: ${orderData.totalItems || 0}

Items Ordered:
${(orderData.items || [])
  .map((item) => `• ${item.name} x ${item.quantity} = Rs ${(item.price * item.quantity).toLocaleString()}`)
  .join("\n")}

Customer Details:
- Address: ${orderData.customer?.address || "Not provided"}
- City: ${orderData.customer?.city || "Not provided"}
- Notes: ${orderData.customer?.notes || "None"}

Admin Dashboard: ${window.location.origin}/secret-admin-portal-2024/dashboard?order=${orderData.id}
      `.trim(),
    }

    // Send email
    await window.emailjs.send(emailJSConfig.serviceId, emailJSConfig.templateId, emailData, emailJSConfig.publicKey)

    console.log("Order notification sent successfully")
    return true
  } catch (error) {
    console.error("Failed to send order notification:", error)
    return false
  }
}

export const testEmailConfiguration = async (): Promise<boolean> => {
  try {
    const testOrderData = {
      id: "TEST-" + Date.now(),
      customer: {
        name: "Test Customer",
        phone: "03001234567",
        email: "test@example.com",
        address: "Test Address, Test Street",
        city: "Karachi",
        notes: "This is a test order notification",
      },
      total: 2500,
      totalItems: 2,
      items: [
        { name: "Test Product 1", quantity: 1, price: 1500 },
        { name: "Test Product 2", quantity: 1, price: 1000 },
      ],
      date: new Date().toISOString(),
      status: "Pending",
    }

    const config = JSON.parse(localStorage.getItem("emailJSConfig") || "{}")
    return await sendOrderNotification(testOrderData, config.adminEmail || "test@example.com")
  } catch (error) {
    console.error("Test email failed:", error)
    return false
  }
}
