'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { PlusCircle, Trash2, UploadCloud, Loader2 } from 'lucide-react'
import { toast } from "sonner";

// Define the types for the form state
interface SecondaryGem {
  type: string;
  color: string;
  carats: string;
}

interface CertificateData {
  jewelName: string;
  serialNumber: string;
  certificateDate: string;
  atamsaLogo: File | null;
  jewelVideo?: File | null;
  jewelImages: File[];
  jewelType: string;
  mainMaterial: string;
  totalWeight: string;
  designModel: string;
  craftingTechnique: string;
  generalDescription: string;
  mainGemType: string;
  mainGemVariety: string;
  mainGemColor: string;
  mainGemDimensions: string;
  mainGemCarats: string;
  mainGemOrigin?: string;
  mainGemPhoto: File | null;
  secondaryGems: SecondaryGem[];
  evaluationMethod: string;
  evaluationDate: string;
  evaluatorName: string;
  evaluatorSignature: File | null;
  additionalComments: string;
  legalNotice: boolean;
  atamsaLocation: string;
  atamsaWebsite: string;
  managerSeal?: File | null;
  institutionalMessage: string;
}

const initialFormData: CertificateData = {
    jewelName: '',
    serialNumber: '',
    certificateDate: new Date().toISOString().split('T')[0],
    atamsaLogo: null,
    jewelVideo: undefined,
    jewelImages: [],
    jewelType: '',
    mainMaterial: '',
    totalWeight: '',
    designModel: '',
    craftingTechnique: '',
    generalDescription: '',
    mainGemType: 'Esmeralda',
    mainGemVariety: '',
    mainGemColor: '',
    mainGemDimensions: '',
    mainGemCarats: '',
    mainGemOrigin: '',
    mainGemPhoto: null,
    secondaryGems: [],
    evaluationMethod: '',
    evaluationDate: new Date().toISOString().split('T')[0],
    evaluatorName: '',
    evaluatorSignature: null,
    additionalComments: '',
    legalNotice: false,
    atamsaLocation: 'Bogotá, Colombia',
    atamsaWebsite: 'https://atamsa.com',
    managerSeal: undefined,
    institutionalMessage: 'Atamsa Joyeros representa la conexión entre la naturaleza, la elegancia y la herencia artesanal colombiana. Cada pieza es un reflejo de autenticidad, armonía y propósito.',
};

// Updated File Input Component
const StyledFileInput = ({ label, accept, multiple, name, onFileSelect }: { label: string, accept: string, multiple?: boolean, name: string, onFileSelect: (files: FileList | null) => void }) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      if (multiple) {
        setFileName(`${e.target.files.length} archivos seleccionados`);
      } else {
        setFileName(e.target.files[0].name);
      }
    } else {
      setFileName('');
    }
  };

  return (
    <div>
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label htmlFor={name} className="relative cursor-pointer bg-white rounded-md font-medium text-[#12bec0] hover:text-[#0f9a9b] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#12bec0]">
              <span>Subir archivo</span>
              <input id={name} name={name} type="file" className="sr-only" accept={accept} multiple={multiple} onChange={handleChange} />
            </label>
            <p className="pl-1">o arrastrar y soltar</p>
          </div>
          {fileName ? (
            <p className="text-xs text-green-600 font-semibold">{fileName}</p>
          ) : (
            <p className="text-xs text-gray-500">Archivos soportados: {accept}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CertificateForm() {
  const [formData, setFormData] = useState<CertificateData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key for resetting file inputs

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: keyof CertificateData, files: FileList | null) => {
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleMultiFileChange = (name: keyof CertificateData, files: FileList | null) => {
    if (files) {
      setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, legalNotice: checked }));
  };

  const addSecondaryGem = () => {
    setFormData(prev => ({ ...prev, secondaryGems: [...prev.secondaryGems, { type: '', color: '', carats: '' }] }));
  };

  const handleSecondaryGemChange = (index: number, field: keyof SecondaryGem, value: string) => {
    const updatedGems = [...formData.secondaryGems];
    updatedGems[index][field] = value;
    setFormData(prev => ({ ...prev, secondaryGems: updatedGems }));
  };

  const removeSecondaryGem = (index: number) => {
    const updatedGems = formData.secondaryGems.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, secondaryGems: updatedGems }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.legalNotice) {
        toast.error("Debe aceptar el aviso legal para continuar.");
        return;
    }
    setIsLoading(true);

    const dataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'boolean') {
            dataToSubmit.append(key, String(value));
        } else if (key === 'secondaryGems') {
            dataToSubmit.append(key, JSON.stringify(value));
        }
    });

    if (formData.atamsaLogo) dataToSubmit.append('atamsaLogo', formData.atamsaLogo);
    if (formData.jewelVideo) dataToSubmit.append('jewelVideo', formData.jewelVideo);
    if (formData.mainGemPhoto) dataToSubmit.append('mainGemPhoto', formData.mainGemPhoto);
    if (formData.evaluatorSignature) dataToSubmit.append('evaluatorSignature', formData.evaluatorSignature);
    if (formData.managerSeal) dataToSubmit.append('managerSeal', formData.managerSeal);

    formData.jewelImages.forEach(file => {
        dataToSubmit.append('jewelImages', file);
    });

    try {
        const response = await fetch('/api/certificates', {
            method: 'POST',
            body: dataToSubmit,
        });

        if (response.ok) {
            toast.success("Certificado generado y guardado con éxito!");
            setFormData(initialFormData);
            setFileInputKey(Date.now()); // Reset file inputs by changing key
        } else {
            const errorData = await response.json();
            toast.error(`Error al guardar el certificado: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Submission error:", error);
        toast.error("Ocurrió un error en la conexión. Inténtalo de nuevo.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-black rounded-2xl shadow-lg p-8">
        <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter&display=swap');
            .font-playfair { font-family: 'Playfair Display', serif; }
        `}</style>
        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Section 1: Identificación de la Joya */}
          <div className="space-y-6">
            <h2 className="font-playfair text-lg uppercase text-[#12bec0] font-bold border-b-4 border-[#12bec0] pb-2 mb-6">1. Identificación de la Joya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><Label htmlFor="jewelName">Nombre de la pieza</Label><Input id="jewelName" name="jewelName" value={formData.jewelName} onChange={handleInputChange} required /></div>
              <div><Label htmlFor="serialNumber">Número de serie o certificado</Label><Input id="serialNumber" name="serialNumber" value={formData.serialNumber} onChange={handleInputChange} required /></div>
              <div><Label htmlFor="certificateDate">Fecha de creación del certificado</Label><Input id="certificateDate" name="certificateDate" type="date" value={formData.certificateDate} onChange={handleInputChange} required /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StyledFileInput key={`${fileInputKey}-atamsaLogo`} name="atamsaLogo" label="Logo de Atamsa" accept="image/*" onFileSelect={(files) => handleFileChange('atamsaLogo', files)} />
                <StyledFileInput key={`${fileInputKey}-jewelVideo`} name="jewelVideo" label="Video de la joya (opcional)" accept="video/mp4,video/webm" onFileSelect={(files) => handleFileChange('jewelVideo', files)} />
                <StyledFileInput key={`${fileInputKey}-jewelImages`} name="jewelImages" label="Imágenes de la joya" accept="image/*" multiple onFileSelect={(files) => handleMultiFileChange('jewelImages', files)} />
            </div>
          </div>

          {/* Section 2: Características de la Joya */}
          <div className="space-y-6">
            <h2 className="font-playfair text-lg uppercase text-[#12bec0] font-bold border-b-4 border-[#12bec0] pb-2 mb-6">2. Características de la Joya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="jewelType">Tipo de joya</Label>
                <Select name="jewelType" onValueChange={value => setFormData(prev => ({ ...prev, jewelType: value }))} value={formData.jewelType}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                  <SelectContent><SelectItem value="Anillo">Anillo</SelectItem><SelectItem value="Collar">Collar</SelectItem><SelectItem value="Aretes">Aretes</SelectItem><SelectItem value="Pulsera">Pulsera</SelectItem><SelectItem value="Dije">Dije</SelectItem><SelectItem value="Otro">Otro</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="mainMaterial">Material principal</Label><Input id="mainMaterial" name="mainMaterial" value={formData.mainMaterial} onChange={handleInputChange} required /></div>
              <div><Label htmlFor="totalWeight">Peso total (gramos)</Label><Input id="totalWeight" name="totalWeight" type="number" step="0.01" value={formData.totalWeight} onChange={handleInputChange} required /></div>
              <div><Label htmlFor="designModel">Diseño o modelo</Label><Input id="designModel" name="designModel" value={formData.designModel} onChange={handleInputChange} /></div>
            </div>
            <div><Label htmlFor="craftingTechnique">Técnica artesanal utilizada</Label><Textarea id="craftingTechnique" name="craftingTechnique" value={formData.craftingTechnique} onChange={handleInputChange} /></div>
            <div><Label htmlFor="generalDescription">Descripción general de la pieza</Label><Textarea id="generalDescription" name="generalDescription" value={formData.generalDescription} onChange={handleInputChange} rows={4} required /></div>
          </div>

          {/* Section 3: Detalles de la Piedra Preciosa */}
          <div className="space-y-6">
            <h2 className="font-playfair text-lg uppercase text-[#12bec0] font-bold border-b-4 border-[#12bec0] pb-2 mb-6">3. Detalles de la Piedra Preciosa</h2>
            <h3 className="font-semibold text-gray-800">Gema Principal</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <Label htmlFor="mainGemType">Tipo de gema</Label>
                    <Select name="mainGemType" onValueChange={value => setFormData(prev => ({ ...prev, mainGemType: value }))} value={formData.mainGemType}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="Esmeralda">Esmeralda</SelectItem><SelectItem value="Zafiro">Zafiro</SelectItem><SelectItem value="Rubí">Rubí</SelectItem><SelectItem value="Diamante">Diamante</SelectItem><SelectItem value="Otra">Otra</SelectItem></SelectContent>
                    </Select>
                </div>
                <div><Label htmlFor="mainGemVariety">Variedad / Corte</Label><Input id="mainGemVariety" name="mainGemVariety" value={formData.mainGemVariety} onChange={handleInputChange} /></div>
                <div><Label htmlFor="mainGemColor">Color predominante</Label><Input id="mainGemColor" name="mainGemColor" value={formData.mainGemColor} onChange={handleInputChange} /></div>
                <div><Label htmlFor="mainGemDimensions">Dimensiones (mm)</Label><Input id="mainGemDimensions" name="mainGemDimensions" value={formData.mainGemDimensions} onChange={handleInputChange} /></div>
                <div><Label htmlFor="mainGemCarats">Peso en quilates (ct)</Label><Input id="mainGemCarats" name="mainGemCarats" type="number" step="0.01" value={formData.mainGemCarats} onChange={handleInputChange} required /></div>
                <div><Label htmlFor="mainGemOrigin">Origen (opcional)</Label><Input id="mainGemOrigin" name="mainGemOrigin" value={formData.mainGemOrigin} onChange={handleInputChange} /></div>
            </div>
            <StyledFileInput key={`${fileInputKey}-mainGemPhoto`} name="mainGemPhoto" label="Fotografía o macro de la gema" accept="image/*" onFileSelect={(files) => handleFileChange('mainGemPhoto', files)} />
            
            <h3 className="font-semibold text-gray-800 pt-4">Gemas Secundarias</h3>
            {formData.secondaryGems.map((gem, index) => (
              <div key={index} className="flex items-end gap-4 p-4 border rounded-lg">
                <div className="grid grid-cols-3 gap-4 flex-grow">
                  <div><Label>Tipo</Label><Input value={gem.type} onChange={e => handleSecondaryGemChange(index, 'type', e.target.value)} /></div>
                  <div><Label>Color</Label><Input value={gem.color} onChange={e => handleSecondaryGemChange(index, 'color', e.target.value)} /></div>
                  <div><Label>Quilates</Label><Input type="number" step="0.01" value={gem.carats} onChange={e => handleSecondaryGemChange(index, 'carats', e.target.value)} /></div>
                </div>
                <Button type="button" variant="destructive" size="icon" onClick={() => removeSecondaryGem(index)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSecondaryGem} className="text-[#12bec0] border-[#12bec0]"><PlusCircle className="mr-2 h-4 w-4" />Agregar otra gema</Button>
          </div>

          {/* Section 4: Evaluación y Autenticidad */}
          <div className="space-y-6">
            <h2 className="font-playfair text-lg uppercase text-[#12bec0] font-bold border-b-4 border-[#12bec0] pb-2 mb-6">4. Evaluación y Autenticidad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label htmlFor="evaluationMethod">Método de evaluación</Label><Textarea id="evaluationMethod" name="evaluationMethod" value={formData.evaluationMethod} onChange={handleInputChange} /></div>
                <div><Label htmlFor="additionalComments">Comentarios adicionales</Label><Textarea id="additionalComments" name="additionalComments" value={formData.additionalComments} onChange={handleInputChange} /></div>
                <div><Label htmlFor="evaluationDate">Fecha de evaluación</Label><Input id="evaluationDate" name="evaluationDate" type="date" value={formData.evaluationDate} onChange={handleInputChange} /></div>
                <div><Label htmlFor="evaluatorName">Nombre del evaluador / gemólogo</Label><Input id="evaluatorName" name="evaluatorName" value={formData.evaluatorName} onChange={handleInputChange} /></div>
            </div>
            <StyledFileInput key={`${fileInputKey}-evaluatorSignature`} name="evaluatorSignature" label="Firma del evaluador (imagen)" accept="image/*" onFileSelect={(files) => handleFileChange('evaluatorSignature', files)} />
            <div className="flex items-center space-x-2 pt-4">
                <Checkbox id="legalNotice" checked={formData.legalNotice} onCheckedChange={handleCheckboxChange} />
                <Label htmlFor="legalNotice" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Las gemas fueron entregadas directamente por el cliente a la joyería Atamsa. No se garantiza la existencia de un certificado previo que avale su autenticidad o calidad.</Label>
            </div>
          </div>

          {/* Section 5: Datos de Atamsa */}
          <div className="space-y-6">
            <h2 className="font-playfair text-lg uppercase text-[#12bec0] font-bold border-b-4 border-[#12bec0] pb-2 mb-6">5. Datos de Atamsa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label>Nombre de la joyería</Label><Input value="Atamsa Joyeros" disabled /></div>
                <div><Label htmlFor="atamsaLocation">Ubicación</Label><Input id="atamsaLocation" name="atamsaLocation" value={formData.atamsaLocation} onChange={handleInputChange} /></div>
                <div><Label htmlFor="atamsaWebsite">Sitio web o enlace al portafolio</Label><Input id="atamsaWebsite" name="atamsaWebsite" value={formData.atamsaWebsite} onChange={handleInputChange} /></div>
            </div>
            <StyledFileInput key={`${fileInputKey}-managerSeal`} name="managerSeal" label="Sello o firma del gerente de producción (opcional)" accept="image/*" onFileSelect={(files) => handleFileChange('managerSeal', files)} />
            <div><Label htmlFor="institutionalMessage">Mensaje institucional</Label><Textarea id="institutionalMessage" name="institutionalMessage" value={formData.institutionalMessage} onChange={handleInputChange} rows={4} /></div>
          </div>

          <div className="flex justify-end pt-8">
            <Button type="submit" className="bg-[#12bec0] hover:bg-[#0f9a9b] text-white font-bold py-3 px-6 rounded-lg shadow-md" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...</> : 'Generar Certificado'}
            </Button>
          </div>
        </form>
      </div>
  )
}
