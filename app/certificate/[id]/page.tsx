'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ICertificate } from '@/models/Certificate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import Image from 'next/image'

export default function CertificatePage() {
  const [certificate, setCertificate] = useState<ICertificate | null>(null)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      const fetchCertificate = async () => {
        try {
          const response = await fetch(`/api/certificates/${id}`)
          if (response.ok) {
            const data = await response.json()
            setCertificate(data)
          } else {
            toast.error('Certificado no encontrado')
          }
        } catch (error) {
          toast.error('Error al cargar el certificado')
        }
      }

      fetchCertificate()
    }
  }, [id])

  if (!certificate) {
    return <div>Cargando...</div>
  }

  return (
    <div className="bg-background font-serif text-foreground">
      <header className="text-center p-10 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-b-3xl flex items-center justify-center gap-5">
        {certificate.atamsaLogoUrl && (
          <Image src={certificate.atamsaLogoUrl} alt="Logo Atamsa" width={80} height={80} />
        )}
        <div>
          <h1 className="text-foreground text-2xl mb-1">TESOROS DE COLOMBIA</h1>
          <h2 className="text-primary-foreground text-xl">Certificado de Autenticidad y Características</h2>
        </div>
      </header>

      <main className="container mx-auto bg-card p-8 rounded-2xl shadow-lg my-8 border-2 border-primary">
        <section className="mb-10">
          <h3 className="text-primary border-b-2 border-primary pb-2 mb-5 font-bold uppercase">{certificate.jewelName}</h3>
          <div className="text-center">
            {certificate.jewelVideoUrl && (
              <video controls width="100%" style={{ maxWidth: '600px' }}>
                <source src={certificate.jewelVideoUrl} type="video/mp4" />
              </video>
            )}
          </div>
        </section>

        <section className="mb-10">
          <h3 className="text-primary border-b-2 border-primary pb-2 mb-5 font-bold uppercase">Datos de la Joya</h3>
          <ul className="space-y-3">
            <li><strong>Tipo de joya:</strong> {certificate.jewelType}</li>
            <li><strong>Material:</strong> {certificate.mainMaterial}</li>
            <li><strong>Peso:</strong> {certificate.totalWeight} gramos</li>
            <li>
              <strong>Piedras preciosas:</strong>
              <ul className="list-disc list-inside ml-5 mt-2">
                <li><strong>Gema principal:</strong> {`(${certificate.mainGemType}) ${certificate.mainGemVariety}, ${certificate.mainGemColor}, ${certificate.mainGemDimensions}, ${certificate.mainGemCarats} ct`}</li>
                {certificate.secondaryGems.map((gem, index) => (
                  <li key={index}><strong>Gema secundaria:</strong> {`${gem.type}, ${gem.color}, ${gem.carats} ct`}</li>
                ))}
              </ul>
              <div className="text-center mt-3">
                {certificate.mainGemPhotoUrl && (
                  <Image src={certificate.mainGemPhotoUrl} alt="Gema principal" width={200} height={200} className="inline-block rounded-lg" />
                )}
              </div>
            </li>
            <li><strong>Número de serie o identificación:</strong> {certificate.serialNumber}</li>
            <li><strong>Diseño o modelo:</strong> {certificate.designModel}</li>
          </ul>
        </section>

        <section className="mb-10">
          <h3 className="text-primary border-b-2 border-primary pb-2 mb-5 font-bold uppercase">Datos de la evaluación de las gemas</h3>
          <p><strong>Método de evaluación:</strong> {certificate.evaluationMethod}</p>
          <p><strong>Fecha de evaluación:</strong> {new Date(certificate.evaluationDate).toLocaleDateString()}</p>
          <p><strong>Nombre y firma del evaluador:</strong> {certificate.evaluatorName}</p>
          {certificate.evaluatorSignatureUrl && (
            <div className="text-center mt-3">
              <Image src={certificate.evaluatorSignatureUrl} alt="Firma del evaluador" width={200} height={100} className="inline-block" />
            </div>
          )}
          {certificate.additionalComments && (
            <p className="text-xs text-center italic mt-3">{certificate.additionalComments}</p>
          )}
        </section>

        <section className="mb-10">
          <h3 className="text-primary border-b-2 border-primary pb-2 mb-5 font-bold uppercase">Firma gerente de producción</h3>
          <div className="text-center mt-3">
            {certificate.managerSealUrl && (
              <Image src={certificate.managerSealUrl} alt="Firma del gerente" width={200} height={100} className="inline-block" />
            )}
            <p className="text-muted-foreground mb-0">Gerente General</p>
          </div>
        </section>

        <section className="mb-10">
          <h3 className="text-primary border-b-2 border-primary pb-2 mb-5 font-bold uppercase">¿Qué es Tesoros de Colombia?</h3>
          <div className="text-sm text-justify space-y-4">
            <p>{certificate.institutionalMessage}</p>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-primary to-secondary text-primary-foreground text-center p-5 mt-8 rounded-t-3xl">
        <p>&copy; {new Date().getFullYear()} Tesoros de Colombia - Todos los derechos reservados</p>
        <p>
          <a href={certificate.atamsaWebsite} target="_blank" className="inline-block py-2 px-4 text-base font-bold text-primary-foreground bg-primary border-2 border-primary rounded-md no-underline transition-all duration-300 hover:bg-primary-foreground hover:text-primary">
            Conoce más de nuestros trabajos
          </a>
        </p>
      </footer>
    </div>
  )
}
