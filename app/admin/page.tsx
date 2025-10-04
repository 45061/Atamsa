"use client"

import { useState, useEffect } from "react"
import withAdminAuth from "@/components/withAdminAuth"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner";
import ProductsSection from "@/components/admin/products-section";
import EditProductForm from "@/components/admin/edit-product-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Home,
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

interface Product {
  _id: string
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
  materials?: string[];
  styles?: string[];
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
    {
      id: "#ORD-002",
      customer: "Carlos Rodríguez",
      product: "Camiseta Precolombina",
      amount: "$70,000",
      status: "Enviado",
      date: "2024-01-14",
    },
    {
      id: "#ORD-003",
      customer: "Ana López",
      product: "Aretes Esmeralda",
      amount: "$300,000",
      status: "Procesando",
      date: "2024-01-14",
    },
    {
      id: "#ORD-004",
      customer: "Luis Martínez",
      product: "Mochila Wayuu",
      amount: "$120,000",
      status: "Completado",
      date: "2024-01-13",
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
  {
    id: "USR-002",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    phone: "+57 301 987 6543",
    location: "Medellín, Colombia",
    totalOrders: 3,
    totalSpent: "$890,000",
    joinDate: "2023-09-22",
    status: "Activo",
    lastActivity: "2024-01-14",
  },
  {
    id: "USR-003",
    name: "Ana López",
    email: "ana.lopez@email.com",
    phone: "+57 302 456 7890",
    location: "Cali, Colombia",
    totalOrders: 8,
    totalSpent: "$2,100,000",
    joinDate: "2023-07-10",
    status: "VIP",
    lastActivity: "2024-01-16",
  },
  {
    id: "USR-004",
    name: "Luis Martínez",
    email: "luis.martinez@email.com",
    phone: "+57 303 654 3210",
    location: "Cartagena, Colombia",
    totalOrders: 2,
    totalSpent: "$450,000",
    joinDate: "2023-11-05",
    status: "Activo",
    lastActivity: "2024-01-13",
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
  {
    id: "ORD-002",
    customer: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    products: [{ name: "Camiseta Precolombina", quantity: 2, price: "$70,000" }],
    total: "$140,000",
    status: "Enviado",
    paymentMethod: "PayPal",
    shippingAddress: "Carrera 80 #30-25, Medellín, Colombia",
    orderDate: "2024-01-14",
    estimatedDelivery: "2024-01-17",
  },
  {
    id: "ORD-003",
    customer: "Ana López",
    email: "ana.lopez@email.com",
    products: [
      { name: "Mochila Wayuu", quantity: 1, price: "$120,000" },
      { name: "Collar Muisca Dorado", quantity: 1, price: "$450,000" },
    ],
    total: "$570,000",
    status: "Procesando",
    paymentMethod: "Transferencia Bancaria",
    shippingAddress: "Avenida 6 #15-30, Cali, Colombia",
    orderDate: "2024-01-14",
    estimatedDelivery: "2024-01-19",
  },
]

function AdminPage() {
  const [activeSection, setActiveSection] = useState("productos")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaderKey, setFileUploaderKey] = useState(0);
  const [products, setProducts] = useState<Product[]>([])
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error fetching products");
          toast.error("Error al cargar los productos");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error al cargar los productos");
      }
    };

    fetchProducts();
  }, []);

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
    materials: "",
    styles: "",
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

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.category && newProduct.image) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price);
        formData.append("originalPrice", newProduct.originalPrice);
        formData.append("category", newProduct.category);
        formData.append("image", newProduct.image);
        formData.append("badge", newProduct.badge);
        formData.append("badgeColor", newProduct.badgeColor);
        formData.append("description", newProduct.description);
        formData.append("rating", newProduct.rating.toString());
        formData.append("reviews", newProduct.reviews.toString());
        formData.append("materials", newProduct.materials);
        formData.append("styles", newProduct.styles);

        const response = await fetch('/api/products', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const product = await response.json();
          setProducts([...products, product]);
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
            materials: "",
            styles: "",
          });
          setFileUploaderKey(prevKey => prevKey + 1);
          toast.success("Archivo guardado con éxito");
        } else {
          console.error("Error creating product");
          toast.error("Error al guardar el producto");
        }
      } catch (error) {
        console.error("Error creating product:", error);
        toast.error("Error al guardar el producto");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((p) => p._id !== id));
        toast.success("Producto eliminado con éxito");
      } else {
        console.error("Error deleting product");
        toast.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error al eliminar el producto");
    }
  };

  const handleEditClick = (product: Product) => {
    setProductToEdit({ ...product });
    setNewImageFile(null);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (!productToEdit) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      
      Object.keys(productToEdit).forEach(key => {
        if (key !== '_id' && key !== 'image') {
          // @ts-ignore
          formData.append(key, productToEdit[key]);
        }
      });

      if (newImageFile) {
        formData.append("image", newImageFile);
      }

      const response = await fetch(`/api/products/${productToEdit._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
        setIsEditDialogOpen(false);
        setProductToEdit(null);
        toast.success("Producto actualizado con éxito");
      } else {
        console.error("Error updating product");
        toast.error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error al actualizar el producto");
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 admin-card border-r min-h-screen p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-admin-foreground">Admin Panel</h1>
            <p className="text-admin-muted text-sm">Tesoros de Colombia</p>
          </div>

          <nav className="space-y-2">
            <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-admin-muted hover:text-admin-foreground"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Inicio
                </Button>
            </Link>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeSection === "productos" ? "text-admin-accent bg-admin-accent/10" : "text-admin-muted hover:text-admin-foreground"}`}
              onClick={() => setActiveSection("productos")}
            >
              <Package className="mr-2 h-4 w-4" />
              Productos
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeSection === "analytics" ? "text-admin-accent bg-admin-accent/10" : "text-admin-muted hover:text-admin-foreground"}`}
              onClick={() => setActiveSection("analytics")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeSection === "usuarios" ? "text-admin-accent bg-admin-accent/10" : "text-admin-muted hover:text-admin-foreground"}`}
              onClick={() => setActiveSection("usuarios")}
            >
              <Users className="mr-2 h-4 w-4" />
              Usuarios
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeSection === "pedidos" ? "text-admin-accent bg-admin-accent/10" : "text-admin-muted hover:text-admin-foreground"}`}
              onClick={() => setActiveSection("pedidos")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Pedidos
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeSection === "configuracion" ? "text-admin-accent bg-admin-accent/10" : "text-admin-muted hover:text-admin-foreground"}`}
              onClick={() => setActiveSection("configuracion")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeSection === "productos" && (
            <ProductsSection
              products={products}
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              handleAddProduct={handleAddProduct}
              handleDeleteProduct={handleDeleteProduct}
              handleEditClick={handleEditClick}
              fileUploaderKey={fileUploaderKey}
            />
          )}

          {activeSection === "analytics" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-admin-foreground mb-2">Analytics</h2>
                <p className="text-admin-muted">Métricas y estadísticas de tu tienda colombiana</p>
              </div>

              <div className="space-y-6">
                {/* Métricas principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">Ventas Totales</p>
                          <p className="text-2xl font-bold text-admin-foreground">{mockAnalytics.totalSales}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-admin-accent" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">Ingresos Totales</p>
                          <p className="text-2xl font-bold text-admin-foreground">{mockAnalytics.totalRevenue}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-admin-success" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">Pedidos Totales</p>
                          <p className="text-2xl font-bold text-admin-foreground">{mockAnalytics.totalOrders}</p>
                        </div>
                        <ShoppingBag className="h-8 w-8 text-admin-accent" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">Valor Promedio</p>
                          <p className="text-2xl font-bold text-admin-foreground">{mockAnalytics.averageOrderValue}</p>
                        </div>
                        <Star className="h-8 w-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Productos más vendidos y ventas por categoría */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="admin-card">
                    <CardHeader>
                      <CardTitle className="text-admin-foreground">Productos Más Vendidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockAnalytics.topProducts.map((product, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 admin-card rounded-lg border border-admin-border"
                          >
                            <div>
                              <h4 className="font-semibold text-admin-foreground">{product.name}</h4>
                              <p className="text-admin-muted text-sm">{product.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-admin-accent">{product.sales} ventas</p>
                              <p className="text-admin-muted text-sm">{product.revenue}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="admin-card">
                    <CardHeader>
                      <CardTitle className="text-admin-foreground">Ventas por Categoría</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockAnalytics.salesByCategory.map((category, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-admin-foreground font-medium">{category.category}</span>
                              <span className="text-admin-muted">
                                {category.sales} ventas ({category.percentage}%)
                              </span>
                            </div>
                            <div className="w-full bg-admin-border rounded-full h-2">
                              <div
                                className="bg-admin-accent h-2 rounded-full transition-all duration-300"
                                style={{ width: `${category.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Pedidos recientes */}
                <Card className="admin-card">
                  <CardHeader>
                    <CardTitle className="text-admin-foreground flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Pedidos Recientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAnalytics.recentOrders.map((order, index) => (
                        <div key={index} className="admin-card p-4 rounded-lg border border-admin-border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div>
                                <h4 className="font-semibold text-admin-foreground">{order.id}</h4>
                                <p className="text-admin-muted text-sm">{order.customer}</p>
                              </div>
                              <div>
                                <p className="text-admin-foreground">{order.product}</p>
                                <p className="text-admin-muted text-sm">{order.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="font-bold text-admin-accent">{order.amount}</span>
                              <Badge className={getStatusBadgeColor(order.status)}>{order.status}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeSection === "usuarios" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-admin-foreground mb-2">Gestión de Usuarios</h2>
                <p className="text-admin-muted">Administra los clientes de tu tienda colombiana</p>
              </div>

              <div className="space-y-6">
                {/* Estadísticas de usuarios */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">Total Usuarios</p>
                          <p className="text-2xl font-bold text-admin-foreground">{users.length}</p>
                        </div>
                        <Users className="h-8 w-8 text-admin-accent" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">Usuarios VIP</p>
                          <p className="text-2xl font-bold text-admin-foreground">
                            {users.filter((u) => u.status === "VIP").length}
                          </p>
                        </div>
                        <Star className="h-8 w-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">Nuevos Este Mes</p>
                          <p className="text-2xl font-bold text-admin-foreground">2</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-admin-success" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">Activos Hoy</p>
                          <p className="text-2xl font-bold text-admin-foreground">3</p>
                        </div>
                        <Eye className="h-8 w-8 text-admin-accent" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lista de usuarios */}
                <Card className="admin-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-admin-foreground">Lista de Usuarios</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Buscar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                        >
                          <Filter className="mr-2 h-4 w-4" />
                          Filtrar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Exportar
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div key={user.id} className="admin-card p-4 rounded-lg border border-admin-border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-admin-accent rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">{user.name.charAt(0)}</span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-admin-foreground">{user.name}</h3>
                                <div className="flex items-center space-x-4 text-admin-muted text-sm">
                                  <span className="flex items-center">
                                    <Mail className="mr-1 h-3 w-3" />
                                    {user.email}
                                  </span>
                                  <span className="flex items-center">
                                    <Phone className="mr-1 h-3 w-3" />
                                    {user.phone}
                                  </span>
                                  <span className="flex items-center">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {user.location}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-6">
                              <div className="text-right">
                                <p className="font-bold text-admin-accent">{user.totalSpent}</p>
                                <p className="text-admin-muted text-sm">{user.totalOrders} pedidos</p>
                              </div>
                              <div className="text-right">
                                <Badge className={getUserStatusBadgeColor(user.status)}>{user.status}</Badge>
                                <p className="text-admin-muted text-sm mt-1">Último: {user.lastActivity}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeSection === "pedidos" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-admin-foreground mb-2">Gestión de Pedidos</h2>
                <p className="text-admin-muted">Administra todos los pedidos de tu tienda colombiana</p>
              </div>

              <div className="space-y-6">
                {/* Estadísticas de pedidos */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">Total Pedidos</p>
                          <p className="text-2xl font-bold text-admin-foreground">{orders.length}</p>
                        </div>
                        <ShoppingBag className="h-8 w-8 text-admin-accent" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">Completados</p>
                          <p className="text-2xl font-bold text-admin-foreground">
                            {orders.filter((o) => o.status === "Completado").length}
                          </p>
                        </div>
                        <Star className="h-8 w-8 text-admin-success" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">En Proceso</p>
                          <p className="text-2xl font-bold text-admin-foreground">
                            {orders.filter((o) => o.status === "Procesando").length}
                          </p>
                        </div>
                        <RefreshCw className="h-8 w-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="admin-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-admin-muted text-sm">Enviados</p>
                          <p className="text-2xl font-bold text-admin-foreground">
                            {orders.filter((o) => o.status === "Enviado").length}
                          </p>
                        </div>
                        <Truck className="h-8 w-8 text-admin-accent" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lista de pedidos */}
                <Card className="admin-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-admin-foreground">Lista de Pedidos</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Buscar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                        >
                          <Filter className="mr-2 h-4 w-4" />
                          Filtrar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Exportar
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="admin-card p-6 rounded-lg border border-admin-border">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-admin-foreground text-lg">{order.id}</h3>
                                <div className="flex items-center space-x-4 text-admin-muted text-sm">
                                  <span className="flex items-center">
                                    <Users className="mr-1 h-3 w-3" />
                                    {order.customer}
                                  </span>
                                  <span className="flex items-center">
                                    <Mail className="mr-1 h-3 w-3" />
                                    {order.email}
                                  </span>
                                  <span className="flex items-center">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    {order.orderDate}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <p className="font-bold text-admin-accent text-xl">{order.total}</p>
                                  <p className="text-admin-muted text-sm">{order.paymentMethod}</p>
                                </div>
                                <Badge className={getStatusBadgeColor(order.status)}>{order.status}</Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-admin-foreground mb-2">Productos:</h4>
                                <div className="space-y-1">
                                  {order.products.map((product, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                      <span className="text-admin-muted">
                                        {product.quantity}x {product.name}
                                      </span>
                                      <span className="text-admin-foreground">{product.price}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-admin-foreground mb-2">Dirección de Envío:</h4>
                                <p className="text-admin-muted text-sm">{order.shippingAddress}</p>
                                <p className="text-admin-muted text-sm mt-2">
                                  <span className="flex items-center">
                                    <Truck className="mr-1 h-3 w-3" />
                                    Entrega estimada: {order.estimatedDelivery}
                                  </span>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-end space-x-2 pt-4 border-t border-admin-border">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewOrderDetails(order)}
                                className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Detalles
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Actualizar Estado
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Factura
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeSection === "configuracion" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-admin-foreground mb-2">Configuración de la Tienda</h2>
                <p className="text-admin-muted">Personaliza y configura tu tienda colombiana</p>
              </div>

              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="admin-card">
                  <TabsTrigger
                    value="general"
                    className="data-[state=active]:bg-admin-accent data-[state=active]:text-white"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="payments"
                    className="data-[state=active]:bg-admin-accent data-[state=active]:text-white"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pagos y Envío
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="data-[state=active]:bg-admin-accent data-[state=active]:text-white"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notificaciones
                  </TabsTrigger>
                  <TabsTrigger
                    value="seo"
                    className="data-[state=active]:bg-admin-accent data-[state=active]:text-white"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    SEO
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                  <Card className="admin-card">
                    <CardHeader>
                      <CardTitle className="text-admin-foreground">Información General</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="storeName" className="text-admin-foreground">
                            Nombre de la Tienda
                          </Label>
                          <Input
                            id="storeName"
                            value={storeConfig.storeName}
                            onChange={(e) => setStoreConfig({ ...storeConfig, storeName: e.target.value })}
                            className="admin-input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="currency" className="text-admin-foreground">
                            Moneda
                          </Label>
                          <Select
                            value={storeConfig.currency}
                            onValueChange={(value) => setStoreConfig({ ...storeConfig, currency: value })}
                          >
                            <SelectTrigger className="admin-input">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="admin-card">
                              <SelectItem value="COP">Peso Colombiano (COP)</SelectItem>
                              <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                              <SelectItem value="EUR">Euro (EUR)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="storeDescription" className="text-admin-foreground">
                          Descripción de la Tienda
                        </Label>
                        <Textarea
                          id="storeDescription"
                          value={storeConfig.storeDescription}
                          onChange={(e) => setStoreConfig({ ...storeConfig, storeDescription: e.target.value })}
                          className="admin-input"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="contactEmail" className="text-admin-foreground">
                            Email de Contacto
                          </Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            value={storeConfig.contactEmail}
                            onChange={(e) => setStoreConfig({ ...storeConfig, contactEmail: e.target.value })}
                            className="admin-input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactPhone" className="text-admin-foreground">
                            Teléfono de Contacto
                          </Label>
                          <Input
                            id="contactPhone"
                            value={storeConfig.contactPhone}
                            onChange={(e) => setStoreConfig({ ...storeConfig, contactPhone: e.target.value })}
                            className="admin-input"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address" className="text-admin-foreground">
                          Dirección
                        </Label>
                        <Input
                          id="address"
                          value={storeConfig.address}
                          onChange={(e) => setStoreConfig({ ...storeConfig, address: e.target.value })}
                          className="admin-input"
                        />
                      </div>

                      <div>
                        <Label htmlFor="taxRate" className="text-admin-foreground">
                          Tasa de Impuesto (%)
                        </Label>
                        <Input
                          id="taxRate"
                          type="number"
                          value={storeConfig.taxRate}
                          onChange={(e) => setStoreConfig({ ...storeConfig, taxRate: Number(e.target.value) })}
                          className="admin-input"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payments">
                  <div className="space-y-6">
                    <Card className="admin-card">
                      <CardHeader>
                        <CardTitle className="text-admin-foreground">Métodos de Pago</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-5 w-5 text-admin-muted" />
                            <span className="text-admin-foreground">Tarjetas de Crédito</span>
                          </div>
                          <Switch
                            checked={storeConfig.paymentMethods.creditCard}
                            onCheckedChange={(checked) =>
                              setStoreConfig({
                                ...storeConfig,
                                paymentMethods: { ...storeConfig.paymentMethods, creditCard: checked },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Globe className="h-5 w-5 text-admin-muted" />
                            <span className="text-admin-foreground">PayPal</span>
                          </div>
                          <Switch
                            checked={storeConfig.paymentMethods.paypal}
                            onCheckedChange={(checked) =>
                              setStoreConfig({
                                ...storeConfig,
                                paymentMethods: { ...storeConfig.paymentMethods, paypal: checked },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Database className="h-5 w-5 text-admin-muted" />
                            <span className="text-admin-foreground">Transferencia Bancaria</span>
                          </div>
                          <Switch
                            checked={storeConfig.paymentMethods.bankTransfer}
                            onCheckedChange={(checked) =>
                              setStoreConfig({
                                ...storeConfig,
                                paymentMethods: { ...storeConfig.paymentMethods, bankTransfer: checked },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <DollarSign className="h-5 w-5 text-admin-muted" />
                            <span className="text-admin-foreground">Pago en Efectivo</span>
                          </div>
                          <Switch
                            checked={storeConfig.paymentMethods.cash}
                            onCheckedChange={(checked) =>
                              setStoreConfig({
                                ...storeConfig,
                                paymentMethods: { ...storeConfig.paymentMethods, cash: checked },
                              })
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="admin-card">
                      <CardHeader>
                        <CardTitle className="text-admin-foreground">Configuración de Envío</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="shippingFee" className="text-admin-foreground">
                              Costo de Envío
                            </Label>
                            <Input
                              id="shippingFee"
                              value={storeConfig.shippingFee}
                              onChange={(e) => setStoreConfig({ ...storeConfig, shippingFee: e.target.value })}
                              className="admin-input"
                            />
                          </div>
                          <div>
                            <Label htmlFor="freeShippingThreshold" className="text-admin-foreground">
                              Envío Gratis Desde
                            </Label>
                            <Input
                              id="freeShippingThreshold"
                              value={storeConfig.freeShippingThreshold}
                              onChange={(e) =>
                                setStoreConfig({ ...storeConfig, freeShippingThreshold: e.target.value })
                              }
                              className="admin-input"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card className="admin-card">
                    <CardHeader>
                      <CardTitle className="text-admin-foreground">Configuración de Notificaciones</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <ShoppingBag className="h-5 w-5 text-admin-muted" />
                          <span className="text-admin-foreground">Nuevos Pedidos</span>
                        </div>
                        <Switch
                          checked={storeConfig.notifications.newOrders}
                          onCheckedChange={(checked) =>
                            setStoreConfig({
                              ...storeConfig,
                              notifications: { ...storeConfig.notifications, newOrders: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Package className="h-5 w-5 text-admin-muted" />
                          <span className="text-admin-foreground">Stock Bajo</span>
                        </div>
                        <Switch
                          checked={storeConfig.notifications.lowStock}
                          onCheckedChange={(checked) =>
                            setStoreConfig({
                              ...storeConfig,
                              notifications: { ...storeConfig.notifications, lowStock: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-admin-muted" />
                          <span className="text-admin-foreground">Mensajes de Clientes</span>
                        </div>
                        <Switch
                          checked={storeConfig.notifications.customerMessages}
                          onCheckedChange={(checked) =>
                            setStoreConfig({
                              ...storeConfig,
                              notifications: { ...storeConfig.notifications, customerMessages: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Star className="h-5 w-5 text-admin-muted" />
                          <span className="text-admin-foreground">Promociones</span>
                        </div>
                        <Switch
                          checked={storeConfig.notifications.promotions}
                          onCheckedChange={(checked) =>
                            setStoreConfig({
                              ...storeConfig,
                              notifications: { ...storeConfig.notifications, promotions: checked },
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="seo">
                  <Card className="admin-card">
                    <CardHeader>
                      <CardTitle className="text-admin-foreground">Configuración SEO</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="metaTitle" className="text-admin-foreground">
                          Título Meta
                        </Label>
                        <Input
                          id="metaTitle"
                          value={storeConfig.seo.metaTitle}
                          onChange={(e) =>
                            setStoreConfig({
                              ...storeConfig,
                              seo: { ...storeConfig.seo, metaTitle: e.target.value },
                            })
                          }
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="metaDescription" className="text-admin-foreground">
                          Descripción Meta
                        </Label>
                        <Textarea
                          id="metaDescription"
                          value={storeConfig.seo.metaDescription}
                          onChange={(e) =>
                            setStoreConfig({
                              ...storeConfig,
                              seo: { ...storeConfig.seo, metaDescription: e.target.value },
                            })
                          }
                          className="admin-input"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="keywords" className="text-admin-foreground">
                          Palabras Clave
                        </Label>
                        <Input
                          id="keywords"
                          value={storeConfig.seo.keywords}
                          onChange={(e) =>
                            setStoreConfig({
                              ...storeConfig,
                              seo: { ...storeConfig.seo, keywords: e.target.value },
                            })
                          }
                          className="admin-input"
                          placeholder="Separadas por comas"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-4 mt-8">
                <Button
                  variant="outline"
                  className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                >
                  Cancelar
                </Button>
                <Button onClick={handleConfigUpdate} className="admin-button-primary">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="admin-card max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-admin-foreground text-2xl">
                  Detalles del Pedido {selectedOrder?.id}
                </DialogTitle>
                <DialogDescription className="text-admin-muted">
                  Información completa del pedido y seguimiento
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOrderDetailsOpen(false)}
                className="text-admin-muted hover:text-admin-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 mt-6">
              {/* ... Order details JSX ... */}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isLoading}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Guardando producto...</DialogTitle>
            <DialogDescription>
              Por favor espera mientras se guarda el producto.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="admin-card max-w-4xl max-h-[90vh] overflow-y-auto">
          <EditProductForm
            productToEdit={productToEdit}
            setProductToEdit={setProductToEdit}
            handleUpdateProduct={handleUpdateProduct}
            setNewImageFile={setNewImageFile}
            fileUploaderKey={fileUploaderKey}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default withAdminAuth(AdminPage)
