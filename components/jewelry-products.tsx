import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Eye, Gem } from "lucide-react"

const jewelryProducts = [
  {
    id: 1,
    name: "Collar Esmeralda Muisca",
    price: "$450.000",
    originalPrice: "$520.000",
    image: "/colombian-emerald-necklace-muisca-design.jpg",
    rating: 4.9,
    reviews: 23,
    badge: "Bestseller",
    badgeColor: "bg-secondary text-secondary-foreground",
    material: "Oro 18k",
    style: "Precolombino",
    inStock: true,
  },
  {
    id: 2,
    name: "Aretes Esmeralda Bogotá",
    price: "$280.000",
    image: "/colombian-emerald-earrings-bogota-inspired.jpg",
    rating: 5.0,
    reviews: 12,
    badge: "Exclusivo",
    badgeColor: "bg-primary text-primary-foreground",
    material: "Oro 18k",
    style: "Moderno",
    inStock: true,
  },
  {
    id: 3,
    name: "Anillo Compromiso Esmeralda",
    price: "$850.000",
    image: "/colombian-emerald-engagement-ring.jpg",
    rating: 4.8,
    reviews: 34,
    badge: "Nuevo",
    badgeColor: "bg-primary text-primary-foreground",
    material: "Oro Blanco",
    style: "Clásico",
    inStock: true,
  },
  {
    id: 4,
    name: "Pulsera Artesanal Esmeralda",
    price: "$320.000",
    originalPrice: "$380.000",
    image: "/colombian-emerald-artisan-bracelet.jpg",
    rating: 4.7,
    reviews: 18,
    badge: "Oferta",
    badgeColor: "bg-destructive text-destructive-foreground",
    material: "Plata 925",
    style: "Artesanal",
    inStock: true,
  },
  {
    id: 5,
    name: "Conjunto Esmeralda Elegante",
    price: "$1.200.000",
    image: "/colombian-emerald-jewelry-elegant-set.jpg",
    rating: 4.9,
    reviews: 8,
    badge: "Premium",
    badgeColor: "bg-secondary text-secondary-foreground",
    material: "Oro 18k",
    style: "Elegante",
    inStock: true,
  },
  {
    id: 6,
    name: "Broche Precolombino Esmeralda",
    price: "$180.000",
    image: "/colombian-emerald-pre-columbian-brooch.jpg",
    rating: 4.6,
    reviews: 15,
    badge: "Tradicional",
    badgeColor: "bg-muted text-muted-foreground",
    material: "Plata 925",
    style: "Precolombino",
    inStock: false,
  },
  {
    id: 7,
    name: "Collar Gargantilla Esmeralda",
    price: "$390.000",
    image: "/colombian-emerald-choker-necklace.jpg",
    rating: 4.8,
    reviews: 21,
    badge: "Tendencia",
    badgeColor: "bg-primary text-primary-foreground",
    material: "Oro 18k",
    style: "Moderno",
    inStock: true,
  },
  {
    id: 8,
    name: "Aretes Colgantes Esmeralda",
    price: "$420.000",
    image: "/colombian-emerald-drop-earrings.jpg",
    rating: 4.9,
    reviews: 19,
    badge: "Elegante",
    badgeColor: "bg-secondary text-secondary-foreground",
    material: "Oro 18k",
    style: "Elegante",
    inStock: true,
  },
  {
    id: 9,
    name: "Anillo Solitario Esmeralda",
    price: "$650.000",
    image: "/colombian-emerald-solitaire-ring.jpg",
    rating: 5.0,
    reviews: 27,
    badge: "Clásico",
    badgeColor: "bg-muted text-muted-foreground",
    material: "Platino",
    style: "Clásico",
    inStock: true,
  },
]

export function JewelryProducts() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl mb-2">Nuestra Colección</h2>
            <p className="text-muted-foreground">Mostrando {jewelryProducts.length} productos</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ordenar por:</span>
            <select className="border border-input rounded-md px-3 py-1 bg-background">
              <option>Más populares</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Mejor calificados</option>
              <option>Más recientes</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jewelryProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg?height=400&width=300&query=Colombian emerald jewelry"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-3 left-3 ${product.badgeColor}`}>{product.badge}</Badge>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Agotado</Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
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

                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Gem className="h-3 w-3" />
                    {product.material}
                  </span>
                  <span>•</span>
                  <span>{product.style}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-lg text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                  )}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90" disabled={!product.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Agregar al Carrito" : "Agotado"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Cargar Más Productos
          </Button>
        </div>
      </div>
    </section>
  )
}
