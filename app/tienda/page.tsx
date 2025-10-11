import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingCart, Heart, SlidersHorizontal } from "lucide-react"
import dbConnect from "@/lib/db"
import Product from "@/models/Product"
import { Types } from "mongoose"
import { ProductFilters } from "@/components/product-filters"

// This interface represents the plain JavaScript object returned by .lean()
interface ProductData {
  _id: Types.ObjectId;
  name: string;
  price: string;
  image: string;
  category: string;
  subcategory?: string;
}

// This interface defines the shape of the product object used by the page component
export interface PageProduct {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  subcategory?: string;
}

// Helper function to fetch and process products
async function getProducts(): Promise<PageProduct[]> {
  await dbConnect()
  const products = (await Product.find({}).lean()) as unknown as ProductData[]

  return products.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    price: parseFloat(product.price) || 0,
    image: product.image,
    category: product.category,
    subcategory: product.subcategory,
  }))
}

export default async function TiendaPage() {
  const allProducts = await getProducts()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-accent/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-6xl text-primary mb-6 text-balance">Catálogo Completo</h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Explora toda nuestra colección de productos auténticos colombianos. Desde joyería con esmeraldas hasta
                artesanías tradicionales, encuentra el tesoro perfecto para ti.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Filters and Product Grid */}
        <ProductFilters allProducts={allProducts} />

        {/* Benefits Section */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-primary">Envío Gratis</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  En compras superiores a $150.000 en toda Colombia
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-primary">100% Auténtico</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Todos nuestros productos son genuinamente colombianos
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-primary">Calidad Garantizada</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Selección cuidadosa de cada pieza por expertos
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}