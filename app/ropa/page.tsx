'use client'

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Heart, ShoppingCart, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PageProduct {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  subcategory?: string;
  inStock: boolean;
}

export default function RopaPage() {
  const [products, setProducts] = useState<PageProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<PageProduct[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products?category=Ropa');
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
      const uniqueSubcategories = Array.from(new Set(data.map((p: PageProduct) => p.subcategory).filter(Boolean)));
      // @ts-ignore
      setSubcategories(uniqueSubcategories);
    };
    fetchProducts();
  }, []);

  const handleSubcategoryClick = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory);
    if (subcategory) {
      setFilteredProducts(products.filter(p => p.subcategory === subcategory));
    } else {
      setFilteredProducts(products);
    }
  };

  const handleAddToCart = (product: PageProduct) => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cartItems.find((item: PageProduct) => item._id === product._id);

    if (existingProduct) {
      toast({
        title: "Producto ya en el carrito",
        description: `${product.name} ya ha sido agregado anteriormente.`,
      });
      return;
    }

    const newCartItems = [...cartItems, product];
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    
    toast({
      title: "¡Producto Agregado!",
      description: `${product.name} ha sido agregado a tu carrito.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-accent/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4">Ropa Tradicional</Badge>
              <h1 className="font-display text-4xl md:text-6xl text-primary mb-6 text-balance">
                Viste la Tradición Colombiana
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Descubre nuestra colección de ropa tradicional colombiana, desde ruanas boyacenses hasta vestidos wayuu,
                cada pieza tejida con amor y tradición ancestral.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={!selectedSubcategory ? "default" : "outline"}
                size="sm"
                onClick={() => handleSubcategoryClick(null)}
              >
                Todas las Categorías
              </Button>
              {subcategories.map(sc => (
                <Button
                  key={sc}
                  variant={selectedSubcategory === sc ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSubcategoryClick(sc)}
                >
                  {sc}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-muted-foreground">Mostrando {filteredProducts.length} productos</p>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="group">
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-accent/5">
                    <Link href={`/tienda/${product._id}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </Link>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Agotado</Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        className="w-full" 
                        size="sm" 
                        disabled={!product.inStock}
                        onClick={(e) => {
                          e.preventDefault(); // Evita que el Link se active
                          handleAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "Agregar al Carrito" : "Agotado"}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.subcategory || product.category}
                    </Badge>
                    <Link href={`/tienda/${product._id}`}>
                      <h3 className="font-medium text-sm text-balance leading-tight hover:underline">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <p className="font-display text-lg text-primary">${product.price.toLocaleString("es-CO")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="font-display text-3xl md:text-4xl text-primary">Ropa Hecha con Tradición</h2>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Cada prenda en nuestra colección es creada por artesanos colombianos que han heredado técnicas
                ancestrales de tejido y bordado. Al comprar ropa tradicional colombiana, no solo adquieres una prenda
                única, sino que también apoyas a comunidades indígenas y preservas un patrimonio cultural invaluable.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}