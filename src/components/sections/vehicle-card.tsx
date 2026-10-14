import { useMemo, useState } from "react";
import { ArrowRight, Car } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

type Vehicle = Pick<Database["public"]["Tables"]["vehicles"]["Row"], "brand" | "model" | "image_url" | "body_type" | "gallery_images">;

// O filtro é puro e fica fora do componente para evitar dependências instáveis
// no useMemo e impedir o uso de fotos internas identificáveis pelo nome do arquivo.
const isExteriorPhoto = (url: string) =>
  !/(interior|interna|internas|painel|dashboard|cockpit|console|multim[ií]dia|bancos|estofado)/i.test(url);

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const extra = vehicle as Vehicle & {
    body_type?: string | null;
    gallery_images?: string[] | null;
  };
  const { data: company } = useCompanyInfo();
  const [imageFailed, setImageFailed] = useState(false);

  const image = useMemo(() => {
    const gallery = Array.isArray(extra.gallery_images)
      ? extra.gallery_images.filter(
          (url): url is string => typeof url === "string" && Boolean(url) && isExteriorPhoto(url),
        )
      : [];
    const directImage =
      vehicle.image_url && isExteriorPhoto(vehicle.image_url) ? vehicle.image_url : null;
    return gallery[0] || directImage || null;
  }, [extra.gallery_images, vehicle.image_url]);

  const message = `Olá, tenho interesse no ${vehicle.brand} ${vehicle.model}. Gostaria de consultar a disponibilidade, o valor semanal e os equipamentos do veículo disponível.`;

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {image && !imageFailed ? (
          <img
            src={image}
            alt={`${vehicle.brand} ${vehicle.model} — foto externa ilustrativa`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Car className="h-12 w-12 opacity-25" />
            <span className="text-xs">Foto externa em atualização</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/65 to-transparent p-5 pt-12">
          <span className="rounded-full bg-background/95 px-3 py-1.5 text-xs font-extrabold uppercase text-foreground shadow-sm">
            {extra.body_type || "Veículo"}
          </span>
        </div>
      </div>

      <div className="p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">{vehicle.brand}</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-bold tracking-tight">{vehicle.model}</h3>
          <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
        </div>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Imagem externa ilustrativa. Ano, versão e equipamentos podem variar conforme o veículo disponível.
        </p>
        <a
          href={whatsappUrl(company.whatsapp, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-95"
        >
          Consultar disponibilidade
        </a>
      </div>
    </article>
  );
}
