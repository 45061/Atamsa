"use client"

import { ShoppingBag, Search, Menu, Heart, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/login-modal"
import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="font-display text-2xl text-primary">Tesoros</div>
              <div className="text-sm text-muted-foreground">de Colombia</div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/joyeria" className="text-sm font-medium hover:text-primary transition-colors">
                Joyería
              </Link>
              <Link href="/ropa" className="text-sm font-medium hover:text-primary transition-colors">
                Ropa
              </Link>
              <Link href="/tienda" className="text-sm font-medium hover:text-primary transition-colors">
                Tienda
              </Link>
              <Link href="/nosotros" className="text-sm font-medium hover:text-primary transition-colors">
                Nosotros
              </Link>
              <Link href="/bogota" className="text-sm font-medium hover:text-primary transition-colors">
              Bogotá
             </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => setIsLoginModalOpen(true)}>
                <User className="h-4 w-4" />
              </Button>
              <Link href="/carrito">
                <Button variant="ghost" size="icon">
                  <ShoppingBag className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </>
  )
}
