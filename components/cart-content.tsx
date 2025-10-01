"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { LoginModal } from "@/components/login-modal"

interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  category: string
  description: string
}

export function CartContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Collar de Esmeraldas Boyacá",
      price: 450000,
      originalPrice: 520000,
      quantity: 1,
      image: "/colombian-emerald-jewelry-elegant-display.jpg",
      category: "Joyería",
      description: "Collar artesanal con esmeraldas auténticas de Boyacá",
    },
    {
      id: "2",
      name: "Camiseta Precolombina Muisca",
      price: 85000,
      quantity: 2,
      image: "/colombian-pre-columbian-inspired-clothing-t-shirts.jpg",
      category: "Ropa",
      description: "Diseño inspirado en la cultura Muisca",
    },
    {
      id: "3",
      name: "Hoodie Bogotá Skyline",
      price: 120000,
      quantity: 1,
      image: "/hoodie-with-bogota-skyline-design.jpg",
      category: "Ropa",
      description: "Sudadera con el skyline icónico de Bogotá",
    },
  ])
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const router = useRouter()

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((items) => items.filter((item) => item.id !== id))
    } else {
      setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 200000 ? 0 : 15000
  const total = subtotal + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleCheckout = () => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/checkout")
    } else {
      setIsLoginModalOpen(true)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <div className="text-4xl">🛒</div>
          </div>
          <h2 className="font-display text-2xl text-primary mb-2">Tu carrito está vacío</h2>
          <p className="text-muted-foreground mb-8">
            Descubre nuestros auténticos tesoros colombianos y añade algunos productos a tu carrito.
          </p>
          <Link href="/">
            <Button className="bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuar Comprando
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-primary">Productos ({cartItems.length})</h2>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuar Comprando
              </Button>
            </Link>
          </div>

          {cartItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {item.category}
                        </Badge>
                        <h3 className="font-semibold text-lg text-primary mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        {item.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </div>
                        )}
                        <div className="font-semibold text-lg text-[#1B5E20]">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="font-display text-xl text-primary mb-6">Resumen del Pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="font-medium">
                    {shipping === 0 ? <span className="text-[#1B5E20]">Gratis</span> : formatPrice(shipping)}
                  </span>
                </div>

                {shipping === 0 && (
                  <div className="text-sm text-[#1B5E20] bg-[#1B5E20]/10 p-3 rounded-lg">
                    ¡Felicitaciones! Tu pedido califica para envío gratis
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-[#1B5E20]">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-[#FFD600] hover:bg-[#FFD600]/90 text-black font-semibold" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceder al Pago
                </Button>

                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Métodos de pago aceptados:</div>
                  <div className="flex justify-center gap-2 text-xs text-muted-foreground">
                    <span>💳 Tarjetas</span>
                    <span>•</span>
                    <span>🏦 PSE</span>
                    <span>•</span>
                    <span>📱 Nequi</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium mb-2">🚚 Información de Envío:</div>
                  <ul className="space-y-1 text-xs">
                    <li>• Envío gratis en compras superiores a $200.000</li>
                    <li>• Entrega en 2-5 días hábiles</li>
                    <li>• Cobertura nacional</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </>
  )
}