import { Button } from "@/components/ui/button"
import { MapPin, Heart, Star } from "lucide-react"

export function BogotaHero() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide uppercase">Bogotá, Colombia</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display text-balance leading-tight">
                La Capital que
                <span className="text-primary block">Inspira Nuestros</span>
                Tesoros
              </h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed max-w-lg">
                Desde el corazón de los Andes, Bogotá nos inspira con su rica historia, arquitectura colonial y vibrante
                cultura contemporánea que se refleja en cada pieza de nuestra colección.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explorar Colección
              </Button>
              <Button variant="outline" size="lg">
                Conocer Historia
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Hecho con amor</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Calidad artesanal</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              <img
                src="/bogot--colonial-architecture-la-candelaria-colorfu.jpg"
                alt="Arquitectura colonial de Bogotá en La Candelaria"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-background border rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-display text-primary">2.600m</div>
              <div className="text-sm text-muted-foreground">Altitud</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
