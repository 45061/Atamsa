'use client'

import * as React from "react";
import { MultiSelectDropdown } from "@/components/ui/multi-select-dropdown";
import { FileUploader } from "@/components/ui/file-uploader";
import { MultiFileUploader } from "@/components/ui/multi-file-uploader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "../ui/switch";
import { Save, Edit, X } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: string;
  originalPrice?: string;
  category: string;
  image: string;
  images?: string[];
  badge: string;
  badgeColor: string;
  description: string;
  rating: number;
  reviews: number;
  materials?: string[];
  styles?: string[];
  inStock?: boolean;
  subcategory: string;
}

interface EditProductFormProps {
  productToEdit: Product | null;
  setProductToEdit: React.Dispatch<React.SetStateAction<Product | null>>;
  handleUpdateProduct: () => void;
  setNewImageFile: (file: File | null) => void;
  setNewCarouselImageFiles: (files: File[]) => void;
  fileUploaderKey: number;
}

export default function EditProductForm({
  productToEdit,
  setProductToEdit,
  handleUpdateProduct,
  setNewImageFile,
  setNewCarouselImageFiles,
  fileUploaderKey,
}: EditProductFormProps) {
  if (!productToEdit) return null;

  const handleRemoveExistingImage = (imageUrl: string) => {
    if (productToEdit && productToEdit.images) {
      const updatedImages = productToEdit.images.filter(img => img !== imageUrl);
      setProductToEdit({ ...productToEdit, images: updatedImages });
    }
  };

  return (
    <Card className="admin-card">
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-admin-foreground">
                Nombre del Producto
              </Label>
              <Input
                id="name"
                value={productToEdit.name}
                onChange={(e) =>
                  setProductToEdit({ ...productToEdit, name: e.target.value })
                }
                className="admin-input"
                placeholder="Ej: Collar Esmeralda Bogotá"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="text-admin-foreground">
                  Precio
                </Label>
                <Input
                  id="price"
                  value={productToEdit.price}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      price: e.target.value,
                    })
                  }
                  className="admin-input"
                  placeholder="$450.000"
                />
              </div>
              <div>
                <Label
                  htmlFor="originalPrice"
                  className="text-admin-foreground"
                >
                  Precio Original (Opcional)
                </Label>
                <Input
                  id="originalPrice"
                  value={productToEdit.originalPrice}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      originalPrice: e.target.value,
                    })
                  }
                  className="admin-input"
                  placeholder="$520.000"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="category"
                className="text-admin-foreground"
              >
                Categoría
              </Label>
              <Select
                value={productToEdit.category}
                onValueChange={(value) =>
                  setProductToEdit({ ...productToEdit, category: value })
                }
              >
                <SelectTrigger className="admin-input">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent className="admin-card">
                  <SelectItem value="joyeria">Joyería</SelectItem>
                  <SelectItem value="ropa">Ropa</SelectItem>
                  <SelectItem value="precolombino">
                    Arte Precolombino
                  </SelectItem>
                  <SelectItem value="bogota">Bogotá</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="subcategory"
                className="text-admin-foreground"
              >
                Subcategoría
              </Label>
              <Select
                value={productToEdit.subcategory}
                onValueChange={(value) =>
                  setProductToEdit({ ...productToEdit, subcategory: value })
                }
              >
                <SelectTrigger className="admin-input">
                  <SelectValue placeholder="Selecciona una subcategoría" />
                </SelectTrigger>
                <SelectContent className="admin-card">
                  <SelectItem value="collares">Collares</SelectItem>
                  <SelectItem value="aretes">Aretes</SelectItem>
                  <SelectItem value="anillos">Anillos</SelectItem>
                  <SelectItem value="pulseras">Pulseras</SelectItem>
                  <SelectItem value="conjuntos">Conjuntos</SelectItem>
                  <SelectItem value="broches">Broches</SelectItem>
                  <SelectItem value="camisas">Camisas</SelectItem>
                  <SelectItem value="hoodies">Hoodies</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="badge" className="text-admin-foreground">
                Etiqueta
              </Label>
              <Input
                id="badge"
                value={productToEdit.badge}
                onChange={(e) =>
                  setProductToEdit({ ...productToEdit, badge: e.target.value })
                }
                className="admin-input"
                placeholder="Ej: Bestseller, Nuevo, Exclusivo"
              />
            </div>

            <div>
              <Label htmlFor="materials" className="text-admin-foreground">
                Materiales
              </Label>
              <MultiSelectDropdown
                  options={[
                      { label: "Oro 18k", value: "oro-18k" },
                      { label: "Plata 925", value: "plata-925" },
                      { label: "Oro Blanco", value: "oro-blanco" },
                      { label: "Platino", value: "platino" },
                      { label: "Esmeralda", value: "esmeralda" },
                  ]}
                  selected={productToEdit.materials || []}
                  onChange={(selectedUpdate) =>
                    setProductToEdit((currentProduct) => {
                      if (!currentProduct) return null;
                      const oldMaterials = currentProduct.materials || [];
                      const newMaterials =
                        typeof selectedUpdate === "function"
                          ? selectedUpdate(oldMaterials)
                          : selectedUpdate;
                      return { ...currentProduct, materials: newMaterials };
                    })
                  }
                  placeholder="Selecciona materiales"
              />
            </div>

            <div>
              <Label htmlFor="styles" className="text-admin-foreground">
                Estilos
              </Label>
              <MultiSelectDropdown
                  options={[
                      { label: "Clásico", value: "clasico" },
                      { label: "Moderno", value: "moderno" },
                      { label: "Precolombino", value: "precolombino" },
                      { label: "Vintage", value: "vintage" },
                  ]}
                  selected={productToEdit.styles || []}
                  onChange={(selectedUpdate) =>
                    setProductToEdit((currentProduct) => {
                      if (!currentProduct) return null;
                      const oldStyles = currentProduct.styles || [];
                      const newStyles =
                        typeof selectedUpdate === "function"
                          ? selectedUpdate(oldStyles)
                          : selectedUpdate;
                      return { ...currentProduct, styles: newStyles };
                    })
                  }
                  placeholder="Selecciona estilos"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="inStock"
                checked={productToEdit.inStock}
                onCheckedChange={(checked) =>
                  setProductToEdit({ ...productToEdit, inStock: checked })
                }
              />
              <Label htmlFor="inStock" className="text-admin-foreground">
                En Stock
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="image" className="text-admin-foreground">
                Imagen Principal (deja vacío para no cambiar)
              </Label>
              <FileUploader
                key={fileUploaderKey}
                onFileChange={(file) => setNewImageFile(file)}
              />
            </div>

            <div>
              <Label htmlFor="carousel-images" className="text-admin-foreground">
                Imágenes del Carrusel (múltiples)
              </Label>
              <MultiFileUploader onFilesChange={setNewCarouselImageFiles} />
            </div>

            {productToEdit.images && productToEdit.images.length > 0 && (
              <div>
                <Label className="text-admin-foreground">Imágenes Actuales del Carrusel</Label>
                <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {productToEdit.images.map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <img src={imageUrl} alt={`Carousel image ${index + 1}`} className="w-full h-auto rounded-lg" />
                      <button
                        onClick={() => handleRemoveExistingImage(imageUrl)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label
                htmlFor="description"
                className="text-admin-foreground"
              >
                Descripción
              </Label>
              <Textarea
                id="description"
                value={productToEdit.description}
                onChange={(e) =>
                  setProductToEdit({
                    ...productToEdit,
                    description: e.target.value,
                  })
                }
                className="admin-input min-h-[120px]"
                placeholder="Describe el producto, sus características y origen..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="rating"
                  className="text-admin-foreground"
                >
                  Rating
                </Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={productToEdit.rating}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      rating: Number(e.target.value),
                    })
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <Label
                  htmlFor="reviews"
                  className="text-admin-foreground"
                >
                  Número de Reseñas
                </Label>
                <Input
                  id="reviews"
                  type="number"
                  min="0"
                  value={productToEdit.reviews}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      reviews: Number(e.target.value),
                    })
                  }
                  className="admin-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => setProductToEdit(null)}
            className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateProduct}
            className="admin-button-primary"
          >
            <Save className="mr-2 h-4 w-4" />
            Actualizar Producto
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
