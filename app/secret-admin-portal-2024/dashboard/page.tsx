"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")

  // Check authentication
  useEffect(() => {
    if (localStorage.getItem("adminLoggedIn") !== "true") {
      router.push("/secret-admin-portal-2024")
    }
  }, [router])

  // Mock data - ye real database se aayega
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Florenza",
      price: 2500,
      originalPrice: 3000,
      quantity: 15,
      image: "/placeholder.svg?height=200&width=200&text=Florenza",
      description: "Luxury floral fragrance for women",
      category: "Women",
    },
    {
      id: 2,
      name: "Coaliq",
      price: 3200,
      originalPrice: null,
      quantity: 0,
      image: "/placeholder.svg?height=200&width=200&text=Coaliq",
      description: "Bold masculine scent",
      category: "Men",
    },
    {
      id: 3,
      name: "Janah",
      price: 2800,
      originalPrice: 3200,
      quantity: 8,
      image: "/placeholder.svg?height=200&width=200&text=Janah",
      description: "Oriental fragrance",
      category: "Unisex",
    },
  ])

  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "Ahmed Ali",
      email: "ahmed@email.com",
      phone: "03001234567",
      product: "Florenza",
      quantity: 2,
      total: 5000,
      status: "Pending",
      date: "2024-01-15",
      address: "Karachi, Pakistan",
    },
    {
      id: 2,
      customerName: "Sara Khan",
      email: "sara@email.com",
      phone: "03009876543",
      product: "Janah",
      quantity: 1,
      total: 2800,
      status: "Completed",
      date: "2024-01-14",
      address: "Lahore, Pakistan",
    },
  ])

  const [settings, setSettings] = useState({
    siteName: "The Century Scents",
    logo: "/placeholder.svg?height=60&width=200&text=THE+CENTURY+SCENTS+LOGO",
    heroImage: "/placeholder.svg?height=600&width=1200&text=Luxury+Perfume+Hero+Image",
    heroTitle: "DISCOVER THE ESSENCE OF LUXURY",
    heroSubtitle: "Experience our exclusive collection of premium fragrances",
    adminEmail: "admin@thecenturyscents.com",
    phone1: "03300062483",
    phone2: "03335408761",
    email: "info@thecenturyscents.com",
    address: "Karachi, Pakistan",
  })

  // Product Management
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    quantity: "",
    image: "",
    description: "",
    category: "Men",
  })

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminLoginTime")
    router.push("/secret-admin-portal-2024")
  }

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        price: Number.parseInt(newProduct.price),
        originalPrice: newProduct.originalPrice ? Number.parseInt(newProduct.originalPrice) : null,
        quantity: Number.parseInt(newProduct.quantity),
        image: newProduct.image || "/placeholder.svg?height=200&width=200&text=" + newProduct.name.replace(" ", "+"),
        description: newProduct.description,
        category: newProduct.category,
      }
      setProducts([...products, product])
      setNewProduct({
        name: "",
        price: "",
        originalPrice: "",
        quantity: "",
        image: "",
        description: "",
        category: "Men",
      })
      alert("✅ Product added successfully!")
    } else {
      alert("❌ Please fill in all required fields!")
    }
  }

  const handleUpdateProduct = (id, updatedProduct) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)))
    setEditingProduct(null)
    alert("✅ Product updated successfully!")
  }

  const handleDeleteProduct = (id) => {
    if (confirm("⚠️ Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
      alert("✅ Product deleted successfully!")
    }
  }

  const handleUpdateSettings = () => {
    alert("✅ Settings updated successfully!")
  }

  const handleOrderStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    alert("✅ Order status updated!")
  }

  // Stats calculation
  const totalProducts = products.length
  const totalOrders = orders.length
  const pendingOrders = orders.filter((o) => o.status === "Pending").length
  const totalRevenue = orders.filter((o) => o.status === "Completed").reduce((sum, o) => sum + o.total, 0)
  const lowStockProducts = products.filter((p) => p.quantity <= 5 && p.quantity > 0).length
  const outOfStockProducts = products.filter((p) => p.quantity === 0).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">TC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">The Century Scents Management</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Products</p>
                      <p className="text-3xl font-bold">{totalProducts}</p>
                    </div>
                    <Package className="w-10 h-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Orders</p>
                      <p className="text-3xl font-bold">{totalOrders}</p>
                    </div>
                    <ShoppingCart className="w-10 h-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Pending Orders</p>
                      <p className="text-3xl font-bold">{pendingOrders}</p>
                    </div>
                    <Users className="w-10 h-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Total Revenue</p>
                      <p className="text-3xl font-bold">Rs {totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-10 h-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-600">
                    <AlertCircle className="w-5 h-5" />
                    <span>Stock Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">Out of Stock</span>
                      <Badge variant="destructive">{outOfStockProducts} Products</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium">Low Stock (≤5)</span>
                      <Badge variant="secondary">{lowStockProducts} Products</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3 p-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>New order received from Ahmed Ali</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Product "Coaliq" is out of stock</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Low stock alert for "Janah"</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Add New Product */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Product</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="productName">Product Name *</Label>
                    <Input
                      id="productName"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="productPrice">Price (Rs) *</Label>
                    <Input
                      id="productPrice"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price (Rs)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                      placeholder="For sale badge"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="productImage">Image URL</Label>
                    <Input
                      id="productImage"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Enter product description"
                    />
                  </div>
                </div>
                <Button onClick={handleAddProduct} className="mt-4 bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </CardContent>
            </Card>

            {/* Products List */}
            <Card>
              <CardHeader>
                <CardTitle>All Products ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="relative hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-bold text-amber-600 text-lg">Rs {product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              Rs {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <Badge
                            variant={
                              product.quantity === 0 ? "destructive" : product.quantity <= 5 ? "secondary" : "default"
                            }
                          >
                            {product.quantity === 0
                              ? "SOLD OUT"
                              : product.quantity <= 5
                                ? `Low Stock: ${product.quantity}`
                                : `Stock: ${product.quantity}`}
                          </Badge>
                          <Badge variant="outline">{product.category}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingProduct(product)}
                            className="flex-1"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex-1"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders ({orders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-4 font-semibold">Order ID</th>
                        <th className="text-left p-4 font-semibold">Customer</th>
                        <th className="text-left p-4 font-semibold">Contact</th>
                        <th className="text-left p-4 font-semibold">Product</th>
                        <th className="text-left p-4 font-semibold">Qty</th>
                        <th className="text-left p-4 font-semibold">Total</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Date</th>
                        <th className="text-left p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-mono">#{order.id}</td>
                          <td className="p-4">
                            <div>
                              <div className="font-semibold">{order.customerName}</div>
                              <div className="text-sm text-gray-500">{order.address}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">
                              <div>{order.email}</div>
                              <div>{order.phone}</div>
                            </div>
                          </td>
                          <td className="p-4 font-medium">{order.product}</td>
                          <td className="p-4">{order.quantity}</td>
                          <td className="p-4 font-bold text-green-600">Rs {order.total.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                order.status === "Completed"
                                  ? "default"
                                  : order.status === "Pending"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm">{order.date}</td>
                          <td className="p-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value)}
                              className="text-sm p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="adminEmail">Admin Email (for notifications)</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={settings.adminEmail}
                      onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone1">Phone Number 1</Label>
                    <Input
                      id="phone1"
                      value={settings.phone1}
                      onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone2">Phone Number 2</Label>
                    <Input
                      id="phone2"
                      value={settings.phone2}
                      onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleUpdateSettings} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Content Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="heroTitle">Hero Section Title</Label>
                    <Input
                      id="heroTitle"
                      value={settings.heroTitle}
                      onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="heroSubtitle">Hero Section Subtitle</Label>
                    <Textarea
                      id="heroSubtitle"
                      value={settings.heroSubtitle}
                      onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="heroImage">Hero Background Image URL</Label>
                    <Input
                      id="heroImage"
                      value={settings.heroImage}
                      onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="logo">Website Logo URL</Label>
                    <Input
                      id="logo"
                      value={settings.logo}
                      onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleUpdateSettings} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Update Content
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit Product: {editingProduct.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Price (Rs)</Label>
                  <Input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Original Price (Rs)</Label>
                  <Input
                    type="number"
                    value={editingProduct.originalPrice || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        originalPrice: e.target.value ? Number.parseInt(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={editingProduct.quantity}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, quantity: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleUpdateProduct(editingProduct.id, editingProduct)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Product
                </Button>
                <Button variant="outline" onClick={() => setEditingProduct(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
