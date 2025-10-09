'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface Product {
  _id: string;
  name: string;
  price: string;
  originalPrice?: string;
  category: string;
  image: string;
  badge?: string;
  description: string;
  rating?: number;
  reviews?: number;
  materials?: string[];
  styles?: string[];
  inStock?: boolean;
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg object-cover w-full aspect-square"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              {product.badge && <Badge>{product.badge}</Badge>}
              <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">{product.originalPrice}</span>
                )}
              </div>
              <Separator />
              <p className="text-muted-foreground">{product.description}</p>
              <div className="flex flex-col gap-2">
                  {product.materials && (
                      <div className="flex items-center gap-2">
                          <span className="font-semibold">Materials:</span>
                          <div className="flex gap-2">
                          {product.materials.map((material) => (
                              <Badge key={material} variant="secondary">{material}</Badge>
                          ))}
                          </div>
                      </div>
                  )}
                  {product.styles && (
                      <div className="flex items-center gap-2">
                          <span className="font-semibold">Styles:</span>
                          <div className="flex gap-2">
                          {product.styles.map((style) => (
                              <Badge key={style} variant="secondary">{style}</Badge>
                          ))}
                          </div>
                      </div>
                  )}
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <Button size="lg" disabled={!product.inStock}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
