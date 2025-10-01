import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Collar Muisca Dorado",
    price: "$450.000",
    originalPrice: "$520.000",
    image: "/colombian-emerald-necklace-gold-muisca-design.jpg",
    rating: 4.9,
    reviews: 23,
    badge: "Bestseller",
    badgeColor: "bg-secondary text-secondary-foreground",
  },
  {
    id: 2,
    name: "Hoodie El Dorado",
    price: "$120.000",
    image: "/colombian-hoodie-el-dorado-pre-columbian-design.jpg",
    rating: 4.8,
    reviews: 45,
    badge: "Nuevo",
    badgeColor: "bg-primary text-primary-foreground",
  },
  {
    id: 3,
    name: "Aretes Esmeralda Bogotá",
    price: "$280.000",
    image: "/colombian-emerald-earrings-bogota-inspired-jewelry.jpg",
    rating: 5.0,
    reviews: 12,
    badge: "Exclusivo",
    badgeColor: "bg-primary text-primary-foreground",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-balance mb-4">Productos Destacados</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Nuestras piezas más populares, cuidadosamente seleccionadas por su calidad excepcional y diseño
            auténticamente colombiano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-3 left-3 ${product.badgeColor}`}>{product.badge}</Badge>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                </div>

                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-lg text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                  )}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Agregar al Carrito
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Ver Todos los Productos
          </Button>
        </div>
      </div>
    </section>
  )
}
