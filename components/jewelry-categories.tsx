import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    id: 1,
    name: "Collares",
    description: "Elegantes collares con esmeraldas en diseños únicos",
    image: "/colombian-emerald-necklaces-category.jpg",
    count: "45+ piezas",
    featured: true,
  },
  {
    id: 2,
    name: "Aretes",
    description: "Aretes delicados que realzan tu belleza natural",
    image: "/colombian-emerald-earrings-category.jpg",
    count: "38+ piezas",
    featured: false,
  },
  {
    id: 3,
    name: "Anillos",
    description: "Anillos de compromiso y elegancia con esmeraldas",
    image: "/colombian-emerald-rings-category.jpg",
    count: "52+ piezas",
    featured: true,
  },
  {
    id: 4,
    name: "Pulseras",
    description: "Pulseras artesanales con toques de tradición",
    image: "/colombian-emerald-bracelets-category.jpg",
    count: "29+ piezas",
    featured: false,
  },
  {
    id: 5,
    name: "Conjuntos",
    description: "Sets completos para ocasiones especiales",
    image: "/colombian-emerald-jewelry-sets-category.jpg",
    count: "18+ piezas",
    featured: true,
  },
  {
    id: 6,
    name: "Broches",
    description: "Broches tradicionales con diseños precolombinos",
    image: "/colombian-emerald-brooches-category.jpg",
    count: "15+ piezas",
    featured: false,
  },
]

export function JewelryCategories() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-balance mb-4">Categorías de Joyería</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Explora nuestra amplia selección de joyería colombiana, cada pieza cuidadosamente elaborada con las mejores
            esmeraldas del país.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={
                    category.image || "/placeholder.svg?height=300&width=400&query=Colombian emerald jewelry category"
                  }
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {category.featured && (
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">Destacado</Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-display text-xl mb-1">{category.name}</h3>
                  <p className="text-sm opacity-90 mb-2">{category.description}</p>
                  <div className="text-xs opacity-75">{category.count}</div>
                </div>
              </div>

              <CardContent className="p-6">
                <Button className="w-full bg-primary hover:bg-primary/90">Ver {category.name}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
