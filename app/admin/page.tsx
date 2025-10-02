"use client"

import { useState } from "react"
import withAdminAuth from "@/components/withAdminAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Upload,
  Package,
  Settings,
  BarChart3,
  Users,
  ShoppingBag,
  Plus,
  Save,
  Eye,
  Trash2,
  Edit,
  TrendingUp,
  DollarSign,
  Star,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Globe,
  Bell,
  Database,
  Search,
  Filter,
  Download,
  RefreshCw,
  X,
} from "lucide-react"

// ... (todas las interfaces y datos mock permanecen igual) ...

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  category: string
  image: string
  badge: string
  badgeColor: string
  description: string
  rating: number
  reviews: number
}

interface AnalyticsData {
  totalSales: number
  totalRevenue: string
  totalOrders: number
  averageOrderValue: string
  topProducts: Array<{
    name: string
    sales: number
    revenue: string
    category: string
  }>
  salesByCategory: Array<{
    category: string
    sales: number
    percentage: number
  }>
  recentOrders: Array<{
    id: string
    customer: string
    product: string
    amount: string
    status: string
    date: string
  }>
}

interface User {
  id: string
  name: string
  email: string
  phone: string
  location: string
  totalOrders: number
  totalSpent: string
  joinDate: string
  status: string
  lastActivity: string
}

interface Order {
  id: string
  customer: string
  email: string
  products: Array<{
    name: string
    quantity: number
    price: string
  }>
  total: string
  status: string
  paymentMethod: string
  shippingAddress: string
  orderDate: string
  estimatedDelivery: string
}

interface StoreConfig {
  storeName: string
  storeDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  currency: string
  taxRate: number
  shippingFee: string
  freeShippingThreshold: string
  paymentMethods: {
    creditCard: boolean
    paypal: boolean
    bankTransfer: boolean
    cash: boolean
  }
  notifications: {
    newOrders: boolean
    lowStock: boolean
    customerMessages: boolean
    promotions: boolean
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
  }
}

const mockAnalytics: AnalyticsData = {
  totalSales: 156,
  totalRevenue: "$12,450,000",
  totalOrders: 89,
  averageOrderValue: "$139,888",
  topProducts: [
    { name: "Collar Muisca Dorado", sales: 23, revenue: "$10,350,000", category: "Joyería" },
    { name: "Camiseta Precolombina", sales: 18, revenue: "$1,260,000", category: "Ropa" },
    { name: "Aretes Esmeralda", sales: 15, revenue: "$4,500,000", category: "Joyería" },
    { name: "Mochila Wayuu", sales: 12, revenue: "$840,000", category: "Arte" },
  ],
  salesByCategory: [
    { category: "Joyería", sales: 67, percentage: 43 },
    { category: "Ropa", sales: 34, percentage: 22 },
    { category: "Arte Precolombino", sales: 28, percentage: 18 },
    { category: "Bogotá", sales: 27, percentage: 17 },
  ],
  recentOrders: [
    {
      id: "#ORD-001",
      customer: "María González",
      product: "Collar Muisca Dorado",
      amount: "$450,000",
      status: "Completado",
      date: "2024-01-15",
    },
  ],
}

const mockUsers: User[] = [
  {
    id: "USR-001",
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+57 300 123 4567",
    location: "Bogotá, Colombia",
    totalOrders: 5,
    totalSpent: "$1,250,000",
    joinDate: "2023-08-15",
    status: "Activo",
    lastActivity: "2024-01-15",
  },
]

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "María González",
    email: "maria.gonzalez@email.com",
    products: [
      { name: "Collar Muisca Dorado", quantity: 1, price: "$450,000" },
      { name: "Aretes Esmeralda", quantity: 1, price: "$300,000" },
    ],
    total: "$750,000",
    status: "Completado",
    paymentMethod: "Tarjeta de Crédito",
    shippingAddress: "Calle 123 #45-67, Bogotá, Colombia",
    orderDate: "2024-01-15",
    estimatedDelivery: "2024-01-18",
  },
]

function AdminPage() {
  const [activeSection, setActiveSection] = useState("productos")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Collar Muisca Dorado",
      price: "$450.000",
      originalPrice: "$520.000",
      category: "joyeria",
      image: "/colombian-emerald-necklace-gold-muisca-design.jpg",
      badge: "Bestseller",
      badgeColor: "bg-admin-success text-white",
      description: "Hermoso collar inspirado en la cultura Muisca con esmeraldas colombianas auténticas.",
      rating: 4.9,
      reviews: 23,
    },
  ])

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    image: "",
    badge: "",
    badgeColor: "bg-admin-accent text-white",
    description: "",
    rating: 5,
    reviews: 0,
  })

  const [users] = useState<User[]>(mockUsers)
  const [orders] = useState<Order[]>(mockOrders)
  const [storeConfig, setStoreConfig] = useState<StoreConfig>({
    storeName: "Tesoros de Colombia",
    storeDescription: "Auténtica joyería y artesanías colombianas",
    contactEmail: "info@tesorosdecolombia.com",
    contactPhone: "+57 300 123 4567",
    address: "Calle 123 #45-67, Bogotá, Colombia",
    currency: "COP",
    taxRate: 19,
    shippingFee: "$15,000",
    freeShippingThreshold: "$200,000",
    paymentMethods: {
      creditCard: true,
      paypal: true,
      bankTransfer: true,
      cash: false,
    },
    notifications: {
      newOrders: true,
      lowStock: true,
      customerMessages: true,
      promotions: false,
    },
    seo: {
      metaTitle: "Tesoros de Colombia - Joyería y Artesanías Auténticas",
      metaDescription:
        "Descubre la belleza de Colombia con nuestra colección de joyería con esmeraldas, arte precolombino y souvenirs únicos de Bogotá.",
      keywords: "joyería colombiana, esmeraldas, arte precolombino, souvenirs bogotá",
    },
  })

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      const product: Product = {
        ...newProduct,
        id: Date.now(),
        rating: Number(newProduct.rating),
        reviews: Number(newProduct.reviews),
      }
      setProducts([...products, product])
      setNewProduct({
        name: "",
        price: "",
        originalPrice: "",
        category: "",
        image: "",
        badge: "",
        badgeColor: "bg-admin-accent text-white",
        description: "",
        rating: 5,
        reviews: 0,
      })
    }
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-admin-success text-white"
      case "Enviado":
        return "bg-admin-accent text-white"
      case "Procesando":
        return "bg-yellow-500 text-white"
      default:
        return "bg-admin-muted text-white"
    }
  }

  const getUserStatusBadgeColor = (status: string) => {
    switch (status) {
      case "VIP":
        return "bg-yellow-500 text-white"
      case "Activo":
        return "bg-admin-success text-white"
      case "Inactivo":
        return "bg-admin-muted text-white"
      default:
        return "bg-admin-muted text-white"
    }
  }

  const handleConfigUpdate = () => {
    console.log("Configuración actualizada:", storeConfig)
  }

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsOrderDetailsOpen(true)
  }

  return (
    <div className="min-h-screen admin-theme">
      {/* ... El resto del JSX de la página de admin ... */}
      <div className="flex">
        <div className="w-64 admin-card border-r min-h-screen p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-admin-foreground">Admin Panel</h1>
            <p className="text-admin-muted text-sm">Tesoros de Colombia</p>
          </div>
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeSection === "productos" ? "text-admin-accent bg-admin-accent/10" : "text-admin-muted hover:text-admin-foreground"}`}
              onClick={() => setActiveSection("productos")}
            >
              <Package className="mr-2 h-4 w-4" />
              Productos
            </Button>
            {/* ... otros botones de navegación ... */}
          </nav>
        </div>
        <div className="flex-1 p-8">
          {/* ... contenido principal ... */}
        </div>
      </div>
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        {/* ... contenido del modal ... */}
      </Dialog>
    </div>
  )
}

export default withAdminAuth(AdminPage)