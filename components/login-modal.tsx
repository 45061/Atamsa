"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success(result.message || "¡Inicio de sesión exitoso!");
          
          // Guardar el token en localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', result.token);
          }

          // Resetear el formulario
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
          });

          onOpenChange(false);
        } else {
          toast.error(result.error || "Credenciales inválidas.");
        }
      } catch (error) {
        toast.error("Ocurrió un error de red. Inténtalo de nuevo.");
        console.error('Ocurrió un error durante el inicio de sesión:', error);
      }
    } else {
      // Lógica de registro
      if (formData.password !== formData.confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return; // Mantiene el modal abierto para corregir
      }
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
        });

        const result = await response.json();

        if (response.ok && response.status === 201) {
          toast.success("¡Registro exitoso! Bienvenido.");
          // Limpiar el formulario como se solicitó
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
          });
          // Cierra el modal
          onOpenChange(false);
        } else {
          // Usa el mensaje de error de la API
          toast.error(result.error || 'Fallo en el registro.');
        }
      } catch (error) {
        toast.error("Ocurrió un error de red. Inténtalo de nuevo.");
        console.error('Ocurrió un error durante el registro:', error);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-warm-200">
        <DialogHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <div className="font-display text-3xl text-emerald-700">Tesoros</div>
              <div className="text-lg text-warm-600">de Colombia</div>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-600 to-amber-500"></div>
          </div>

          <DialogTitle className="font-display text-2xl text-warm-800">
            {isLogin ? "Bienvenido de vuelta" : "Únete a nosotros"}
          </DialogTitle>
          <p className="text-warm-600 text-sm">
            {isLogin
              ? "Accede a tu cuenta para ver tus pedidos y favoritos"
              : "Crea tu cuenta y descubre los tesoros de Colombia"}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-warm-700 font-medium">
                Nombre completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-white border-warm-200 focus:border-emerald-500 focus:ring-emerald-500"
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-warm-700 font-medium">
              Correo electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-warm-400" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 bg-white border-warm-200 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-warm-700 font-medium">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-warm-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-10 bg-white border-warm-200 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-warm-400" />
                ) : (
                  <Eye className="h-4 w-4 text-warm-400" />
                )}
              </Button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-warm-700 font-medium">
                Confirmar contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-warm-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pl-10 bg-white border-warm-200 focus:border-emerald-500 focus:ring-emerald-500"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <Button variant="link" className="text-emerald-600 hover:text-emerald-700 p-0 h-auto">
                ¿Olvidaste tu contraseña?
              </Button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-2.5"
          >
            {isLogin ? "Iniciar sesión" : "Crear cuenta"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-warm-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-warm-500">o continúa con</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-warm-200 text-warm-700 hover:bg-warm-100 bg-transparent"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
        </form>

        <div className="text-center text-sm text-warm-600">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <Button
            variant="link"
            className="text-emerald-600 hover:text-emerald-700 p-0 h-auto font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Regístrate aquí" : "Inicia sesión"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
