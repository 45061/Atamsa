import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JewelryHero } from "@/components/jewelry-hero"
import { JewelryCategories } from "@/components/jewelry-categories"
import { JewelryProducts } from "@/components/jewelry-products"
import { JewelryFilters } from "@/components/jewelry-filters"

export default function JoyeriaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <JewelryHero />
        <JewelryCategories />
        <JewelryFilters />
        <JewelryProducts />
      </main>
      <Footer />
    </div>
  )
}
