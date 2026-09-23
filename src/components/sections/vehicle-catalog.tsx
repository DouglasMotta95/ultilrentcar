import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getVehicles } from "@/lib/leads.functions";
import { VehicleCard } from "./vehicle-card";
import { useServerFn } from "@tanstack/react-start";

export function VehicleCatalog() {
  const getVehiclesFn = useServerFn(getVehicles);
  const [search, setSearch] = useState("");
  const [bodyType, setBodyType] = useState("Todos");

  const { data: vehicles } = useSuspenseQuery({
    queryKey: ["vehicles"],
    queryFn: () => getVehiclesFn(),
  });

  const bodyTypes = useMemo(() => {
    const values = Array.from(
      new Set(
        (vehicles ?? [])
          .map((vehicle: any) => vehicle.body_type)
          .filter((value: string | null | undefined): value is string => Boolean(value)),
      ),
    );
    return ["Todos", ...values];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    return (vehicles ?? []).filter((vehicle: any) => {
      const matchesBody = bodyType === "Todos" || vehicle.body_type === bodyType;
      const haystack = [
        vehicle.brand,
        vehicle.model,
        vehicle.body_type,
        vehicle.app_category,
        ...(Array.isArray(vehicle.features) ? vehicle.features : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("pt-BR");
      return matchesBody && (!term || haystack.includes(term));
    });
  }, [bodyType, search, vehicles]);

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-secondary/40 py-14 text-center">
        <p className="font-display text-xl font-extrabold">Nenhum veículo disponível no momento.</p>
        <p className="mt-2 text-sm text-muted-foreground">Fale com a locadora para consultar novas disponibilidades.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 rounded-3xl border border-border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Buscar na frota</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por modelo, carroceria ou categoria..."
              className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>

          <label className="flex items-center gap-3">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-primary" />
            <span className="sr-only">Filtrar por carroceria</span>
            <select
              value={bodyType}
              onChange={(event) => setBodyType(event.target.value)}
              className="h-12 min-w-44 rounded-2xl border border-border bg-background px-4 text-sm font-bold outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              {bodyTypes.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
          <span>{filteredVehicles.length} veículo{filteredVehicles.length === 1 ? "" : "s"} exibido{filteredVehicles.length === 1 ? "" : "s"}</span>
          {(search || bodyType !== "Todos") && (
            <button
              type="button"
              onClick={() => { setSearch(""); setBodyType("Todos"); }}
              className="text-primary hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {filteredVehicles.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border py-14 text-center">
          <p className="font-display text-xl font-extrabold">Nenhum veículo corresponde à busca.</p>
          <button
            type="button"
            onClick={() => { setSearch(""); setBodyType("Todos"); }}
            className="mt-4 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Ver toda a frota
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {filteredVehicles.map((vehicle: any) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}
