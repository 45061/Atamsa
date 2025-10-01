import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartContent } from "@/components/cart-content"

export default function CarritoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl text-primary mb-4 text-balance">Tu Carrito de Compras</h1>
            <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
              Revisa tus productos seleccionados y procede con tu compra de auténticos tesoros colombianos.
            </p>
          </div>
          <CartContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}
