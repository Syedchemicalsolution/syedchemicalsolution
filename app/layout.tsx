import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Century Scents - Premium Chemical Solutions",
  description: "Experience our exclusive collection of premium chemical solutions and fragrances",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>

        {/* EmailJS Script */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window !== "undefined" && window.emailjs) {
              window.emailjs.init("YOUR_PUBLIC_KEY") // Replace with your EmailJS public key
            }
          }}
        />
      </body>
    </html>
  )
}
