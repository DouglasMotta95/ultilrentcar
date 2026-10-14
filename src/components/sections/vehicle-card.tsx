import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Car } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";
import onixImage from "@/assets/util-onix.jpg.asset.json";

type Vehicle = Pick<Database["public"]["Tables"]["vehicles"]["Row"], "brand" | "model" | "image_url"> & {
  id?: string;
  body_type?: string | null;
  gallery_images?: string[] | null;
};

const isExteriorPhoto = (url: string) =>
  !/(interior|intern[oa]s?|painel|dashboard|cockpit|console|multim[ií]dia|bancos|estofado)/i.test(url);

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const extra = vehicle as Vehicle & { body_type?: string | null; gallery_images?: string[] | null };
  const { data: company } = useCompanyInfo();
  const [imageIndex, setImageIndex] = useState(0);

  const images = useMemo(() => {
    const gallery = Array.isArray(extra.gallery_images)
      ? extra.gallery_images.filter((url): url is string =>
          typeof url === "string" && Boolean(url.trim()) && isExteriorPhoto(url))
      : [];
    // Para o HB20, prefere a vista externa 360° à miniatura de traseira/lateral.
    const frontThreeQuarter = gallery.find((url) => /veiculo\/360\/externo/i.test(url));
    const directImage = vehicle.image_url && isExteriorPhoto(vehicle.image_url) ? [vehicle.image_url] : [];
    const onixFallback = /onix/i.test(vehicle.model) ? [onixImage.url] : [];
    return Array.from(new Set([...(frontThreeQuarter ? [frontThreeQuarter] : []), ...gallery, ...directImage, ...onixFallback]));
  }, [extra.gallery_images, vehicle.image_url, vehicle.model]);

  useEffect(() => {
    setImageIndex(0);
  }, [vehicle.brand, vehicle.model, images.length]);

  const image = images[imageIndex] ?? null;
  const message =
    "Olá, tenho interesse no " + vehicle.brand + " " + vehicle.model +
    ". Gostaria de consultar a disponibilidade, o valor semanal e os equipamentos do veículo disponível.";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-border/60 bg-slate-50 px-4 py-3 sm:px-6">
        {image ? (
          <img key={image} src={image} alt={vehicle.brand + " " + vehicle.model + " — foto externa ilustrativa"} loading="lazy" decoding="async" className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]" onError={() => setImageIndex((current) => Math.min(current + 1, images.length))} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Car className="h-10 w-10 opacity-30" /><span className="text-xs">Foto externa indisponível</span>
          </div>
        )}
        <span className="absolute right-4 top-4 rounded-full border border-border/80 bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">{extra.body_type || "Veículo"}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">{vehicle.brand}</p>
        <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">{vehicle.model}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Foto ilustrativa. Ano, versão e equipamentos são confirmados com a locadora.
        </p>
        <a href={whatsappUrl(company.whatsapp, message)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-95">
          Consultar disponibilidade <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
