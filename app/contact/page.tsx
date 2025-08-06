"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[300px] bg-black flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: "url('/placeholder.svg?height=300&width=1200&text=Contact+Background')",
          }}
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Contact</h1>
          <nav className="text-sm">
            <Link href="/" className="hover:text-amber-300">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <span>Contact</span>
          </nav>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* FAQ Section */}
            <div>
              <p className="text-amber-600 text-sm uppercase tracking-wide mb-2">INFORMATION QUESTIONS</p>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">FREQUENTLY ASKED QUESTIONS</h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📞</span>
                  <span className="text-gray-600">03300062483</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📞</span>
                  <span className="text-gray-600">03335498761</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">✉️</span>
                  <span className="text-gray-600">info@thecenturyscents.com</span>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Common Questions:</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">What are your shipping options?</h4>
                    <p className="text-gray-600 text-sm">
                      We offer free shipping across Pakistan with cash on delivery option.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">How long do the fragrances last?</h4>
                    <p className="text-gray-600 text-sm">Our perfumes are long-lasting with 6-8 hours of longevity.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Do you offer exchanges?</h4>
                    <p className="text-gray-600 text-sm">Yes, we have a 7-day return policy for unopened products.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <p className="text-amber-600 text-sm uppercase tracking-wide mb-2">INFORMATION ABOUT US</p>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">CONTACT US FOR ANY QUESTIONS</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3"
                >
                  {loading ? "SENDING..." : "SUBMIT"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
