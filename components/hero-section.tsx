import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with Colombian pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-secondary rounded-full"></div>
          <div className="absolute bottom-32 left-1/3 w-16 h-16 border-2 border-primary/50 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-8">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary-foreground">Auténtica artesanía colombiana</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-balance mb-6">
            <span className="text-foreground">Tesoros de</span>
            <br />
            <span className="text-primary">Colombia</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8 leading-relaxed">
            Descubre la magia de Colombia a través de nuestra exclusiva colección de joyería con esmeraldas y ropa
            inspirada en la rica cultura precolombina y la vibrante esencia de Bogotá.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Explorar Colección
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              Ver Joyería con Esmeraldas
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative emerald */}
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-primary/20 rounded-full emerald-glow hidden lg:block"></div>
    </section>
  )
}
