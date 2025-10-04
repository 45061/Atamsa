import { FileUploader } from "@/components/ui/file-uploader";
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
import { Save, Edit } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: string;
  originalPrice?: string;
  category: string;
  image: string;
  badge: string;
  badgeColor: string;
  description: string;
  rating: number;
  reviews: number;
}

interface EditProductFormProps {
  productToEdit: Product | null;
  setProductToEdit: (product: Product | null) => void;
  handleUpdateProduct: () => void;
  setNewImageFile: (file: File | null) => void;
  fileUploaderKey: number;
}

export default function EditProductForm({
  productToEdit,
  setProductToEdit,
  handleUpdateProduct,
  setNewImageFile,
  fileUploaderKey,
}: EditProductFormProps) {
  if (!productToEdit) return null;

  return (
    <Card className="admin-card">
      <CardHeader>
        <CardTitle className="text-admin-foreground flex items-center">
          <Edit className="mr-2 h-5 w-5" />
          Editar Producto
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="image" className="text-admin-foreground">
                Imagen del Producto (deja vacío para no cambiar)
              </Label>
              <FileUploader
                key={fileUploaderKey}
                onFileChange={(file) => setNewImageFile(file)}
              />
            </div>

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