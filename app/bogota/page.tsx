import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BogotaHero } from "@/components/bogota-hero"
import { BogotaCulture } from "@/components/bogota-culture"
import { BogotaInspiration } from "@/components/bogota-inspiration"
import { BogotaExperience } from "@/components/bogota-experience"

export default function BogotaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BogotaHero />
        <BogotaCulture />
        <BogotaInspiration />
        <BogotaExperience />
      </main>
      <Footer />
    </div>
  )
}
