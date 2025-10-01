"use client"

import { ShoppingBag, Search, Menu, Heart, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/login-modal"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      const token = localStorage.getItem("token")
      if (token) {
        setIsLoggedIn(true)
      }
    }
  }, [isClient])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setIsDropdownOpen(false)
    router.push("/")
  }

  const handleModalOpenChange = (open: boolean) => {
    setIsLoginModalOpen(open)
    if (!open) {
      const token = localStorage.getItem("token")
      if (token) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }
  }

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
              
              <div className="relative">
                {isClient && isLoggedIn ? (
                  <div>
                    <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <User className="h-4 w-4" />
                    </Button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                        <Link href="/cuenta" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                          Mi Cuenta
                        </Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Cerrar Sesión
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => setIsLoginModalOpen(true)}>
                    <User className="h-4 w-4" />
                  </Button>
                )}
              </div>

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

      <LoginModal open={isLoginModalOpen} onOpenChange={handleModalOpenChange} />
    </>
  )
}