"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Truck, Shield, Award, Phone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-context"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: string
  description: string
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Premium Chemical Solution A",
    price: 2500,
    originalPrice: 3000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    description: "High-quality chemical solution for industrial applications",
  },
  {
    id: 2,
    name: "Fragrance Compound B",
    price: 1800,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 89,
    badge: "New",
    description: "Premium fragrance compound with long-lasting scent",
  },
  {
    id: 3,
    name: "Industrial Solvent C",
    price: 3200,
    originalPrice: 3800,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 156,
    description: "Professional-grade industrial solvent for various applications",
  },
  {
    id: 4,
    name: "Specialty Chemical D",
    price: 2200,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 98,
    badge: "Popular",
    description: "Specialized chemical compound for specific industrial needs",
  },
]

export default function HomePage() {
  const [heroAnimation, setHeroAnimation] = useState("fadeIn")
  const { addToCart } = useCart()

  useEffect(() => {
    // Load hero animation from localStorage (admin setting)
    const savedAnimation = localStorage.getItem("heroAnimation") || "fadeIn"
    setHeroAnimation(savedAnimation)
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        className={`relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 ${heroAnimation === "slideIn" ? "animate-slide-in" : heroAnimation === "bounceIn" ? "animate-bounce-in" : "animate-fade-in"}`}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">The Century Scents</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Premium Chemical Solutions & Fragrances for Industrial Excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Explore Products
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery across Pakistan</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">Premium quality chemicals and fragrances</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Professional guidance and customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our premium collection of chemical solutions and fragrances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 left-2" variant="secondary">
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-600">Rs {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          Rs {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button onClick={() => handleAddToCart(product)} className="w-full" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Custom Solutions?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our experts for customized chemical solutions tailored to your specific requirements
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Phone className="h-5 w-5 mr-2" />
            Contact Our Experts
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
