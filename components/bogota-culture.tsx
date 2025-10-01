import { Building, Palette, Music, Coffee } from "lucide-react"

export function BogotaCulture() {
  const culturalElements = [
    {
      icon: Building,
      title: "Arquitectura Colonial",
      description: "Los patrones geométricos de La Candelaria inspiran nuestros diseños de joyería precolombina.",
      image: "/la-candelaria-colonial-architecture-colorful-facad.jpg",
    },
    {
      icon: Palette,
      title: "Arte Urbano",
      description: "Los murales y grafitis bogotanos influencian los colores vibrantes de nuestra ropa contemporánea.",
      image: "/bogot--street-art-colorful-murals-urban-culture.jpg",
    },
    {
      icon: Music,
      title: "Ritmos Andinos",
      description: "La música tradicional se refleja en los patrones rítmicos de nuestros textiles artesanales.",
      image: "/colombian-andean-music-traditional-instruments.jpg",
    },
    {
      icon: Coffee,
      title: "Cultura Cafetera",
      description: "Los tonos tierra del café colombiano definen nuestra paleta de colores naturales.",
      image: "/colombian-coffee-culture-beans-warm-earth-tones.jpg",
    },
  ]

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-balance">
            La Cultura Bogotana en
            <span className="text-primary block">Cada Creación</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Descubre cómo los elementos más emblemáticos de Bogotá se transforman en inspiración para nuestras piezas
            únicas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {culturalElements.map((element, index) => (
            <div
              key={index}
              className="group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={element.image || "/placeholder.svg"}
                  alt={element.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <element.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-display">{element.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{element.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
