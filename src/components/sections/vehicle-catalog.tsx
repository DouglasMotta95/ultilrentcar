import { useSuspenseQuery } from "@tanstack/react-query";
import { getVehicles } from "@/lib/leads.functions";
import { VehicleCard } from "./vehicle-card";
import { useServerFn } from "@tanstack/react-start";

export function VehicleCatalog() {
  const getVehiclesFn = useServerFn(getVehicles);
  
  const { data: vehicles } = useSuspenseQuery({
    queryKey: ["vehicles"],
    queryFn: () => getVehiclesFn(),
  });

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Nenhum veículo disponível no momento.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
