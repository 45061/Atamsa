
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Define the shape of the product object this component receives
interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  subcategory?: string;
}

interface ProductFiltersProps {
  allProducts: Product[];
}

const CATEGORIES = ["Todos", "Joyería", "Ropa", "Artesanías", "Decoración", "Souvenirs"];

export function ProductFilters({ allProducts }: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  useEffect(() => {
    if (selectedCategory === "Todos") {
      setFilteredProducts(allProducts);
    } else {
      const normalizedSelectedCategory = selectedCategory
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      const filtered = allProducts.filter((product) => {
        const normalizedProductCategory = product.category
          ?.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        return normalizedProductCategory === normalizedSelectedCategory;
      });
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, allProducts]);

  return (
    <>
      {/* Filters Bar */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                Ordenar por
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-muted-foreground">Mostrando {filteredProducts.length} productos</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link href={`/tienda/${product.id}`} key={product.id} className="group">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-accent/5">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-full" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Agregar al Carrito
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">{product.subcategory}</p>
                  <h3 className="font-medium text-sm text-balance leading-tight">{product.name}</h3>
                  <p className="font-display text-lg text-primary">${product.price.toLocaleString("es-CO")}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Cargar Más Productos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
