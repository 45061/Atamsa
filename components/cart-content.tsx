'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { LoginModal } from "@/components/login-modal"

// Interfaz que coincide con los datos del localStorage
interface Product {
  _id: string;
  name: string;
  price: string; // El precio viene como string, ej: "$ 450.000"
  originalPrice?: string;
  image: string;
  category: string;
  description?: string;
  quantity: number; // Añadimos quantity para el manejo del carrito
}

// Función para convertir el precio de string a número
const parsePrice = (price: string): number => {
  if (!price) return 0;
  return Number(price.replace(/[^\d]/g, ''));
};

export function CartContent() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const itemsFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    // Aseguramos que cada item tenga una cantidad
    const itemsWithQuantity = itemsFromStorage.map((item: any) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(itemsWithQuantity);
  }, []);

  const updateCartInStorage = (items: Product[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const updateQuantity = (_id: string, newQuantity: number) => {
    let updatedItems;
    if (newQuantity === 0) {
      updatedItems = cartItems.filter((item) => item._id !== _id);
    } else {
      updatedItems = cartItems.map((item) => (item._id === _id ? { ...item, quantity: newQuantity } : item));
    }
    setCartItems(updatedItems);
    updateCartInStorage(updatedItems);
  };

  const removeItem = (_id: string) => {
    const updatedItems = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedItems);
    updateCartInStorage(updatedItems);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  const shipping = subtotal > 200000 ? 0 : 15000;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/checkout");
    } else {
      setIsLoginModalOpen(true);
    }
  };

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
    );
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
            <Card key={item._id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Link href={`/tienda/${item._id}`}>
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0 cursor-pointer">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {item.category}
                        </Badge>
                        <h3 className="font-semibold text-lg text-primary mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.description || ''}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item._id)}
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
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        {item.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {formatPrice(parsePrice(item.originalPrice) * item.quantity)}
                          </div>
                        )}
                        <div className="font-semibold text-lg text-[#1B5E20]">
                          {formatPrice(parsePrice(item.price) * item.quantity)}
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