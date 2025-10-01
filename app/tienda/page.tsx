import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Filter, SlidersHorizontal } from "lucide-react"
import Image from "next/image"

const allProducts = [
  // Joyería
  {
    id: 1,
    name: "Collar de Esmeraldas Colombianas",
    price: 450000,
    image: "/colombian-emerald-necklace-elegant.jpg",
    category: "Joyería",
    subcategory: "Collares",
  },
  {
    id: 2,
    name: "Aretes Precolombinos en Oro",
    price: 380000,
    image: "/pre-columbian-gold-earrings.jpg",
    category: "Joyería",
    subcategory: "Aretes",
  },
  // Ropa
  {
    id: 3,
    name: "Ruana Tradicional Boyacense",
    price: 189000,
    image: "/traditional-colombian-ruana-wool-poncho.jpg",
    category: "Ropa",
    subcategory: "Ruanas",
  },
  {
    id: 4,
    name: "Sombrero Vueltiao Auténtico",
    price: 95000,
    image: "/colombian-vueltiao-hat-traditional.jpg",
    category: "Ropa",
    subcategory: "Accesorios",
  },
  // Artesanías
  {
    id: 5,
    name: "Máscara Ceremonial Muisca",
    price: 125000,
    image: "/muisca-ceremonial-mask-gold.jpg",
    category: "Artesanías",
    subcategory: "Arte Precolombino",
  },
  {
    id: 6,
    name: "Cerámica Pintada a Mano",
    price: 85000,
    image: "/hand-painted-colombian-ceramic-vase.jpg",
    category: "Artesanías",
    subcategory: "Cerámica",
  },
  // Decoración
  {
    id: 7,
    name: "Cuadro Botero Réplica",
    price: 165000,
    image: "/botero-style-painting-colombian-art.jpg",
    category: "Decoración",
    subcategory: "Arte",
  },
  {
    id: 8,
    name: "Hamaca Artesanal Wayuu",
    price: 245000,
    image: "/wayuu-hammock-colorful-traditional.jpg",
    category: "Decoración",
    subcategory: "Textiles",
  },
  // Souvenirs Bogotá
  {
    id: 9,
    name: "Camiseta Vintage Bogotá",
    price: 65000,
    image: "/placeholder.svg?height=400&width=400",
    category: "Souvenirs",
    subcategory: "Bogotá",
  },
  {
    id: 10,
    name: "Taza Cerámica Monserrate",
    price: 35000,
    image: "/placeholder.svg?height=400&width=400",
    category: "Souvenirs",
    subcategory: "Bogotá",
  },
  {
    id: 11,
    name: "Pulsera de Plata con Esmeralda",
    price: 280000,
    image: "/placeholder.svg?height=400&width=400",
    category: "Joyería",
    subcategory: "Pulseras",
  },
  {
    id: 12,
    name: "Mochila Arhuaca Original",
    price: 175000,
    image: "/arhuaca-indigenous-bag-colorful-patterns.jpg",
    category: "Ropa",
    subcategory: "Accesorios",
  },
]

export default function TiendaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-accent/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-6xl text-primary mb-6 text-balance">Catálogo Completo</h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Explora toda nuestra colección de productos auténticos colombianos. Desde joyería con esmeraldas hasta
                artesanías tradicionales, encuentra el tesoro perfecto para ti.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Bar */}
        <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Button variant="default" size="sm">
                  Todos
                </Button>
                <Button variant="outline" size="sm">
                  Joyería
                </Button>
                <Button variant="outline" size="sm">
                  Ropa
                </Button>
                <Button variant="outline" size="sm">
                  Artesanías
                </Button>
                <Button variant="outline" size="sm">
                  Decoración
                </Button>
                <Button variant="outline" size="sm">
                  Souvenirs
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline" size="sm">
                  Ordenar por
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <p className="text-muted-foreground">Mostrando {allProducts.length} productos</p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-accent/5">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="w-full" size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Agregar al Carrito
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">{product.subcategory}</p>
                    <h3 className="font-medium text-sm text-balance leading-tight">{product.name}</h3>
                    <p className="font-display text-lg text-primary">${product.price.toLocaleString("es-CO")}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Cargar Más Productos
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-primary">Envío Gratis</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  En compras superiores a $150.000 en toda Colombia
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-primary">100% Auténtico</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Todos nuestros productos son genuinamente colombianos
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Filter className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-primary">Calidad Garantizada</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Selección cuidadosa de cada pieza por expertos
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
