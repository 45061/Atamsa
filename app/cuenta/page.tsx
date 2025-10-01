"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Package, Truck, CheckCircle, Clock, MapPin, Calendar, Star, Download, Eye } from "lucide-react"

// Mock data for user orders
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "entregado",
    total: 450000,
    items: [
      {
        name: "Collar Esmeralda Muisca",
        price: 350000,
        quantity: 1,
        image: "/emerald-necklace.jpg",
      },
      {
        name: "Aretes Precolombinos",
        price: 100000,
        quantity: 1,
        image: "/pre-columbian-earrings.jpg",
      },
    ],
    tracking: "COL123456789",
    address: "Calle 93 #15-20, Bogotá, Colombia",
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    status: "en_transito",
    total: 280000,
    items: [
      {
        name: "Camiseta Bogotá Vintage",
        price: 80000,
        quantity: 2,
        image: "/bogota-vintage-shirt.jpg",
      },
      {
        name: "Pulsera Artesanal",
        price: 120000,
        quantity: 1,
        image: "/artisan-bracelet.jpg",
      },
    ],
    tracking: "COL987654321",
    address: "Carrera 11 #85-32, Bogotá, Colombia",
  },
  {
    id: "ORD-003",
    date: "2024-01-25",
    status: "procesando",
    total: 650000,
    items: [
      {
        name: "Anillo Esmeralda Premium",
        price: 650000,
        quantity: 1,
        image: "/premium-emerald-ring.jpg",
      },
    ],
    tracking: "COL456789123",
    address: "Avenida 19 #104-62, Bogotá, Colombia",
  },
]

const statusConfig = {
  procesando: {
    label: "Procesando",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  en_transito: {
    label: "En Tránsito",
    color: "bg-blue-100 text-blue-800",
    icon: Truck,
  },
  entregado: {
    label: "Entregado",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
}

export default function CuentaPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen account-theme">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif-elegant text-5xl text-balance mb-4">Mi Cuenta</h1>
          <p className="account-text-muted text-lg max-w-2xl mx-auto text-pretty">
            Gestiona tus pedidos y descubre la belleza de Colombia en cada compra
          </p>
        </div>

        {/* User Profile Card */}
        <div className="account-card p-8 mb-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback className="text-xl">MC</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-serif-elegant text-2xl mb-2">María Camila Rodríguez</h2>
              <p className="account-text-muted mb-1">maria.rodriguez@email.com</p>
              <p className="account-text-muted">Cliente desde enero 2024</p>
            </div>
            <div className="ml-auto">
              <Badge variant="secondary" className="account-accent">
                <Star className="h-3 w-3 mr-1" />
                Cliente VIP
              </Badge>
            </div>
          </div>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="account-card p-6 text-center">
            <Package className="h-8 w-8 account-accent mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">12</div>
            <div className="account-text-muted">Pedidos Totales</div>
          </div>
          <div className="account-card p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">10</div>
            <div className="account-text-muted">Entregados</div>
          </div>
          <div className="account-card p-6 text-center">
            <Truck className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">2</div>
            <div className="account-text-muted">En Proceso</div>
          </div>
        </div>

        {/* Orders Section */}
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="procesando">Procesando</TabsTrigger>
            <TabsTrigger value="en_transito">En Tránsito</TabsTrigger>
            <TabsTrigger value="entregado">Entregados</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-6">
            {mockOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                formatPrice={formatPrice}
                formatDate={formatDate}
                statusConfig={statusConfig}
              />
            ))}
          </TabsContent>

          <TabsContent value="procesando" className="space-y-6">
            {mockOrders
              .filter((order) => order.status === "procesando")
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  formatPrice={formatPrice}
                  formatDate={formatDate}
                  statusConfig={statusConfig}
                />
              ))}
          </TabsContent>

          <TabsContent value="en_transito" className="space-y-6">
            {mockOrders
              .filter((order) => order.status === "en_transito")
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  formatPrice={formatPrice}
                  formatDate={formatDate}
                  statusConfig={statusConfig}
                />
              ))}
          </TabsContent>

          <TabsContent value="entregado" className="space-y-6">
            {mockOrders
              .filter((order) => order.status === "entregado")
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  formatPrice={formatPrice}
                  formatDate={formatDate}
                  statusConfig={statusConfig}
                />
              ))}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}

function OrderCard({ order, formatPrice, formatDate, statusConfig }: any) {
  const StatusIcon = statusConfig[order.status].icon

  return (
    <div className="account-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">Pedido {order.id}</h3>
          <p className="account-text-muted flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formatDate(order.date)}
          </p>
        </div>
        <div className="text-right">
          <Badge className={statusConfig[order.status].color}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusConfig[order.status].label}
          </Badge>
          <p className="font-bold text-lg mt-1">{formatPrice(order.total)}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {order.items.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-4">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="account-text-muted">Cantidad: {item.quantity}</p>
            </div>
            <p className="font-semibold">{formatPrice(item.price)}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 account-text-muted">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{order.address}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            Ver Detalles
          </Button>
          {order.status === "entregado" && (
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Factura
            </Button>
          )}
        </div>
      </div>

      {order.tracking && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm account-text-muted">
            Número de seguimiento: <span className="font-mono font-medium">{order.tracking}</span>
          </p>
        </div>
      )}
    </div>
  )
}
