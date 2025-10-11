'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CertificateForm from "./certificate-form"
import CertificateList from "./certificate-list"
import { Award, List } from "lucide-react"

export default function CertificatesSection() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-admin-foreground mb-2">Gestión de Certificados</h2>
        <p className="text-admin-muted">Crea y administra los certificados de autenticidad de tus joyas.</p>
      </div>
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="admin-card">
          <TabsTrigger value="list" className="data-[state=active]:bg-admin-accent data-[state=active]:text-white">
            <List className="mr-2 h-4 w-4" />
            Lista de Certificados
          </TabsTrigger>
          <TabsTrigger value="new" className="data-[state=active]:bg-admin-accent data-[state=active]:text-white">
            <Award className="mr-2 h-4 w-4" />
            Nuevo Certificado
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <CertificateList />
        </TabsContent>
        <TabsContent value="new">
          <CertificateForm />
        </TabsContent>
      </Tabs>
    </>
  )
}