'use client'

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface Product {
  _id: string;
  name: string;
  price: string;
  originalPrice?: string;
  category: string;
  image: string;
  images?: string[];
  badge?: string;
  description: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  materials?: string[];
  styles?: string[];
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbApi, setThumbApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const fetchedProduct = await getProduct(params.id);
      setProduct(fetchedProduct);
      setIsLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    if (!mainApi || !thumbApi) {
      return
    }

    const onSelect = () => {
      setSelectedIndex(mainApi.selectedScrollSnap())
      thumbApi.scrollTo(mainApi.selectedScrollSnap())
    }

    mainApi.on("select", onSelect)
    mainApi.on("reInit", onSelect)

  }, [mainApi, thumbApi])

  const onThumbClick = (index: number) => {
    mainApi?.scrollTo(index)
  }

  if (isLoading) {
    return <div>Cargando...</div>; // Replace with a nice skeleton loader later
  }

  if (!product) {
    notFound();
  }

  const allImages = [product.image, ...(product.images || [])];

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6">
                <Carousel setApi={setMainApi} className="w-full max-w-xl mx-auto">
                  <CarouselContent>
                    {allImages.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square w-full overflow-hidden rounded-lg">
                          <Image
                            src={img}
                            alt={`${product.name} - image ${index + 1}`}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
                <Carousel setApi={setThumbApi} opts={{ containScroll: "keepSnaps", dragFree: true }} className="w-full max-w-xl mx-auto mt-4">
                  <CarouselContent className="-ml-2">
                    {allImages.map((img, index) => (
                      <CarouselItem key={index} onClick={() => onThumbClick(index)} className="pl-2 basis-1/4 cursor-pointer">
                        <div className={`aspect-square w-full overflow-hidden rounded-md transition-opacity ${index === selectedIndex ? 'opacity-100' : 'opacity-50'}`}>
                          <Image
                            src={img}
                            alt={`${product.name} - thumbnail ${index + 1}`}
                            width={150}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>

              <div className="p-6 bg-muted/20 flex flex-col justify-center">
                <div className="max-w-md">
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <h1 className="text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>
                  
                  <div className="flex items-center mt-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < (product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="ml-2 text-sm text-muted-foreground">({product.reviews} reseñas)</p>
                  </div>

                  <p className="text-3xl font-bold mt-6">{product.price}</p>
                  {product.originalPrice && (
                    <p className="text-muted-foreground line-through ml-2">{product.originalPrice}</p>
                  )}

                  <div className="mt-6 prose prose-sm text-muted-foreground max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />

                  <div className="mt-6 flex items-center gap-2">
                    {product.inStock ? (
                      <Badge variant="default" className="bg-green-500">En Stock</Badge>
                    ) : (
                      <Badge variant="destructive">Agotado</Badge>
                    )}
                  </div>

                  <div className="mt-8">
                    <Button size="lg" className="w-full">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Añadir al Carrito
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}