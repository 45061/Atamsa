'use client'

import { useState, useEffect } from 'react';
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JewelryHero } from "@/components/jewelry-hero"
import { JewelryCategories } from "@/components/jewelry-categories"
import { JewelryProducts } from "@/components/jewelry-products"
import { JewelryFilters } from "@/components/jewelry-filters"

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
  subcategory?: string;
}

export default function JoyeriaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const [subcategories, setSubcategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products?category=Joyería');
      const data = await res.json();
      console.log("Fetched data:", data);
      setProducts(data);
      setFilteredProducts(data);
      
      const uniqueSubcategories = Array.from(new Set(data.map((p: Product) => p.subcategory).filter(Boolean)));
      setSubcategories(uniqueSubcategories as string[]);
    };
    fetchProducts();
  }, []);

  const handleSubcategoryClick = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory);
    if (subcategory) {
      setFilteredProducts(products.filter(p => p.subcategory?.toLowerCase() === subcategory.toLowerCase()));
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <JewelryHero />
        <JewelryCategories onSubcategoryClick={handleSubcategoryClick} />
        <JewelryFilters subcategories={subcategories} onSubcategoryClick={handleSubcategoryClick} />
        <JewelryProducts 
          products={filteredProducts} 
          onSubcategoryClick={handleSubcategoryClick}
          selectedSubcategory={selectedSubcategory}
        />
      </main>
      <Footer />
    </div>
  )
}
