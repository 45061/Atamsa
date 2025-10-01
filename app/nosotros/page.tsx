import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, Award, Globe, Users } from "lucide-react"
import Image from "next/image"

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-accent/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-6xl text-primary mb-6 text-balance">Nuestra Historia</h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Somos una empresa familiar dedicada a compartir la riqueza cultural y artesanal de Colombia con el
                mundo. Cada pieza que ofrecemos cuenta una historia de tradición, pasión y maestría artesanal.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-display text-3xl text-primary">Nuestra Misión</h2>
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  Preservar y promover el patrimonio cultural colombiano a través de productos auténticos de alta
                  calidad. Trabajamos directamente con artesanos locales para garantizar prácticas justas y sostenibles,
                  mientras compartimos la belleza de Colombia con el mundo.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-display text-3xl text-primary">Nuestra Visión</h2>
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  Ser el puente cultural que conecta la artesanía colombiana con coleccionistas y amantes de la cultura
                  en todo el mundo. Aspiramos a ser reconocidos por nuestra autenticidad, calidad excepcional y
                  compromiso con las comunidades artesanales de Colombia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl text-primary mb-4">Nuestros Valores</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Los principios que guían cada decisión y cada producto que ofrecemos
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl text-primary">Autenticidad</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Cada producto es genuinamente colombiano, creado por artesanos locales con técnicas tradicionales
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl text-primary">Pasión</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Amamos lo que hacemos y nos apasiona compartir la cultura colombiana con el mundo
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl text-primary">Comunidad</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Apoyamos a las comunidades artesanales con prácticas comerciales justas y sostenibles
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl text-primary">Calidad</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Seleccionamos cuidadosamente cada pieza para garantizar la más alta calidad y durabilidad
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team/Story Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="font-display text-4xl text-primary">Más de 20 Años de Experiencia</h2>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Fundada en 2003 en el corazón de Bogotá, Tesoros de Colombia nació del sueño de una familia
                    apasionada por preservar y compartir la riqueza cultural de nuestro país. Lo que comenzó como una
                    pequeña tienda en La Candelaria se ha convertido en un puente cultural que conecta a Colombia con el
                    mundo.
                  </p>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Trabajamos directamente con más de 50 artesanos y comunidades indígenas en todo el país, desde los
                    orfebres de Mompox hasta los tejedores de la Sierra Nevada. Cada compra que realizas apoya
                    directamente a estas familias y ayuda a preservar técnicas ancestrales que han pasado de generación
                    en generación.
                  </p>
                  <Button size="lg" className="mt-4">
                    Conoce Nuestros Productos
                  </Button>
                </div>
                <div className="relative h-[500px] rounded-lg overflow-hidden">
                  <Image
                    src="/colombian-artisan-workshop-with-traditional-crafts.jpg"
                    alt="Taller artesanal colombiano"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-display text-4xl text-primary">¿Listo para Descubrir Colombia?</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Explora nuestra colección de productos auténticos y lleva un pedazo de Colombia a tu hogar
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">Ver Catálogo</Button>
                <Button size="lg" variant="outline">
                  Contáctanos
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
