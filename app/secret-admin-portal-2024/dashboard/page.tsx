"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  LogOut,
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  Settings,
  Save,
  Palette,
  User,
  MessageSquare,
  Bell,
  Clock,
  Mail,
  Filter,
  Search,
  Download,
  Trash,
  Plus,
  Edit,
  Eye,
  EyeOff,
  Lock,
  RotateCcw,
  Home,
  TestTube,
  Globe,
  ImageIcon,
  Phone,
  Info,
  Cloud,
} from "lucide-react"

declare global {
  interface Window {
    emailjs: any
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(false)

  // Check for order parameter in URL
  const orderIdFromUrl = searchParams?.get("order")

  // Orders state
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderFilter, setOrderFilter] = useState("all")
  const [orderSearch, setOrderSearch] = useState("")
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    lowStockProducts: 0,
  })

  // Admin credentials state
  const [adminCredentials, setAdminCredentials] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // Website Settings State
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: "SYED CHEMICAL SOLUTION",
    logo: "",
    heroImage: "/hero-perfumes.png",
    heroTitle: "DISCOVER THE ESSENCE OF LUXURY",
    heroSubtitle: "Experience our exclusive collection of premium chemical solutions",
    heroAnimation: "fadeIn",
    contactInfo: {
      phone1: "03300062483",
      phone2: "03335408761",
      email: "info@syedchemicalsolution.com",
      whatsapp: "03300062483",
      adminEmail: "admin@syedchemicalsolution.com",
      address: "Karachi, Pakistan",
      businessHours: "Mon-Sat: 9:00 AM - 8:00 PM",
    },
    colors: {
      background: "#ffffff",
      headerBg: "#ffffff",
      headerText: "#374151",
      topBarBg: "#b45309",
      footerBg: "#1f2937",
      footerText: "#d1d5db",
      heroText: "#ffffff",
    },
  })

  // Products state
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Henyle Acetate Premium",
      price: 2800,
      originalPrice: 3500,
      image: "/placeholder.svg?height=300&width=200&text=Henyle+Acetate",
      description: "High-grade henyle acetate for premium chemical formulations",
      quantity: 15,
      rating: 4.8,
      reviews: 124,
      badge: "PREMIUM",
      category: "Chemical",
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
      category: "Chemical",
    },
    {
      id: 3,
      name: "Aldehyde C-12 MNA",
      price: 3200,
      originalPrice: 4000,
      image: "/placeholder.svg?height=300&width=200&text=Aldehyde+C12",
      description: "Aldehyde C-12 MNA for sophisticated chemical applications",
      quantity: 12,
      rating: 4.9,
      reviews: 156,
      badge: "TOP GRADE",
      category: "Chemical",
    },
    {
      id: 4,
      name: "Essential Oil Base",
      price: 1800,
      originalPrice: 2250,
      image: "/placeholder.svg?height=300&width=200&text=Essential+Oil",
      description: "Premium essential oil base for natural chemical solutions",
      quantity: 20,
      rating: 4.6,
      reviews: 67,
      badge: "NATURAL",
      category: "Chemical",
    },
  ])

  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    image: "",
    description: "",
    quantity: "",
    badge: "",
    category: "Chemical",
  })

  // EmailJS Configuration
  const [emailJSConfig, setEmailJSConfig] = useState({
    serviceId: "",
    templateId: "",
    publicKey: "",
    adminEmail: "",
  })

  // Google Drive Configuration
  const [googleDriveConfig, setGoogleDriveConfig] = useState({
    apiKey: "",
    folderId: "",
    enabled: false,
  })

  // Complete Content Management - ALL PAGES
  const [pageContent, setPageContent] = useState({
    home: {
      // Hero Section
      heroTitle: "DISCOVER THE ESSENCE OF LUXURY",
      heroSubtitle: "Experience our exclusive collection of premium chemical solutions and compounds",
      heroButtonText: "SHOP NOW",

      // Features Section
      feature1Title: "Free Shipping",
      feature1Subtitle: "On orders over Rs 2000",
      feature2Title: "Authentic Products",
      feature2Subtitle: "100% genuine chemical solutions",
      feature3Title: "24/7 Support",
      feature3Subtitle: "Technical support available",
      feature4Title: "Quality Guarantee",
      feature4Subtitle: "Premium chemical standards",

      // Products Section
      productsTitle: "FEATURED CHEMICAL SOLUTIONS",
      productsSubtitle: "Discover our most popular chemical compounds and solutions",
      viewAllButtonText: "VIEW ALL PRODUCTS",
      addToCartText: "ADD TO CART",
      outOfStockText: "OUT OF STOCK",
      saveText: "Save Rs",

      // Newsletter Section
      newsletterTitle: "STAY UPDATED",
      newsletterSubtitle:
        "Subscribe to our newsletter and be the first to know about new chemical solutions, exclusive offers, and technical updates.",
      newsletterPlaceholder: "Enter your email",
      subscribeButtonText: "SUBSCRIBE",
    },
    about: {
      // Hero Section
      pageTitle: "About us",
      breadcrumbHome: "Home",

      // Main Content
      historyTitle: "HISTORY OF CHEMICAL INDUSTRY",
      mainTitle: "About Syed Chemical Solution",
      paragraph1:
        "The chemical industry has been the backbone of modern civilization, providing essential compounds and solutions for various industries. From pharmaceuticals to manufacturing, chemicals play a crucial role in our daily lives.",
      paragraph2:
        "Today, the chemical industry combines traditional knowledge with cutting-edge technology to deliver high-quality solutions at competitive prices.",
      slogan: "Syed Chemical Solution's slogan: Quality Chemicals for Every Need.",
      paragraph3:
        "Led by experienced professionals, Syed Chemical Solution is more than just a supplier—it's a trusted partner. Our commitment to quality and customer satisfaction has made us a reliable source in the chemical industry.",
      paragraph4:
        "Syed Chemical Solution has established itself in the market by offering exceptional quality chemicals at competitive prices. Built on the belief that every business deserves access to premium chemicals without premium prices, we are a trusted name for those seeking reliable, pure, and affordable chemical solutions.",
      paragraph5:
        "What truly sets Syed Chemical Solution apart is our expertise in sourcing and supplying high-quality chemical compounds—delivering the same professional experience at competitive rates. Every product reflects our dedication to quality, attention to detail, and unwavering commitment to customer satisfaction.",
      paragraph6:
        "With Syed Chemical Solution, you don't just buy chemicals—you invest in quality, reliability, and excellence that speaks volumes.",

      // History Cards
      historyCard1Title: "Our company history and facts",
      historyCard1Text:
        "Founded with a vision to provide quality chemical solutions to industries across Pakistan, we have grown to become a trusted name in the chemical supply industry.",
      historyCard2Title: "Our commitment to excellence",
      historyCard2Text:
        "We believe in maintaining the highest standards of quality and purity in all our chemical products, ensuring customer satisfaction and safety.",
    },
    shop: {
      // Hero Section
      pageTitle: "Shop",
      breadcrumbHome: "Home",
      subtitle: "CHEMICAL SOLUTIONS",

      // Safety Notice
      safetyTitle: "⚠️ Chemical Safety Notice",
      safetyText:
        "All chemical products are intended for professional use only. Please ensure proper handling, storage, and safety measures are followed according to industry standards.",

      // Filter Section
      filterTitle: "FILTER BY PRICE",
      filterButton: "Filter",
      stockTitle: "STOCK STATUS",
      inStockText: "In Stock",
      outOfStockText: "Out of Stock",
      topRatedTitle: "TOP RATED PRODUCTS",

      // Product Actions
      addToCartText: "ADD TO CART",
      quickViewText: "Quick View",
      compareText: "Compare",
      wishlistText: "Add to Wishlist",

      // Sorting
      sortByText: "Sort by:",
      sortDefault: "Default",
      sortPriceLow: "Price: Low to High",
      sortPriceHigh: "Price: High to Low",
      sortName: "Name A-Z",
      sortRating: "Rating",
    },
    contact: {
      // Hero Section
      pageTitle: "Contact",
      breadcrumbHome: "Home",

      // FAQ Section
      faqTitle: "INFORMATION QUESTIONS",
      faqSubtitle: "FREQUENTLY ASKED QUESTIONS",

      // Contact Form Section
      contactTitle: "INFORMATION ABOUT US",
      contactSubtitle: "CONTACT US FOR ANY QUESTIONS",

      // Form Fields
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      phoneLabel: "Phone Number",
      companyLabel: "Company",
      messageLabel: "Your Message",
      submitButtonText: "SUBMIT",
      sendingText: "SENDING...",

      // FAQ Items
      faq1Question: "What are your shipping options?",
      faq1Answer: "We offer free shipping across Pakistan with cash on delivery option.",
      faq2Question: "How do you ensure chemical purity?",
      faq2Answer: "All our chemicals undergo rigorous quality testing and come with purity certificates.",
      faq3Question: "Do you offer bulk discounts?",
      faq3Answer: "Yes, we provide competitive bulk pricing for large orders and regular customers.",

      // Contact Info
      phone1: "03300062483",
      phone2: "03335498761",
      email: "info@syedchemicalsolution.com",
    },
    header: {
      // Top Bar
      topBarText: "Free shipping on orders over Rs 2000 | Call: 03300062483",

      // Navigation
      homeText: "Home",
      aboutText: "About",
      shopText: "Shop",
      contactText: "Contact",

      // Search
      searchPlaceholder: "Search products...",
      searchButtonText: "Search",

      // Cart
      cartText: "Cart",
      cartEmptyText: "Your cart is empty",
      viewCartText: "View Cart",
      checkoutText: "Checkout",
    },
    footer: {
      // Company Info
      companyTitle: "SYED CHEMICAL SOLUTION",
      companyDescription:
        "Your trusted source for premium chemical solutions and compounds. Quality, purity, and customer satisfaction are our top priorities.",

      // Quick Links
      quickLinksTitle: "Quick Links",
      homeLink: "Home",
      aboutLink: "About Us",
      shopLink: "Shop",
      contactLink: "Contact",
      privacyLink: "Privacy Policy",
      termsLink: "Terms of Service",

      // Contact Info
      contactTitle: "Contact Info",
      addressText: "Karachi, Pakistan",
      phoneText: "Phone:",
      emailText: "Email:",

      // Follow Us
      followTitle: "Follow Us",
      facebookText: "Facebook",
      instagramText: "Instagram",
      twitterText: "Twitter",
      whatsappText: "WhatsApp",

      // Copyright
      copyrightText: "© 2024 Syed Chemical Solution. All rights reserved.",
      developedText: "Developed with ❤️ for premium chemical solutions",
    },
  })

  // Image Management for ALL pages
  const [pageImages, setPageImages] = useState({
    home: {
      heroImage: "/hero-perfumes.png",
      featureIcon1: "/placeholder.svg?height=64&width=64&text=Truck",
      featureIcon2: "/placeholder.svg?height=64&width=64&text=Shield",
      featureIcon3: "/placeholder.svg?height=64&width=64&text=Headphones",
      featureIcon4: "/placeholder.svg?height=64&width=64&text=Award",
    },
    about: {
      heroImage: "/placeholder.svg?height=400&width=1200&text=About+Chemical+Solutions",
      processImage: "/placeholder.svg?height=400&width=500&text=Chemical+Process",
      collectionImage: "/placeholder.svg?height=400&width=500&text=Chemical+Collection",
      historyImage: "/placeholder.svg?height=300&width=400&text=Our+Company+History",
      teamImage: "/placeholder.svg?height=300&width=400&text=Our+Team",
    },
    shop: {
      heroImage: "/placeholder.svg?height=400&width=1200&text=Chemical+Solutions+Shop",
      categoryImage1: "/placeholder.svg?height=200&width=300&text=Industrial+Chemicals",
      categoryImage2: "/placeholder.svg?height=200&width=300&text=Laboratory+Chemicals",
      categoryImage3: "/placeholder.svg?height=200&width=300&text=Specialty+Chemicals",
    },
    contact: {
      heroImage: "/placeholder.svg?height=300&width=1200&text=Contact+Us",
      officeImage: "/placeholder.svg?height=300&width=400&text=Our+Office",
      mapImage: "/placeholder.svg?height=300&width=400&text=Location+Map",
    },
  })

  const [selectedContentPage, setSelectedContentPage] = useState("")
  const [selectedImagePage, setSelectedImagePage] = useState("")

  // Animation options
  const animations = [
    { id: "fadeIn", name: "Fade In", description: "Smooth fade in effect" },
    { id: "slideUp", name: "Slide Up", description: "Slides up from bottom" },
    { id: "slideLeft", name: "Slide Left", description: "Slides in from right" },
    { id: "zoomIn", name: "Zoom In", description: "Zooms in with scale effect" },
    { id: "bounce", name: "Bounce", description: "Bouncy entrance effect" },
  ]

  const contentPages = [
    { id: "home", name: "Home Page", icon: Home },
    { id: "about", name: "About Page", icon: Info },
    { id: "shop", name: "Shop Page", icon: ShoppingCart },
    { id: "contact", name: "Contact Page", icon: Phone },
    { id: "header", name: "Header", icon: Settings },
    { id: "footer", name: "Footer", icon: Settings },
  ]

  const imagePages = [
    { id: "home", name: "Home Page", icon: Home },
    { id: "about", name: "About Page", icon: Info },
    { id: "shop", name: "Shop Page", icon: ShoppingCart },
    { id: "contact", name: "Contact Page", icon: Phone },
  ]

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== "undefined" && localStorage.getItem("adminLoggedIn") !== "true") {
      router.push("/secret-admin-portal-2024")
      return
    }

    // Load data from storage
    loadDataFromStorage()
    loadNotifications()

    // If there's an order ID in URL, show that order
    if (orderIdFromUrl) {
      setActiveTab("orders")
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      const order = savedOrders.find((o) => o.id.toString() === orderIdFromUrl)
      if (order) {
        setSelectedOrder(order)
      }
    }
  }, [router, orderIdFromUrl])

  const loadNotifications = () => {
    try {
      const notifs = JSON.parse(localStorage.getItem("orderNotifications") || "[]")
      setNotifications(notifs)
      setUnreadCount(notifs.filter((n) => !n.read).length)
    } catch (error) {
      console.error("Failed to load notifications:", error)
      setNotifications([])
      setUnreadCount(0)
    }
  }

  const loadDataFromStorage = () => {
    try {
      // Load website settings
      const savedSettings = localStorage.getItem("websiteSettings")
      if (savedSettings) {
        setWebsiteSettings(JSON.parse(savedSettings))
      }

      // Load products
      const savedProducts = localStorage.getItem("adminProducts")
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts))
      }

      // Load orders
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      setOrders(savedOrders)

      // Calculate stats
      const totalOrders = savedOrders.length
      const pendingOrders = savedOrders.filter((o) => o.status === "Pending").length
      const completedOrders = savedOrders.filter((o) => o.status === "Completed").length
      const totalRevenue = savedOrders.reduce((sum, order) => sum + (order.total || 0), 0)

      setStats({
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue,
        totalProducts: products.length,
        lowStockProducts: products.filter((p) => p.quantity <= 5).length,
      })

      // Load content
      const savedContent = localStorage.getItem("pageContent")
      if (savedContent) {
        setPageContent(JSON.parse(savedContent))
      }

      // Load images
      const savedImages = localStorage.getItem("pageImages")
      if (savedImages) {
        setPageImages(JSON.parse(savedImages))
      }

      // Load EmailJS config
      const savedEmailConfig = localStorage.getItem("emailJSConfig")
      if (savedEmailConfig) {
        setEmailJSConfig(JSON.parse(savedEmailConfig))
      }

      // Load Google Drive config
      const savedGoogleDriveConfig = localStorage.getItem("googleDriveConfig")
      if (savedGoogleDriveConfig) {
        setGoogleDriveConfig(JSON.parse(savedGoogleDriveConfig))
      }
    } catch (error) {
      console.error("Failed to load data:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminLoginTime")
    router.push("/secret-admin-portal-2024")
  }

  // Save website settings
  const saveWebsiteSettings = () => {
    setIsLoading(true)
    localStorage.setItem("websiteSettings", JSON.stringify(websiteSettings))
    window.dispatchEvent(new Event("websiteSettingsUpdated"))
    setIsLoading(false)
    alert("✅ Website settings saved successfully!")
  }

  // Save page content
  const savePageContent = () => {
    setIsLoading(true)
    localStorage.setItem("pageContent", JSON.stringify(pageContent))
    window.dispatchEvent(new Event("websiteSettingsUpdated"))
    setIsLoading(false)
    alert("✅ Page content saved successfully!")
  }

  // Save page images
  const savePageImages = () => {
    setIsLoading(true)
    localStorage.setItem("pageImages", JSON.stringify(pageImages))
    window.dispatchEvent(new Event("websiteSettingsUpdated"))
    setIsLoading(false)
    alert("✅ Page images saved successfully!")
  }

  // Save products
  const saveProducts = () => {
    localStorage.setItem("adminProducts", JSON.stringify(products))
    window.dispatchEvent(new Event("websiteSettingsUpdated"))
  }

  // Add product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        price: Number.parseInt(newProduct.price),
        originalPrice: newProduct.originalPrice ? Number.parseInt(newProduct.originalPrice) : null,
        image: newProduct.image || `/placeholder.svg?height=300&width=200&text=${newProduct.name.replace(" ", "+")}`,
        description: newProduct.description,
        quantity: Number.parseInt(newProduct.quantity),
        badge: newProduct.badge,
        category: newProduct.category,
        rating: 4.5,
        reviews: 0,
      }

      const updatedProducts = [...products, product]
      setProducts(updatedProducts)
      saveProducts()

      setNewProduct({
        name: "",
        price: "",
        originalPrice: "",
        image: "",
        description: "",
        quantity: "",
        badge: "",
        category: "Chemical",
      })
      setShowAddProduct(false)
      alert("✅ Product added successfully!")
    } else {
      alert("❌ Please fill in all required fields!")
    }
  }

  // Update product
  const handleUpdateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    setProducts(updatedProducts)
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))
    window.dispatchEvent(new Event("websiteSettingsUpdated"))
    setEditingProduct(null)
    alert("✅ Product updated successfully!")
  }

  // Delete product
  const handleDeleteProduct = (id) => {
    if (confirm("⚠️ Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((p) => p.id !== id)
      setProducts(updatedProducts)
      localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))
      window.dispatchEvent(new Event("websiteSettingsUpdated"))
      alert("✅ Product deleted successfully!")
    }
  }

  // EmailJS functions
  const saveEmailJSConfig = () => {
    localStorage.setItem("emailJSConfig", JSON.stringify(emailJSConfig))
    alert("✅ EmailJS configuration saved successfully!")
  }

  // Google Drive functions
  const saveGoogleDriveConfig = () => {
    localStorage.setItem("googleDriveConfig", JSON.stringify(googleDriveConfig))
    alert("✅ Google Drive configuration saved successfully!")
  }

  const testGoogleDriveConnection = async () => {
    if (!googleDriveConfig.apiKey || !googleDriveConfig.folderId) {
      alert("❌ Please fill in API Key and Folder ID first!")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${googleDriveConfig.folderId}?key=${googleDriveConfig.apiKey}`,
      )

      if (response.ok) {
        const folderData = await response.json()
        alert(`✅ Google Drive connection successful! Folder: ${folderData.name}`)
      } else {
        throw new Error("Failed to connect to Google Drive")
      }
    } catch (error) {
      alert("❌ Google Drive connection failed. Please check your API Key and Folder ID.")
    } finally {
      setIsLoading(false)
    }
  }

  const testEmailNotification = async () => {
    if (
      !emailJSConfig.serviceId ||
      !emailJSConfig.templateId ||
      !emailJSConfig.publicKey ||
      !emailJSConfig.adminEmail
    ) {
      alert("❌ Please fill in all EmailJS configuration fields first!")
      return
    }

    setIsLoading(true)

    try {
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
      window.emailjs.init(emailJSConfig.publicKey)

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
          { name: "Test Chemical 1", quantity: 1, price: 1500 },
          { name: "Test Chemical 2", quantity: 1, price: 1000 },
        ],
        date: new Date().toISOString(),
        status: "Pending",
      }

      const emailData = {
        to_email: emailJSConfig.adminEmail,
        subject: `🛒 Test Order #${testOrderData.id} - Syed Chemical Solution`,
        customer_name: testOrderData.customer.name,
        customer_phone: testOrderData.customer.phone,
        customer_email: testOrderData.customer.email,
        order_id: testOrderData.id,
        total_amount: `Rs ${testOrderData.total.toLocaleString()}`,
        total_items: testOrderData.totalItems,
        order_date: new Date().toLocaleDateString(),
        customer_address: testOrderData.customer.address,
        customer_city: testOrderData.customer.city,
        customer_notes: testOrderData.customer.notes,
        admin_link: `${window.location.origin}/secret-admin-portal-2024/dashboard?order=${testOrderData.id}`,
        items_list: testOrderData.items
          .map((item) => `${item.name} x ${item.quantity} = Rs ${(item.price * item.quantity).toLocaleString()}`)
          .join(", "),
        message: `
Test Order Details:
- Order ID: #${testOrderData.id}
- Customer: ${testOrderData.customer.name}
- Phone: ${testOrderData.customer.phone}
- Total: Rs ${testOrderData.total.toLocaleString()}
- Items: ${testOrderData.totalItems}

This is a test email to verify EmailJS configuration.
        `.trim(),
      }

      await window.emailjs.send(emailJSConfig.serviceId, emailJSConfig.templateId, emailData)
      alert("✅ Test email sent successfully! Check your Gmail inbox and spam folder.")
    } catch (error) {
      console.error("Test email error:", error)
      alert("❌ Failed to send test email. Error: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Order management functions
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }

    // Recalculate stats
    const pendingOrders = updatedOrders.filter((o) => o.status === "Pending").length
    const completedOrders = updatedOrders.filter((o) => o.status === "Completed").length
    setStats((prev) => ({ ...prev, pendingOrders, completedOrders }))
  }

  const deleteOrder = (orderId) => {
    if (confirm("⚠️ Are you sure you want to delete this order?")) {
      const updatedOrders = orders.filter((order) => order.id !== orderId)
      setOrders(updatedOrders)
      localStorage.setItem("orders", JSON.stringify(updatedOrders))
      setSelectedOrder(null)
      alert("✅ Order deleted successfully!")
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = orderFilter === "all" || order.status?.toLowerCase() === orderFilter
    const matchesSearch =
      (order.customer?.name || "").toLowerCase().includes(orderSearch.toLowerCase()) ||
      (order.customer?.phone || "").includes(orderSearch) ||
      order.id.toString().includes(orderSearch)
    return matchesFilter && matchesSearch
  })

  const markNotificationRead = (notificationId) => {
    try {
      const updatedNotifications = notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      setNotifications(updatedNotifications)
      localStorage.setItem("orderNotifications", JSON.stringify(updatedNotifications))
      setUnreadCount(updatedNotifications.filter((n) => !n.read).length)
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const changeAdminPassword = () => {
    if (!adminCredentials.currentPassword || !adminCredentials.newPassword || !adminCredentials.confirmPassword) {
      alert("❌ Please fill in all password fields!")
      return
    }

    const storedCredentials = JSON.parse(localStorage.getItem("adminCredentials") || '{"password": "admin123"}')

    if (adminCredentials.currentPassword !== storedCredentials.password) {
      alert("❌ Current password is incorrect!")
      return
    }

    if (adminCredentials.newPassword !== adminCredentials.confirmPassword) {
      alert("❌ New passwords don't match!")
      return
    }

    if (adminCredentials.newPassword.length < 6) {
      alert("❌ New password must be at least 6 characters long!")
      return
    }

    const updatedCredentials = {
      ...storedCredentials,
      password: adminCredentials.newPassword,
    }

    localStorage.setItem("adminCredentials", JSON.stringify(updatedCredentials))

    setAdminCredentials({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    alert("✅ Admin password changed successfully!")
  }

  const resetOrdersHistory = () => {
    if (confirm("⚠️ Are you sure you want to delete all orders history? This action cannot be undone.")) {
      setOrders([])
      localStorage.setItem("orders", JSON.stringify([]))
      localStorage.setItem("orderNotifications", JSON.stringify([]))
      setStats((prev) => ({
        ...prev,
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalRevenue: 0,
      }))
      setNotifications([])
      setUnreadCount(0)
      alert("✅ Orders history has been reset successfully!")
    }
  }

  // Content field renderer
  const renderContentFields = () => {
    if (!selectedContentPage) return null

    const pageContentData = pageContent[selectedContentPage]
    const fields = Object.keys(pageContentData)

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {fields.map((field) => (
          <div key={field}>
            <Label htmlFor={field} className="capitalize text-sm font-medium">
              {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </Label>
            {field.includes("paragraph") || field.includes("subtitle") || field.includes("description") ? (
              <Textarea
                id={field}
                value={pageContentData[field]}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    [selectedContentPage]: {
                      ...pageContentData,
                      [field]: e.target.value,
                    },
                  })
                }
                rows={3}
                className="mt-1"
              />
            ) : (
              <Input
                id={field}
                value={pageContentData[field]}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    [selectedContentPage]: {
                      ...pageContentData,
                      [field]: e.target.value,
                    },
                  })
                }
                className="mt-1"
              />
            )}
          </div>
        ))}
      </div>
    )
  }

  // Image field renderer
  const renderImageFields = () => {
    if (!selectedImagePage) return null

    const pageImageData = pageImages[selectedImagePage]
    const fields = Object.keys(pageImageData)

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {fields.map((field) => (
          <div key={field}>
            <Label htmlFor={field} className="capitalize text-sm font-medium">
              {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </Label>
            <div className="space-y-2">
              <Input
                id={field}
                value={pageImageData[field]}
                onChange={(e) =>
                  setPageImages({
                    ...pageImages,
                    [selectedImagePage]: {
                      ...pageImageData,
                      [field]: e.target.value,
                    },
                  })
                }
                placeholder="Enter image URL"
                className="mt-1"
              />
              {pageImageData[field] && (
                <div className="border rounded-lg p-2">
                  <img
                    src={pageImageData[field] || "/placeholder.svg"}
                    alt={field}
                    className="w-full h-32 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=128&width=200&text=Image+Error"
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">SC</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-gray-600">{websiteSettings.siteName} Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="outline" size="sm" onClick={() => setActiveTab("notifications")} className="relative">
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </div>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2 bg-transparent text-xs sm:text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
            <span>Loading...</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Mobile Responsive Tabs */}
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5 sm:grid-cols-10 bg-white p-1 rounded-lg shadow-sm min-w-max">
              <TabsTrigger value="dashboard" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">Dash</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Orders</span>
                <span className="sm:hidden">Orders</span>
                {stats.pendingOrders > 0 && (
                  <Badge className="bg-red-500 text-white text-xs px-1 ml-1">{stats.pendingOrders}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
              >
                <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Notifications</span>
                <span className="sm:hidden">Notif</span>
                {unreadCount > 0 && <Badge className="bg-red-500 text-white text-xs px-1 ml-1">{unreadCount}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Products</span>
                <span className="sm:hidden">Prod</span>
              </TabsTrigger>
              <TabsTrigger value="website" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Website</span>
                <span className="sm:hidden">Web</span>
              </TabsTrigger>
              <TabsTrigger value="colors" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Colors</span>
                <span className="sm:hidden">Color</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <User className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Contact</span>
                <span className="sm:hidden">Contact</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Content</span>
                <span className="sm:hidden">Content</span>
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Images</span>
                <span className="sm:hidden">Images</span>
              </TabsTrigger>
              <TabsTrigger value="apis" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">APIs</span>
                <span className="sm:hidden">APIs</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Admin</span>
                <span className="sm:hidden">Admin</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-xs sm:text-sm">Total Orders</p>
                      <p className="text-xl sm:text-3xl font-bold">{stats.totalOrders}</p>
                    </div>
                    <ShoppingCart className="w-6 h-6 sm:w-10 sm:h-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-xs sm:text-sm">Pending Orders</p>
                      <p className="text-xl sm:text-3xl font-bold">{stats.pendingOrders}</p>
                    </div>
                    <Clock className="w-6 h-6 sm:w-10 sm:h-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-xs sm:text-sm">Total Products</p>
                      <p className="text-xl sm:text-3xl font-bold">{products.length}</p>
                    </div>
                    <Package className="w-6 h-6 sm:w-10 sm:h-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-xs sm:text-sm">Total Revenue</p>
                      <p className="text-lg sm:text-3xl font-bold">Rs {stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-6 h-6 sm:w-10 sm:h-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <Button
                      onClick={() => setActiveTab("orders")}
                      className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-xs sm:text-sm">View Orders</span>
                      {stats.pendingOrders > 0 && (
                        <Badge className="bg-red-500 text-white text-xs">{stats.pendingOrders} pending</Badge>
                      )}
                    </Button>
                    <Button
                      onClick={() => setActiveTab("products")}
                      className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-xs sm:text-sm">Manage Products</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("content")}
                      className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-xs sm:text-sm">Edit Content</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("apis")}
                      className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-xs sm:text-sm">Configure APIs</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                    <span>Recent Orders</span>
                    <Button onClick={() => setActiveTab("orders")} variant="outline" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-sm sm:text-base">#{order.id}</p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {order.customer?.name || "Unknown Customer"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm sm:text-base">Rs {(order.total || 0).toLocaleString()}</p>
                          <Badge
                            variant={order.status === "Pending" ? "secondary" : "default"}
                            className={
                              order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 text-xs"
                                : "bg-green-100 text-green-800 text-xs"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {orders.length === 0 && <p className="text-gray-500 text-center py-4 text-sm">No orders yet</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="text-lg sm:text-xl">Orders Management</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">Total: {orders.length}</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending: {stats.pendingOrders}</Badge>
                    <Badge className="bg-green-100 text-green-800 text-xs">Completed: {stats.completedOrders}</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <select
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">All Orders</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <Search className="w-4 h-4" />
                    <Input
                      placeholder="Search by customer name, phone, or order ID..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Orders List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Orders List */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Orders List</h3>
                    <div className="max-h-96 overflow-y-auto space-y-3">
                      {filteredOrders.map((order) => (
                        <Card
                          key={order.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedOrder?.id === order.id ? "ring-2 ring-amber-500" : ""
                          }`}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-sm sm:text-base">#{order.id}</span>
                                <Badge
                                  variant={order.status === "Pending" ? "secondary" : "default"}
                                  className={
                                    order.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800 text-xs"
                                      : order.status === "Completed"
                                        ? "bg-green-100 text-green-800 text-xs"
                                        : "bg-red-100 text-red-800 text-xs"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              <span className="font-bold text-amber-600 text-sm sm:text-base">
                                Rs {(order.total || 0).toLocaleString()}
                              </span>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              <p className="font-semibold">{order.customer?.name || "Unknown Customer"}</p>
                              <p>{order.customer?.phone || "No phone"}</p>
                              <p>{order.totalItems || 0} items</p>
                              <p>{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {filteredOrders.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No orders found</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Order Details</h3>
                    {selectedOrder ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                            <span className="text-lg">Order #{selectedOrder.id}</span>
                            <div className="flex items-center space-x-2">
                              <select
                                value={selectedOrder.status}
                                onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                              <Button onClick={() => deleteOrder(selectedOrder.id)} variant="destructive" size="sm">
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Customer Information */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <User className="w-4 h-4 mr-2" />
                              Customer Information
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                              <p>
                                <strong>Name:</strong> {selectedOrder.customer?.name || "Unknown"}
                              </p>
                              <p>
                                <strong>Phone:</strong> {selectedOrder.customer?.phone || "Not provided"}
                              </p>
                              <p>
                                <strong>Email:</strong> {selectedOrder.customer?.email || "Not provided"}
                              </p>
                              <p>
                                <strong>Address:</strong> {selectedOrder.customer?.address || "Not provided"}
                              </p>
                              <p>
                                <strong>City:</strong> {selectedOrder.customer?.city || "Not provided"}
                              </p>
                              {selectedOrder.customer?.notes && (
                                <p>
                                  <strong>Notes:</strong> {selectedOrder.customer.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Order Items */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Package className="w-4 h-4 mr-2" />
                              Order Items
                            </h4>
                            <div className="space-y-3">
                              {(selectedOrder.items || []).map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div>
                                      <p className="font-semibold text-sm">{item.name}</p>
                                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-sm">
                                      Rs {((item.price || 0) * (item.quantity || 0)).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      Rs {(item.price || 0).toLocaleString()} each
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <DollarSign className="w-4 h-4 mr-2" />
                              Order Summary
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Total Items:</span>
                                <span>{selectedOrder.totalItems || 0}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Order Date:</span>
                                <span>{new Date(selectedOrder.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Status:</span>
                                <Badge
                                  variant={selectedOrder.status === "Pending" ? "secondary" : "default"}
                                  className={
                                    selectedOrder.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800 text-xs"
                                      : selectedOrder.status === "Completed"
                                        ? "bg-green-100 text-green-800 text-xs"
                                        : "bg-red-100 text-red-800 text-xs"
                                  }
                                >
                                  {selectedOrder.status}
                                </Badge>
                              </div>
                              <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-bold text-base">
                                  <span>Total Amount:</span>
                                  <span className="text-amber-600">
                                    Rs {(selectedOrder.total || 0).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            <Button onClick={() => window.print()} variant="outline" className="flex-1">
                              <Download className="w-4 h-4 mr-2" />
                              Print Order
                            </Button>
                            <Button
                              onClick={() => {
                                const whatsappMessage = `Hello ${selectedOrder.customer?.name || "Customer"}, your order #${selectedOrder.id} status has been updated to: ${selectedOrder.status}. Total: Rs ${(selectedOrder.total || 0).toLocaleString()}`
                                const phone = (selectedOrder.customer?.phone || "").replace(/\D/g, "")
                                if (phone) {
                                  window.open(
                                    `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`,
                                    "_blank",
                                  )
                                } else {
                                  alert("No phone number available for this customer")
                                }
                              }}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              WhatsApp Customer
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center text-gray-500">
                          <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Select an order to view details</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">{unreadCount} unread</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                        }`}
                        onClick={() => markNotificationRead(notification.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                            <p className="text-gray-600 mt-1 text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                          {!notification.read && <div className="w-3 h-3 bg-blue-500 rounded-full ml-4 mt-1"></div>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>Product Management</span>
                  </div>
                  <Button onClick={() => setShowAddProduct(true)} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add Product Form */}
                {showAddProduct && (
                  <Card className="mb-6 border-2 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-700">Add New Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="newName">Product Name *</Label>
                          <Input
                            id="newName"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            placeholder="Enter product name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPrice">Price (Rs) *</Label>
                          <Input
                            id="newPrice"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            placeholder="Enter price"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newOriginalPrice">Original Price (Rs)</Label>
                          <Input
                            id="newOriginalPrice"
                            type="number"
                            value={newProduct.originalPrice}
                            onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                            placeholder="For discount badge"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newQuantity">Quantity *</Label>
                          <Input
                            id="newQuantity"
                            type="number"
                            value={newProduct.quantity}
                            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                            placeholder="Enter quantity"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newCategory">Category *</Label>
                          <select
                            id="newCategory"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                          >
                            <option value="Chemical">Chemical</option>
                            <option value="Industrial">Industrial</option>
                            <option value="Laboratory">Laboratory</option>
                            <option value="Specialty">Specialty</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="newBadge">Badge</Label>
                          <Input
                            id="newBadge"
                            value={newProduct.badge}
                            onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                            placeholder="e.g., PREMIUM, NEW, LIMITED"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newImage">Image URL</Label>
                          <Input
                            id="newImage"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            placeholder="Enter image URL"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="newDescription">Description</Label>
                          <Textarea
                            id="newDescription"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            placeholder="Enter product description"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-3 mt-4">
                        <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Product
                        </Button>
                        <Button onClick={() => setShowAddProduct(false)} variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="relative mb-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-32 sm:h-40 object-cover rounded-lg bg-gray-100"
                          />
                          {product.badge && (
                            <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded text-xs">
                              {product.badge}
                            </div>
                          )}
                          {product.originalPrice && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-base sm:text-lg mb-2">{product.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3">{product.description}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-bold text-amber-600 text-sm sm:text-lg">
                            Rs {product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                              Rs {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              product.quantity === 0
                                ? "bg-red-100 text-red-800"
                                : product.quantity <= 5
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {product.quantity === 0
                              ? "Out of Stock"
                              : product.quantity <= 5
                                ? `Low Stock: ${product.quantity}`
                                : `In Stock: ${product.quantity}`}
                          </span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingProduct(product)}
                            className="flex-1 text-xs sm:text-sm"
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex-1 text-xs sm:text-sm"
                          >
                            <Trash className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
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

          {/* Website Settings Tab */}
          <TabsContent value="website" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Website Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={websiteSettings.siteName}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, siteName: e.target.value })}
                      placeholder="Your website name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      value={websiteSettings.logo}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, logo: e.target.value })}
                      placeholder="Logo image URL"
                    />
                  </div>
                </div>

                {/* Hero Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Hero Section</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="heroTitle">Hero Title</Label>
                      <Input
                        id="heroTitle"
                        value={websiteSettings.heroTitle}
                        onChange={(e) => setWebsiteSettings({ ...websiteSettings, heroTitle: e.target.value })}
                        placeholder="Main hero title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroImage">Hero Image URL</Label>
                      <Input
                        id="heroImage"
                        value={websiteSettings.heroImage}
                        onChange={(e) => setWebsiteSettings({ ...websiteSettings, heroImage: e.target.value })}
                        placeholder="Hero background image URL"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                    <Textarea
                      id="heroSubtitle"
                      value={websiteSettings.heroSubtitle}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, heroSubtitle: e.target.value })}
                      placeholder="Hero subtitle/description"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Hero Animation</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                      {animations.map((animation) => (
                        <label
                          key={animation.id}
                          className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name="heroAnimation"
                            value={animation.id}
                            checked={websiteSettings.heroAnimation === animation.id}
                            onChange={(e) => setWebsiteSettings({ ...websiteSettings, heroAnimation: e.target.value })}
                            className="text-amber-600"
                          />
                          <div>
                            <p className="font-medium text-sm">{animation.name}</p>
                            <p className="text-xs text-gray-500">{animation.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <Button onClick={saveWebsiteSettings} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Website Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Color Scheme</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="headerBg">Header Background</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="headerBg"
                        type="color"
                        value={websiteSettings.colors.headerBg}
                        onChange={(e) =>
                          setWebsiteSettings({
                            ...websiteSettings,
                            colors: { ...websiteSettings.colors, headerBg: e.target.value },
                          })
                        }
                        className="w-16 h-10"
                      />
                      <Input
                        value={websiteSettings.colors.headerBg}
                        onChange={(e) =>
                          setWebsiteSettings({
                            ...websiteSettings,
                            colors: { ...websiteSettings.colors, headerBg: e.target.value },
                          })
                        }
                        placeholder="#ffffff"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="headerText">Header Text</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="headerText"
                        type="color"
                        value={websiteSettings.colors.headerText}
                        onChange={(e) =>
                          setWebsiteSettings({
                            ...websiteSettings,
                            colors: { ...websiteSettings.colors, headerText: e.target.value },
                          })
                        }
                        className="w-16 h-10"
                      />
                      <Input
                        value={websiteSettings.colors.headerText}
                        onChange={(e) =>
                          setWebsiteSettings({
                            ...websiteSettings,
                            colors: { ...websiteSettings.colors, headerText: e.target.value },
                          })
                        }
                        placeholder="#374151"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="topBarBg">Top Bar Background</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="topBarBg"
                        type="color"
                        value={websiteSettings.colors.topBarBg}
                        onChange={(e) =>
                          setWebsiteSettings({
                            ...websiteSettings,
                            colors: { ...websiteSettings.colors, topBarBg: e.target.value },
                          })
                        }
                        className="w-16 h-10"
                      />
                      <Input
                        value={websiteSettings.colors.topBarBg}
                        onChange={(e) =>
                          setWebsiteSettings({
                            ...websiteSettings,
                            colors: { ...websiteSettings.colors, topBarBg: e.target.value },
                          })
                        }
                        placeholder="#b45309"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="footerBg">Footer Background</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="footerBg"
                        type="color"
                        value={websiteSettings.colors.footerBg}
                        onChange={(e) =>
                          setWebsiteSettings({
                            ...websiteSettings,
                            colors: { ...websiteSettings.colors, footerBg: e.target.value },
                          })
                        }
                        className="w-16 h-10"
                      />
                      <Input
                        value={websiteSettings.colors.footerBg}
                        onChange={(e) =>
                          setWebsiteSettings({
                            ...websiteSettings,
                            colors: { ...websiteSettings.colors, footerBg: e.target.value },
                          })
                        }
                        placeholder="#1f2937"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={saveWebsiteSettings} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Color Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone1">Primary Phone</Label>
                    <Input
                      id="phone1"
                      value={websiteSettings.contactInfo.phone1}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, phone1: e.target.value },
                        })
                      }
                      placeholder="03xxxxxxxxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone2">Secondary Phone</Label>
                    <Input
                      id="phone2"
                      value={websiteSettings.contactInfo.phone2}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, phone2: e.target.value },
                        })
                      }
                      placeholder="03xxxxxxxxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      value={websiteSettings.contactInfo.whatsapp}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, whatsapp: e.target.value },
                        })
                      }
                      placeholder="03xxxxxxxxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Business Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={websiteSettings.contactInfo.email}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, email: e.target.value },
                        })
                      }
                      placeholder="info@syedchemicalsolution.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={websiteSettings.contactInfo.adminEmail}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, adminEmail: e.target.value },
                        })
                      }
                      placeholder="admin@syedchemicalsolution.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      value={websiteSettings.contactInfo.address}
                      onChange={(e) =>
                        setWebsiteSettings({
                          ...websiteSettings,
                          contactInfo: { ...websiteSettings.contactInfo, address: e.target.value },
                        })
                      }
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="businessHours">Business Hours</Label>
                  <Input
                    id="businessHours"
                    value={websiteSettings.contactInfo.businessHours}
                    onChange={(e) =>
                      setWebsiteSettings({
                        ...websiteSettings,
                        contactInfo: { ...websiteSettings.contactInfo, businessHours: e.target.value },
                      })
                    }
                    placeholder="Mon-Sat: 9:00 AM - 8:00 PM"
                  />
                </div>

                <Button onClick={saveWebsiteSettings} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Contact Info
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Website Content Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Edit text content, headings, and paragraphs for each page of your website.
                </p>

                {/* Page Selection */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {contentPages.map((page) => {
                    const IconComponent = page.icon
                    return (
                      <Button
                        key={page.id}
                        onClick={() => setSelectedContentPage(page.id)}
                        variant={selectedContentPage === page.id ? "default" : "outline"}
                        className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2"
                      >
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-xs sm:text-sm">{page.name}</span>
                      </Button>
                    )
                  })}
                </div>

                {/* Content Editor */}
                {selectedContentPage && (
                  <Card className="border-2 border-amber-200">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">
                        Edit {contentPages.find((p) => p.id === selectedContentPage)?.name} Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderContentFields()}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                        <Button onClick={savePageContent} className="bg-green-600 hover:bg-green-700">
                          <Save className="w-4 h-4 mr-2" />
                          Save Content
                        </Button>
                        <Button
                          onClick={() => {
                            if (confirm("Are you sure you want to reset this page's content to default?")) {
                              // Reset logic would go here
                              alert("Content reset to default!")
                            }
                          }}
                          variant="outline"
                        >
                          Reset to Default
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Management Tab */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5" />
                  <span>Website Images Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Manage images for each page of your website. Upload images to a hosting service and paste the URLs
                  here.
                </p>

                {/* Page Selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {imagePages.map((page) => {
                    const IconComponent = page.icon
                    return (
                      <Button
                        key={page.id}
                        onClick={() => setSelectedImagePage(page.id)}
                        variant={selectedImagePage === page.id ? "default" : "outline"}
                        className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2"
                      >
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-xs sm:text-sm">{page.name}</span>
                      </Button>
                    )
                  })}
                </div>

                {/* Image Editor */}
                {selectedImagePage && (
                  <Card className="border-2 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">
                        Edit {imagePages.find((p) => p.id === selectedImagePage)?.name} Images
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderImageFields()}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                        <Button onClick={savePageImages} className="bg-green-600 hover:bg-green-700">
                          <Save className="w-4 h-4 mr-2" />
                          Save Images
                        </Button>
                        <Button
                          onClick={() => {
                            if (confirm("Are you sure you want to reset this page's images to default?")) {
                              // Reset logic would go here
                              alert("Images reset to default!")
                            }
                          }}
                          variant="outline"
                        >
                          Reset to Default
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* APIs Tab */}
          <TabsContent value="apis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>API Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* EmailJS Configuration */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-green-700 flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      EmailJS Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs sm:text-sm text-green-600 mb-4">
                      Configure EmailJS to receive order notifications in your Gmail. Get these details from your
                      EmailJS dashboard.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Service ID</Label>
                        <Input
                          placeholder="service_xxxxxxx"
                          value={emailJSConfig.serviceId}
                          onChange={(e) => setEmailJSConfig({ ...emailJSConfig, serviceId: e.target.value })}
                        />
                        <p className="text-xs text-green-600 mt-1">Found in EmailJS dashboard under Email Services</p>
                      </div>
                      <div>
                        <Label>Template ID</Label>
                        <Input
                          placeholder="template_xxxxxxx"
                          value={emailJSConfig.templateId}
                          onChange={(e) => setEmailJSConfig({ ...emailJSConfig, templateId: e.target.value })}
                        />
                        <p className="text-xs text-green-600 mt-1">Found in EmailJS dashboard under Email Templates</p>
                      </div>
                      <div>
                        <Label>Public Key</Label>
                        <Input
                          placeholder="xxxxxxxxxxxxxxx"
                          value={emailJSConfig.publicKey}
                          onChange={(e) => setEmailJSConfig({ ...emailJSConfig, publicKey: e.target.value })}
                        />
                        <p className="text-xs text-green-600 mt-1">
                          Found in EmailJS dashboard under Account → API Keys
                        </p>
                      </div>
                      <div>
                        <Label>Admin Email</Label>
                        <Input
                          type="email"
                          placeholder="your-email@gmail.com"
                          value={emailJSConfig.adminEmail}
                          onChange={(e) => setEmailJSConfig({ ...emailJSConfig, adminEmail: e.target.value })}
                        />
                        <p className="text-xs text-green-600 mt-1">Where order notifications will be sent</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <Button onClick={saveEmailJSConfig} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save EmailJS Config
                      </Button>
                      <Button onClick={testEmailNotification} variant="outline" disabled={isLoading}>
                        <TestTube className="w-4 h-4 mr-2" />
                        {isLoading ? "Testing..." : "Test Email"}
                      </Button>
                    </div>

                    {/* EmailJS Setup Instructions */}
                    <div className="mt-4 p-4 bg-white rounded border">
                      <h5 className="font-semibold text-sm mb-2">📧 EmailJS Setup Instructions:</h5>
                      <div className="text-xs text-gray-600 space-y-2">
                        <p>
                          <strong>1. Create Account:</strong> Go to{" "}
                          <a
                            href="https://www.emailjs.com/"
                            target="_blank"
                            className="text-blue-600 underline"
                            rel="noreferrer"
                          >
                            EmailJS.com
                          </a>{" "}
                          and sign up
                        </p>
                        <p>
                          <strong>2. Add Gmail Service:</strong> In Email Services, add Gmail and authenticate
                        </p>
                        <p>
                          <strong>3. Create Template:</strong> Use these variables in your template:
                        </p>
                        <div className="bg-gray-100 p-2 rounded text-xs font-mono mt-1">
                          <p>To: {`{{to_email}}`}</p>
                          <p>Subject: {`{{subject}}`}</p>
                          <p>Customer: {`{{customer_name}}`}</p>
                          <p>Phone: {`{{customer_phone}}`}</p>
                          <p>Total: {`{{total_amount}}`}</p>
                          <p>Message: {`{{message}}`}</p>
                        </div>
                        <p>
                          <strong>4. Copy IDs:</strong> Get Service ID, Template ID, and Public Key from dashboard
                        </p>
                        <p>
                          <strong>5. Test:</strong> Use the test button to verify email delivery
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Google Drive Configuration */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-blue-700 flex items-center">
                      <Cloud className="w-5 h-5 mr-2" />
                      Google Drive Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs sm:text-sm text-blue-600 mb-4">
                      Configure Google Drive API to store and manage your website images and files.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>API Key</Label>
                        <Input
                          placeholder="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                          value={googleDriveConfig.apiKey}
                          onChange={(e) => setGoogleDriveConfig({ ...googleDriveConfig, apiKey: e.target.value })}
                        />
                        <p className="text-xs text-blue-600 mt-1">Get from Google Cloud Console</p>
                      </div>
                      <div>
                        <Label>Folder ID</Label>
                        <Input
                          placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                          value={googleDriveConfig.folderId}
                          onChange={(e) => setGoogleDriveConfig({ ...googleDriveConfig, folderId: e.target.value })}
                        />
                        <p className="text-xs text-blue-600 mt-1">Google Drive folder ID for storing files</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="enableGoogleDrive"
                        checked={googleDriveConfig.enabled}
                        onChange={(e) => setGoogleDriveConfig({ ...googleDriveConfig, enabled: e.target.checked })}
                        className="rounded"
                      />
                      <Label htmlFor="enableGoogleDrive" className="text-sm">
                        Enable Google Drive Integration
                      </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <Button onClick={saveGoogleDriveConfig} className="bg-blue-600 hover:bg-blue-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Google Drive Config
                      </Button>
                      <Button onClick={testGoogleDriveConnection} variant="outline" disabled={isLoading}>
                        <TestTube className="w-4 h-4 mr-2" />
                        {isLoading ? "Testing..." : "Test Connection"}
                      </Button>
                    </div>

                    {/* Google Drive Setup Instructions */}
                    <div className="mt-4 p-4 bg-white rounded border">
                      <h5 className="font-semibold text-sm mb-2">☁️ Google Drive Setup Instructions:</h5>
                      <div className="text-xs text-gray-600 space-y-2">
                        <p>
                          <strong>1. Create Project:</strong> Go to{" "}
                          <a
                            href="https://console.cloud.google.com/"
                            target="_blank"
                            className="text-blue-600 underline"
                            rel="noreferrer"
                          >
                            Google Cloud Console
                          </a>{" "}
                          and create a new project
                        </p>
                        <p>
                          <strong>2. Enable API:</strong> Enable Google Drive API for your project
                        </p>
                        <p>
                          <strong>3. Create Credentials:</strong> Create an API Key in Credentials section
                        </p>
                        <p>
                          <strong>4. Create Folder:</strong> Create a folder in Google Drive and get its ID from URL
                        </p>
                        <p>
                          <strong>5. Set Permissions:</strong> Make the folder publicly accessible or share with service
                          account
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Future API Integrations */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-purple-700">Future API Integrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2 text-sm">Payment Gateway</h4>
                        <p className="text-xs text-blue-600">
                          Integrate JazzCash, EasyPaisa, or Stripe for online payments
                        </p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent text-xs" disabled>
                          Coming Soon
                        </Button>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2 text-sm">SMS Notifications</h4>
                        <p className="text-xs text-purple-600">
                          Send SMS notifications to customers about order status
                        </p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent text-xs" disabled>
                          Coming Soon
                        </Button>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2 text-sm">WhatsApp API</h4>
                        <p className="text-xs text-green-600">Automated WhatsApp messages for order updates</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent text-xs" disabled>
                          Coming Soon
                        </Button>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2 text-sm">Analytics</h4>
                        <p className="text-xs text-orange-600">Google Analytics integration for tracking</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent text-xs" disabled>
                          Coming Soon
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Tools Tab */}
          <TabsContent value="admin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Admin Tools & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Change Password */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3 text-sm sm:text-base">Change Admin Password</h4>
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        type={showPasswords.current ? "text" : "password"}
                        placeholder="Current Password"
                        value={adminCredentials.currentPassword}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, currentPassword: e.target.value })}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("current")}
                        className="absolute right-3 top-3 text-gray-400"
                      >
                        {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPasswords.new ? "text" : "password"}
                        placeholder="New Password"
                        value={adminCredentials.newPassword}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, newPassword: e.target.value })}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute right-3 top-3 text-gray-400"
                      >
                        {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPasswords.confirm ? "text" : "password"}
                        placeholder="Confirm New Password"
                        value={adminCredentials.confirmPassword}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, confirmPassword: e.target.value })}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        className="absolute right-3 top-3 text-gray-400"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <Button onClick={changeAdminPassword} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </div>

                {/* Reset Data */}
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2 text-sm sm:text-base">Reset Orders History</h4>
                  <p className="text-xs sm:text-sm text-red-600 mb-3">
                    This will permanently delete all order records and notifications.
                  </p>
                  <Button
                    onClick={resetOrdersHistory}
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset All Orders
                  </Button>
                </div>

                {/* System Info */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">System Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <p>
                        <strong>Admin Panel Version:</strong> 2.0
                      </p>
                      <p>
                        <strong>Last Login:</strong> {new Date().toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Total Orders:</strong> {stats.totalOrders}
                      </p>
                      <p>
                        <strong>Total Products:</strong> {products.length}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Edit Product Modal */}
          {editingProduct && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="text-lg">Edit Product: {editingProduct.name}</CardTitle>
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
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, price: Number.parseInt(e.target.value) })
                        }
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
                        <option value="Chemical">Chemical</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Laboratory">Laboratory</option>
                        <option value="Specialty">Specialty</option>
                      </select>
                    </div>
                    <div>
                      <Label>Badge</Label>
                      <Input
                        value={editingProduct.badge}
                        onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                      />
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
        </Tabs>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0, -30px, 0); }
          70% { transform: translate3d(0, -15px, 0); }
          90% { transform: translate3d(0, -4px, 0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
        .animate-slideUp { animation: slideUp 1s ease-out; }
        .animate-slideLeft { animation: slideLeft 1s ease-out; }
        .animate-zoomIn { animation: zoomIn 1s ease-out; }
        .animate-bounce { animation: bounce 2s ease-in-out; }
      `}</style>
    </div>
  )
}
