import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function BogotaInspiration() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide uppercase">Inspiración Bogotana</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display text-balance leading-tight">
                De las Calles de Bogotá
                <span className="text-primary block">a Tu Guardarropa</span>
              </h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Cada amanecer en la Sabana de Bogotá trae nuevas inspiraciones. Los colores del atardecer sobre los
                cerros orientales, la elegancia de la Zona Rosa, y la autenticidad de los barrios tradicionales se
                fusionan en nuestras creaciones.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium mb-1">Cerros Orientales</h4>
                  <p className="text-sm text-muted-foreground">
                    Los verdes esmeralda de las montañas inspiran nuestras gemas.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium mb-1">Zona Rosa</h4>
                  <p className="text-sm text-muted-foreground">
                    La sofisticación urbana se refleja en nuestros diseños contemporáneos.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium mb-1">Mercados Tradicionales</h4>
                  <p className="text-sm text-muted-foreground">
                    La riqueza artesanal se preserva en cada pieza hecha a mano.
                  </p>
                </div>
              </div>
            </div>

            <Button className="group">
              Ver Colección Bogotana
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src="/bogot--sunset-over-eastern-hills-golden-light.jpg"
                    alt="Atardecer en Bogotá"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img src="/zona-rosa-bogot--modern-architecture-elegant-build.jpg" alt="Zona Rosa Bogotá" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src="/bogot--traditional-market-colorful-crafts-artisans.jpg"
                    alt="Mercado tradicional"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src="/colombian-emerald-green-mountains-nature-inspirati.jpg"
                    alt="Cerros orientales"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
