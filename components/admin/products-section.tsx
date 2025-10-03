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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Save,
  Eye,
  Trash2,
  Edit,
  Upload,
} from "lucide-react";

interface Product {
  id: number;
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

interface ProductsSectionProps {
  products: Product[];
  newProduct: any;
  setNewProduct: (newProduct: any) => void;
  handleAddProduct: () => void;
  handleDeleteProduct: (id: number) => void;
  fileUploaderKey: number;
}

export default function ProductsSection({
  products,
  newProduct,
  setNewProduct,
  handleAddProduct,
  handleDeleteProduct,
  fileUploaderKey,
}: ProductsSectionProps) {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-admin-foreground mb-2">
          Gestión de Productos
        </h2>
        <p className="text-admin-muted">
          Administra el inventario de tu tienda colombiana
        </p>
      </div>

      <Tabs defaultValue="add" className="space-y-6">
        <TabsList className="admin-card">
          <TabsTrigger
            value="add"
            className="data-[state=active]:bg-admin-accent data-[state=active]:text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Producto
          </TabsTrigger>
          <TabsTrigger
            value="manage"
            className="data-[state=active]:bg-admin-accent data-[state=active]:text-white"
          >
            <Eye className="mr-2 h-4 w-4" />
            Gestionar Productos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="admin-card">
            <CardHeader>
              <CardTitle className="text-admin-foreground flex items-center">
                <Upload className="mr-2 h-5 w-5" />
                Nuevo Producto
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
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
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
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
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
                        value={newProduct.originalPrice}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
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
                      value={newProduct.category}
                      onValueChange={(value) =>
                        setNewProduct({ ...newProduct, category: value })
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
                      value={newProduct.badge}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, badge: e.target.value })
                      }
                      className="admin-input"
                      placeholder="Ej: Bestseller, Nuevo, Exclusivo"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image" className="text-admin-foreground">
                      Imagen del Producto
                    </Label>
                    <FileUploader
                      key={fileUploaderKey}
                      onFileChange={(file) => setNewProduct({ ...newProduct, image: file })}
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
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
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
                        Rating Inicial
                      </Label>
                      <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={newProduct.rating}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
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
                        value={newProduct.reviews}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
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
                  className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAddProduct}
                  className="admin-button-primary"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Producto
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card className="admin-card">
            <CardHeader>
              <CardTitle className="text-admin-foreground">
                Productos Existentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="admin-card p-4 rounded-lg border border-admin-border"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-admin-foreground">
                            {product.name}
                          </h3>
                          <p className="text-admin-muted text-sm">
                            {product.category}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="font-bold text-admin-accent">
                              {product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-admin-muted line-through text-sm">
                                {product.originalPrice}
                              </span>
                            )}
                            <Badge className={product.badgeColor}>
                              {product.badge}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-admin-border text-admin-muted hover:text-admin-foreground bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
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
        </TabsContent>
      </Tabs>
    </>
  );
}
