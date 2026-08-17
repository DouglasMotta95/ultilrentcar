import { Car, Fuel, Gauge, Check } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="soft-card flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {vehicle.image_url ? (
          <img
            src={vehicle.image_url}
            alt={`${vehicle.brand} ${vehicle.model}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Car className="h-12 w-12 opacity-30" />
          </div>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg">
          A partir de R${" "}
          {Number(vehicle.price_per_week).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/sem
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-primary">{vehicle.brand}</p>
        <h3 className="mt-1 font-display text-2xl font-bold">{vehicle.model}</h3>

        <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Gauge className="h-4 w-4" /> Ano {vehicle.year}
          </span>
          <span className="flex items-center gap-2">
            <Fuel className="h-4 w-4" /> Flex / GNV
          </span>
        </div>

        <div className="mt-5 space-y-2">
          {vehicle.features?.slice(0, 4).map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-foreground/80">
              <Check className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <a
          href={`https://wa.me/5511947229449?text=Olá, tenho interesse no veículo ${vehicle.brand} ${vehicle.model}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95"
        >
          Ver disponibilidade
        </a>
      </div>
    </article>
  );
}
