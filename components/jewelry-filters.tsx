import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, SlidersHorizontal, Search } from "lucide-react"

const priceRanges = [
  { label: "Menos de $200.000", value: "0-200000", count: 45 },
  { label: "$200.000 - $500.000", value: "200000-500000", count: 78 },
  { label: "$500.000 - $1.000.000", value: "500000-1000000", count: 52 },
  { label: "Más de $1.000.000", value: "1000000+", count: 23 },
]

const materials = [
  { label: "Oro 18k", count: 89 },
  { label: "Plata 925", count: 67 },
  { label: "Oro Blanco", count: 34 },
  { label: "Platino", count: 12 },
]

const styles = [
  { label: "Clásico", count: 78 },
  { label: "Moderno", count: 65 },
  { label: "Precolombino", count: 43 },
  { label: "Vintage", count: 32 },
]

export function JewelryFilters() {
  return (
    <section className="py-12 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Search and Sort */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar joyería..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
                />
              </div>
              <Button variant="outline" className="shrink-0 bg-transparent">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="px-3 py-1">
                Oro 18k ×
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                $200k - $500k ×
              </Badge>
              <Button variant="ghost" size="sm" className="text-xs">
                Limpiar filtros
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="lg:w-80">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {/* Price Range */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Precio
                  </h3>
                  <div className="space-y-2">
                    {priceRanges.slice(0, 3).map((range) => (
                      <label key={range.value} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span>{range.label}</span>
                        <span className="text-muted-foreground">({range.count})</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Material */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Material</h3>
                  <div className="space-y-2">
                    {materials.slice(0, 3).map((material) => (
                      <label key={material.label} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span>{material.label}</span>
                        <span className="text-muted-foreground">({material.count})</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Style */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Estilo</h3>
                  <div className="space-y-2">
                    {styles.slice(0, 3).map((style) => (
                      <label key={style.label} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span>{style.label}</span>
                        <span className="text-muted-foreground">({style.count})</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
