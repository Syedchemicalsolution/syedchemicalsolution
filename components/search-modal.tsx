"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Search, ShoppingCart } from "lucide-react"
import { useCart } from "./cart-context"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [allProducts, setAllProducts] = useState([])

  // Default products
  const defaultProducts = [
    {
      id: 1,
      name: "Henyle Acetate Premium",
      price: 2800,
      originalPrice: 3500,
      image: "/placeholder.svg?height=300&width=200&text=Henyle+Acetate",
      description: "High-grade henyle acetate for premium fragrance formulations",
      quantity: 15,
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
      badge: "NATURAL",
    },
  ]

  useEffect(() => {
    // Load products from localStorage or use defaults
    const savedProducts = localStorage.getItem("adminProducts")
    if (savedProducts) {
      const products = JSON.parse(savedProducts)
      setAllProducts(products)
    } else {
      setAllProducts(defaultProducts)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setSearchResults(filtered)
  }, [searchQuery, allProducts])

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

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white rounded-lg shadow-xl z-50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Search Products</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        <div className="mt-4 text-center text-gray-500">
          <p>Start typing to search for products...</p>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {searchQuery.trim() === "" ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Start typing to search</h3>
              <p className="text-gray-500">Search for chemical products by name or description</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try searching with different keywords</p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      {product.badge && <Badge className="bg-amber-600 text-white text-xs">{product.badge}</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-amber-600">Rs {product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            Rs {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.quantity === 0}
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 text-white disabled:bg-gray-400"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
