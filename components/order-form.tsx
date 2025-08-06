"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, ShoppingBag, User, Phone, Mail, MapPin } from "lucide-react"
import { useCart } from "./cart-context"
import { sendOrderNotification } from "@/lib/email"

interface OrderFormProps {
  onClose: () => void
}

export default function OrderForm({ onClose }: OrderFormProps) {
  const { cartItems, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create order data
      const orderData = {
        id: Date.now(),
        customer: formData,
        items: cartItems,
        total,
        totalItems,
        status: "Pending",
        date: new Date().toISOString(),
      }

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      existingOrders.unshift(orderData) // Add to beginning of array
      localStorage.setItem("orders", JSON.stringify(existingOrders))

      // Get admin email from settings
      const websiteSettings = JSON.parse(localStorage.getItem("websiteSettings") || "{}")
      const adminEmail = websiteSettings.contactInfo?.adminEmail || "noumantahir505@gmail.com"

      // Send notification
      await sendOrderNotification(orderData, adminEmail)

      // Clear cart
      clearCart()

      alert("✅ Order placed successfully! We will contact you soon. Admin has been notified via email.")
      onClose()
    } catch (error) {
      console.error("Failed to place order:", error)
      alert("❌ Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-lg shadow-xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6" />
              <h2 className="text-xl font-bold">Complete Your Order</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Order Summary */}
          <div className="p-6 border-b bg-gray-50">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">Rs {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t font-bold text-lg">
              <span>Total:</span>
              <span className="text-amber-600">Rs {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name *</span>
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
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number *</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="03001234567"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email Address</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="address" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Delivery Address *</span>
              </Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="Enter your complete delivery address"
                rows={3}
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
                placeholder="Enter your city"
              />
            </div>

            <div>
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special instructions for delivery..."
                rows={2}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Payment Information</h4>
              <p className="text-sm text-blue-700">
                Payment will be collected on delivery (Cash on Delivery). Our team will contact you to confirm your
                order and delivery details. Admin will be notified immediately via email.
              </p>
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
