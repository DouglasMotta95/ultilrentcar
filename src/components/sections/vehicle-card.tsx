import { Car, Gauge, Check, BadgeCheck } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const whatsappText = encodeURIComponent(
    `Olá, tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year}. Gostaria de consultar a disponibilidade.`,
  );

  return (
    <article className="soft-card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {vehicle.image_url ? (
          <img
            src={vehicle.image_url}
            alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year} disponível para locação`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Car className="h-12 w-12 opacity-30" />
            <span className="text-xs">Foto em atualização</span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-2 text-xs font-extrabold text-foreground shadow">
          SEDÃ • {vehicle.year}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg">
          R$ {Number(vehicle.price_per_week).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/sem
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{vehicle.brand}</p>
        <h3 className="mt-1 font-display text-2xl font-bold">{vehicle.model}</h3>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" /> Ano {vehicle.year}
          </span>
          <span className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-primary" /> Frota 2025+
          </span>
        </div>

        {vehicle.features && vehicle.features.length > 0 && (
          <div className="mt-5 space-y-2 border-t border-border pt-5">
            {vehicle.features.slice(0, 4).map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        <a
          href={`https://wa.me/5511947229449?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95"
        >
          Consultar disponibilidade
        </a>
      </div>
    </article>
  );
}
