"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Filter, Beaker } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/components/cart-context"

export default function ShopPage() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sortBy, setSortBy] = useState("name")

  // Default chemical products
  const defaultProducts = [
    {
      id: 1,
      name: "Henyle Acetate Premium",
      price: 2800,
      originalPrice: 3500,
      image: "/placeholder.svg?height=300&width=200&text=Henyle+Acetate",
      description: "High-grade henyle acetate for premium fragrance formulations",
      quantity: 15,
      rating: 4.8,
      reviews: 124,
      badge: "PREMIUM",
    },
    {
      id: 2,
      name: "Benzyl Benzoate Pure",
      price: 2200,
      originalPrice: 2750,
      image: "/placeholder.svg?height=300&width=200&text=Benzyl+Benzoate",
      description: "Pure benzyl benzoate compound for chemical synthesis",
      quantity: 8,
      rating: 4.7,
      reviews: 89,
      badge: "PURE",
    },
    {
      id: 3,
      name: "Aldehyde C-12 MNA",
      price: 3200,
      originalPrice: 4000,
      image: "/placeholder.svg?height=300&width=200&text=Aldehyde+C12",
      description: "Aldehyde C-12 MNA for sophisticated fragrance notes",
      quantity: 12,
      rating: 4.9,
      reviews: 156,
      badge: "TOP GRADE",
    },
    {
      id: 4,
      name: "Essential Oil Base",
      price: 1800,
      originalPrice: 2250,
      image: "/placeholder.svg?height=300&width=200&text=Essential+Oil",
      description: "Premium essential oil base for natural fragrances",
      quantity: 20,
      rating: 4.6,
      reviews: 67,
      badge: "NATURAL",
    },
    {
      id: 5,
      name: "Aromatic Compound Mix",
      price: 2500,
      originalPrice: 3125,
      image: "/placeholder.svg?height=300&width=200&text=Aromatic+Mix",
      description: "Complex aromatic compound mixture for advanced formulations",
      quantity: 10,
      rating: 4.5,
      reviews: 78,
      badge: "COMPLEX",
    },
    {
      id: 6,
      name: "Synthetic Musk Base",
      price: 3500,
      originalPrice: 4375,
      image: "/placeholder.svg?height=300&width=200&text=Synthetic+Musk",
      description: "High-quality synthetic musk for long-lasting fragrances",
      quantity: 6,
      rating: 4.9,
      reviews: 203,
      badge: "EXCLUSIVE",
    },
  ]

  useEffect(() => {
    // Load products from admin panel or use defaults
    const savedProducts = localStorage.getItem("adminProducts")
    if (savedProducts) {
      const adminProducts = JSON.parse(savedProducts)
      setProducts(adminProducts)
      setFilteredProducts(adminProducts)
    } else {
      setProducts(defaultProducts)
      setFilteredProducts(defaultProducts)
    }

    // Listen for product updates
    const handleStorageChange = () => {
      const savedProducts = localStorage.getItem("adminProducts")
      if (savedProducts) {
        const adminProducts = JSON.parse(savedProducts)
        setProducts(adminProducts)
        setFilteredProducts(adminProducts)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("websiteSettingsUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("websiteSettingsUpdated", handleStorageChange)
    }
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Sort products
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, sortBy])

  const handleAddToCart = (product) => {
    if (product.quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }
  }

  return (
    <div>
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Beaker className="w-8 h-8 text-amber-600 mr-3" />
            <h1 className="text-4xl font-bold">CHEMICAL SOLUTIONS CATALOG</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover our comprehensive range of premium chemical solutions for fragrance manufacturing. From henyle
            compounds to essential oils, we provide high-quality ingredients for professional use.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">Sort by:</span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-amber-500"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Beaker className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No chemical products found</h3>
              <p className="text-gray-500">
                Try adjusting your filters or check back later for new chemical solutions.
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} chemical products
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group border"
                  >
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <Badge className="absolute top-3 left-3 bg-amber-600 text-white">{product.badge}</Badge>
                      )}
                      {product.originalPrice && (
                        <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                      {product.quantity === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Badge variant="destructive" className="text-lg px-4 py-2">
                            OUT OF STOCK
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{product.description}</p>

                      {product.rating && (
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {product.rating} ({product.reviews || 0} reviews)
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-amber-600">Rs {product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                              Rs {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <Badge
                          variant={
                            product.quantity === 0 ? "destructive" : product.quantity <= 5 ? "secondary" : "default"
                          }
                          className="text-xs"
                        >
                          {product.quantity === 0
                            ? "Out of Stock"
                            : product.quantity <= 5
                              ? `Low Stock: ${product.quantity} units`
                              : `In Stock: ${product.quantity} units`}
                        </Badge>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.quantity === 0}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white disabled:bg-gray-400"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.quantity === 0 ? "OUT OF STOCK" : "ADD TO CART"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Chemical Safety Notice */}
      <section className="py-12 bg-amber-50 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-amber-800">⚠️ Chemical Safety Notice</h3>
            <p className="text-gray-700 mb-4">
              All chemical products are intended for professional use only. Please ensure proper handling, storage, and
              safety measures are followed according to industry standards.
            </p>
            <p className="text-sm text-gray-600">
              For technical specifications, safety data sheets, or bulk orders, please contact our technical support
              team.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
