import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Fuel, Gauge, Check } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-2 group">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {vehicle.image_url ? (
          <img
            src={vehicle.image_url}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Car className="w-12 h-12 opacity-20" />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
          A partir de R$ {Number(vehicle.price_per_week).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/sem
        </div>
      </div>
      
      <CardHeader className="p-6">
        <div className="text-sm font-medium text-primary mb-1">{vehicle.brand}</div>
        <CardTitle className="text-2xl font-bold">{vehicle.model}</CardTitle>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 space-y-4 flex-grow">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Gauge className="w-4 h-4" />
            <span>Ano {vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="w-4 h-4" />
            <span>Flex / GNV</span>
          </div>
        </div>
        
        <div className="space-y-2">
          {vehicle.features?.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button className="w-full" asChild>
          <a href={`https://wa.me/5500000000000?text=Olá, tenho interesse no veículo ${vehicle.brand} ${vehicle.model}`} target="_blank" rel="noopener noreferrer">
            TENHO INTERESSE
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
