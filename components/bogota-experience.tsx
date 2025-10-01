import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Users, Award, Globe } from "lucide-react"

export function BogotaExperience() {
  const experiences = [
    {
      icon: Clock,
      title: "500 Años de Historia",
      description: "Desde la fundación de Santafé de Bogotá hasta hoy",
    },
    {
      icon: Users,
      title: "8 Millones de Habitantes",
      description: "Una metrópoli vibrante y multicultural",
    },
    {
      icon: Award,
      title: "Capital Cultural",
      description: "Centro de arte, literatura y música de Colombia",
    },
    {
      icon: Globe,
      title: "Conexión Mundial",
      description: "Puerta de entrada a la cultura colombiana",
    },
  ]

  return (
    <section className="py-24 px-4 bg-primary/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-balance">
            Vive la Experiencia
            <span className="text-primary block">Bogotana</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Sumérgete en la riqueza cultural de Bogotá a través de nuestras piezas que capturan la esencia de esta
            ciudad única.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {experiences.map((experience, index) => (
            <Card key={index} className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <experience.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-lg">{experience.title}</h3>
                <p className="text-sm text-muted-foreground">{experience.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-display">¿Listo para llevar un pedazo de Bogotá contigo?</h3>
            <p className="text-muted-foreground">Explora nuestra colección inspirada en la capital colombiana</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Explorar Joyería</Button>
            <Button variant="outline" size="lg">
              Ver Ropa
            </Button>
            <Button variant="outline" size="lg">
              Arte Precolombino
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
