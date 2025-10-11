'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { ICertificate } from '@/models/Certificate'
import Link from 'next/link'

export default function CertificateList() {
  const [certificates, setCertificates] = useState<ICertificate[]>([])

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('/api/certificates')
        if (response.ok) {
          const data = await response.json()
          setCertificates(data)
        } else {
          toast.error('Error al cargar los certificados')
        }
      } catch (error) {
        toast.error('Error al cargar los certificados')
      }
    }

    fetchCertificates()
  }, [])

  const handleDeleteCertificate = async (id: string) => {
    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setCertificates(certificates.filter((c) => c._id !== id))
        toast.success('Certificado eliminado con éxito')
      } else {
        toast.error('Error al eliminar el certificado')
      }
    } catch (error) {
      toast.error('Error al eliminar el certificado')
    }
  }

  return (
    <Card className="admin-card">
      <CardHeader>
        <CardTitle className="text-admin-foreground">Lista de Certificados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {certificates.map((certificate) => (
            <div key={certificate._id} className="admin-card p-4 rounded-lg border border-admin-border">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-admin-foreground">{certificate.jewelName}</h3>
                  <p className="text-admin-muted text-sm">Número de Serie: {certificate.serialNumber}</p>
                  <p className="text-admin-muted text-sm">Fecha: {new Date(certificate.certificateDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/certificate/${certificate._id}`} passHref>
                    <Button variant="outline" size="sm" className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-admin-border text-destructive hover:text-destructive-foreground bg-transparent"
                    onClick={() => handleDeleteCertificate(certificate._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}