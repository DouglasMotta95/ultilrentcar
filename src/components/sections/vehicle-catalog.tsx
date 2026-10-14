import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getVehicles } from "@/lib/leads.functions";
import { VehicleCard } from "./vehicle-card";

export function VehicleCatalog() {
  const getVehiclesFn = useServerFn(getVehicles);
  const { data: vehicles } = useSuspenseQuery({
    queryKey: ["vehicles"],
    queryFn: () => getVehiclesFn(),
  });

  if (!vehicles || vehicles.length === 0) {
    return <div className="rounded-2xl border border-dashed border-border bg-surface py-14 text-center text-muted-foreground">Nenhum veículo disponível no momento.</div>;
  }

  return (
    <div className="grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
      {vehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
    </div>
  );
}
