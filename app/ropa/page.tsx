import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Filter } from "lucide-react"
import Image from "next/image"

const ropaProducts = [
  {
    id: 1,
    name: "Ruana Tradicional Boyacense",
    price: 189000,
    image: "/traditional-colombian-ruana-wool-poncho.jpg",
    category: "Ruanas",
    colors: ["Rojo", "Azul", "Verde"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Camisa Guayabera Blanca",
    price: 145000,
    image: "/white-guayabera-shirt-colombian-style.jpg",
    category: "Camisas",
    colors: ["Blanco", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 3,
    name: "Vestido Wayuu Artesanal",
    price: 220000,
    image: "/colorful-wayuu-traditional-dress.jpg",
    category: "Vestidos",
    colors: ["Multicolor"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 4,
    name: "Sombrero Vueltiao Auténtico",
    price: 95000,
    image: "/colombian-vueltiao-hat-traditional.jpg",
    category: "Accesorios",
    colors: ["Natural"],
    sizes: ["Único"],
  },
  {
    id: 5,
    name: "Mochila Arhuaca Original",
    price: 175000,
    image: "/arhuaca-indigenous-bag-colorful-patterns.jpg",
    category: "Accesorios",
    colors: ["Multicolor"],
    sizes: ["Único"],
  },
  {
    id: 6,
    name: "Poncho Andino de Lana",
    price: 210000,
    image: "/andean-wool-poncho-traditional-patterns.jpg",
    category: "Ruanas",
    colors: ["Gris", "Café", "Negro"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 7,
    name: "Falda Pollera Tradicional",
    price: 165000,
    image: "/traditional-colombian-pollera-skirt-colorful.jpg",
    category: "Faldas",
    colors: ["Rojo", "Amarillo", "Azul"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 8,
    name: "Chaleco Artesanal Bordado",
    price: 135000,
    image: "/embroidered-colombian-vest-traditional.jpg",
    category: "Chalecos",
    colors: ["Negro", "Café"],
    sizes: ["S", "M", "L", "XL"],
  },
]

export default function RopaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-accent/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4">Ropa Tradicional</Badge>
              <h1 className="font-display text-4xl md:text-6xl text-primary mb-6 text-balance">
                Viste la Tradición Colombiana
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Descubre nuestra colección de ropa tradicional colombiana, desde ruanas boyacenses hasta vestidos wayuu,
                cada pieza tejida con amor y tradición ancestral.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" size="sm">
                Todas las Categorías
              </Button>
              <Button variant="outline" size="sm">
                Ruanas
              </Button>
              <Button variant="outline" size="sm">
                Camisas
              </Button>
              <Button variant="outline" size="sm">
                Vestidos
              </Button>
              <Button variant="outline" size="sm">
                Faldas
              </Button>
              <Button variant="outline" size="sm">
                Accesorios
              </Button>
            </div>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-muted-foreground">Mostrando {ropaProducts.length} productos</p>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ropaProducts.map((product) => (
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
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="w-full" size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Agregar al Carrito
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <h3 className="font-medium text-sm text-balance leading-tight">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <p className="font-display text-lg text-primary">${product.price.toLocaleString("es-CO")}</p>
                    </div>
                    <div className="flex gap-1">
                      {product.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-5 h-5 rounded-full border border-border bg-accent/20"
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="font-display text-3xl md:text-4xl text-primary">Ropa Hecha con Tradición</h2>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Cada prenda en nuestra colección es creada por artesanos colombianos que han heredado técnicas
                ancestrales de tejido y bordado. Al comprar ropa tradicional colombiana, no solo adquieres una prenda
                única, sino que también apoyas a comunidades indígenas y preservas un patrimonio cultural invaluable.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
