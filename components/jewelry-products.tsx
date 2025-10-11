'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Eye, Gem } from "lucide-react"

interface Product {
  _id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  badge: string;
  badgeColor: string;
  materials: string[];
  styles: string[];
  inStock: boolean;
  category: string;
}

interface JewelryProductsProps {
  products: Product[];
  onSubcategoryClick: (subcategory: string | null) => void;
  selectedSubcategory: string | null;
}

const subcategories = ['Collares', 'Aretes', 'Anillos', 'Pulseras', 'Conjuntos', 'Broches'];

export function JewelryProducts({ products, onSubcategoryClick, selectedSubcategory }: JewelryProductsProps) {

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl mb-2">Nuestra Colección</h2>
            <p className="text-muted-foreground">Mostrando {products.length} productos</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ordenar por:</span>
            <select className="border border-input rounded-md px-3 py-1 bg-background">
              <option>Más populares</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Mejor calificados</option>
              <option>Más recientes</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Button
            variant={!selectedSubcategory ? "default" : "outline"}
            size="sm"
            onClick={() => onSubcategoryClick(null)}
          >
            Todos
          </Button>
          {subcategories.map(sc => (
            <Button
              key={sc}
              variant={selectedSubcategory === sc ? "default" : "outline"}
              size="sm"
              onClick={() => onSubcategoryClick(sc)}
            >
              {sc}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product._id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg?height=400&width=300&query=Colombian emerald jewelry"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-3 left-3 ${product.badgeColor}`}>{product.badge}</Badge>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Agotado</Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Link href={`/tienda/${product._id}`}>
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                </div>

                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Gem className="h-3 w-3" />
                    {product.materials.join(', ')}
                  </span>
                  <span>•</span>
                  <span>{product.styles.join(', ')}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-lg text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                  )}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90" disabled={!product.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Agregar al Carrito" : "Agotado"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Cargar Más Productos
          </Button>
        </div>
      </div>
    </section>
  )
}