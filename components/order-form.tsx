"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, ShoppingBag, User, Phone, MapPin, MessageSquare } from "lucide-react"
import { useCart } from "./cart-context"

interface OrderFormProps {
  isOpen: boolean
  onClose: () => void
  cartItems: any[]
  totalAmount: number
}

export function OrderForm({ isOpen, onClose, cartItems, totalAmount }: OrderFormProps) {
  const { clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create order object
      const order = {
        id: Date.now(),
        customer: formData,
        items: cartItems,
        total: totalAmount,
        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        date: new Date().toISOString(),
        status: "Pending",
      }

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      existingOrders.push(order)
      localStorage.setItem("orders", JSON.stringify(existingOrders))

      // Add notification
      const notification = {
        id: Date.now(),
        title: `New Order #${order.id}`,
        message: `${formData.name} placed an order worth Rs ${totalAmount.toLocaleString()}`,
        timestamp: new Date().toISOString(),
        read: false,
        orderId: order.id,
      }

      const existingNotifications = JSON.parse(localStorage.getItem("orderNotifications") || "[]")
      existingNotifications.unshift(notification)
      localStorage.setItem("orderNotifications", JSON.stringify(existingNotifications))

      // Send email notification
      await sendEmailNotification(order)

      // Clear cart and close form
      clearCart()
      onClose()

      alert("✅ Order placed successfully! We will contact you soon.")
    } catch (error) {
      console.error("Order submission error:", error)
      alert("❌ Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const sendEmailNotification = async (order: any) => {
    try {
      const emailConfig = JSON.parse(localStorage.getItem("emailJSConfig") || "{}")

      if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey || !emailConfig.adminEmail) {
        console.log("EmailJS not configured, skipping email notification")
        return
      }

      // Load EmailJS if not already loaded
      if (!window.emailjs) {
        const script = document.createElement("script")
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
        await new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      }

      // Initialize EmailJS
      window.emailjs.init(emailConfig.publicKey)

      const emailData = {
        to_email: emailConfig.adminEmail,
        subject: `🛒 New Order #${order.id} - Syed Chemical Solution`,
        customer_name: order.customer.name,
        customer_phone: order.customer.phone,
        customer_email: order.customer.email,
        order_id: order.id,
        total_amount: `Rs ${order.total.toLocaleString()}`,
        total_items: order.totalItems,
        order_date: new Date().toLocaleDateString(),
        customer_address: order.customer.address,
        customer_city: order.customer.city,
        customer_notes: order.customer.notes || "No special notes",
        admin_link: `${window.location.origin}/secret-admin-portal-2024/dashboard?order=${order.id}`,
        items_list: order.items
          .map((item) => `${item.name} x ${item.quantity} = Rs ${(item.price * item.quantity).toLocaleString()}`)
          .join(", "),
        message: `
New Order Details:
- Order ID: #${order.id}
- Customer: ${order.customer.name}
- Phone: ${order.customer.phone}
- Email: ${order.customer.email}
- Address: ${order.customer.address}, ${order.customer.city}
- Total: Rs ${order.total.toLocaleString()}
- Items: ${order.totalItems}

Items Ordered:
${order.items.map((item) => `• ${item.name} x ${item.quantity} = Rs ${(item.price * item.quantity).toLocaleString()}`).join("\n")}

Customer Notes: ${order.customer.notes || "None"}

Manage this order: ${window.location.origin}/secret-admin-portal-2024/dashboard?order=${order.id}
        `.trim(),
      }

      await window.emailjs.send(emailConfig.serviceId, emailConfig.templateId, emailData)
      console.log("Email notification sent successfully")
    } catch (error) {
      console.error("Failed to send email notification:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="w-6 h-6 mr-2 text-amber-600" />
            Complete Your Order
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Order Summary */}
        <div className="p-6 border-b bg-gray-50">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span className="font-semibold">Rs {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span className="text-amber-600">Rs {totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Customer Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="03xxxxxxxxx"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com (optional)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address" className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Complete Address *
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="House/Street address"
              />
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                placeholder="Your city"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              Special Instructions
            </Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any special instructions or notes (optional)"
              rows={3}
            />
          </div>

          {/* Payment Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💰 Payment Method</h4>
            <p className="text-blue-700 text-sm">
              <strong>Cash on Delivery (COD)</strong> - Pay when you receive your order
            </p>
            <p className="text-blue-600 text-xs mt-1">
              Free delivery on orders above Rs 2000 | Delivery charges: Rs 150 for orders below Rs 2000
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg"
          >
            {isSubmitting ? "Placing Order..." : `Place Order - Rs ${totalAmount.toLocaleString()}`}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By placing this order, you agree to our terms and conditions. We will contact you to confirm your order.
          </p>
        </form>
      </div>
    </div>
  )
}
