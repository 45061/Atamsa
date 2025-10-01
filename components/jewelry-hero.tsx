import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gem, Award, Shield } from "lucide-react"

export function JewelryHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-6 bg-secondary text-secondary-foreground">
              <Gem className="h-4 w-4 mr-2" />
              Esmeraldas Colombianas Auténticas
            </Badge>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-balance mb-6">
              Joyería de
              <span className="text-primary"> Esmeraldas</span>
              <br />
              Colombianas
            </h1>

            <p className="text-lg text-muted-foreground text-pretty mb-8 max-w-xl">
              Descubre la belleza única de las esmeraldas colombianas en diseños que celebran nuestra rica herencia
              cultural. Cada pieza cuenta una historia de tradición y elegancia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Gem className="h-5 w-5 mr-2" />
                Explorar Colección
              </Button>
              <Button variant="outline" size="lg">
                Ver Certificados
              </Button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Certificado de Autenticidad</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Garantía de Calidad</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
              <img
                src="/colombian-emerald-jewelry-collection-hero.jpg"
                alt="Colección de joyería con esmeraldas colombianas"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background rounded-xl p-4 shadow-lg border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Gem className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">+500 Piezas</div>
                  <div className="text-sm text-muted-foreground">Únicas y Auténticas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
