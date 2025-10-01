import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gem, Shirt, Crown, MapPin } from "lucide-react"

const categories = [
  {
    icon: Gem,
    title: "Joyería con Esmeraldas",
    description: "Piezas únicas elaboradas con las mejores esmeraldas colombianas",
    image: "/colombian-emerald-jewelry-elegant-display.jpg",
    color: "text-primary",
  },
  {
    icon: Shirt,
    title: "Ropa Precolombina",
    description: "Camisas y hoodies con diseños inspirados en culturas ancestrales",
    image: "/colombian-pre-columbian-inspired-clothing-t-shirts.jpg",
    color: "text-secondary",
  },
  {
    icon: Crown,
    title: "Arte Precolombino",
    description: "Réplicas y piezas inspiradas en el legado de nuestros ancestros",
    image: "/pre-columbian-art-replicas-colombian-indigenous-cu.jpg",
    color: "text-primary",
  },
  {
    icon: MapPin,
    title: "Temática Bogotá",
    description: "Productos que celebran la capital y su cultura única",
    image: "/bogota-colombia-themed-merchandise-cultural-items.jpg",
    color: "text-secondary",
  },
]

export function ProductCategories() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-balance mb-4">Nuestras Colecciones</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Cada pieza cuenta una historia de Colombia, desde las profundidades de nuestras minas hasta la riqueza de
            nuestras tradiciones ancestrales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                  <h3 className="font-display text-xl">{category.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                >
                  Ver Colección
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
