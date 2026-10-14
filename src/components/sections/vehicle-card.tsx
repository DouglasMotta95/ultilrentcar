import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Car } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";
import onixImage from "@/assets/util-onix.jpg.asset.json";

type Vehicle = Pick<Database["public"]["Tables"]["vehicles"]["Row"], "brand" | "model" | "image_url"> & {
  id?: string;
  body_type?: string | null;
  gallery_images?: string[] | null;
};

const poloTrackPhotos = [
  "https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36482.webp",
  "https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36481.webp",
  "https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36479.webp",
  "https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36478.webp",
  "https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36480.webp",
];

const hb20HatchPhotos = [
  "https://blog-cnm.s3.sa-east-1.amazonaws.com/2025/07/design-sem-nome-2025-07-18t125729072.jpg",
  "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/veiculo/360/externo/hb20_cinza_shadow_01.webp",
  "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_lateral.webp",
  "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_grade.webp",
  "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_traseira.webp",
];

const hb20SedanPhotos = [
  "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/modal/desktop/01-design_grade_desk.webp",
  "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/veiculo/360/externo_v2/hb20s_cinza_shadow_01.webp",
  "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_lateral.webp",
  "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_grade.webp",
  "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_traseira.webp",
];

const onixPlusPhotos = [
  onixImage.url,
  "https://chevroletorca.com.br/uploads/products/versions/colors/onixplus-at-branco-summit-1.png",
  "https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-01.jpeg?imwidth=2400",
  "https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-02.jpeg?imwidth=2400",
  "https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-03.jpeg?imwidth=2400",
];

const isExteriorPhoto = (url: string) =>
  !/(interior|intern[oa]s?|painel|dashboard|cockpit|console|multim[ií]dia|bancos|estofado)/i.test(url);

function preferredPhotos(vehicle: Vehicle): string[] {
  const model = vehicle.model.toLocaleLowerCase("pt-BR");
  if (model.includes("polo")) return poloTrackPhotos;
  if (model.includes("hb20s") || (model.includes("hb20") && model.includes("sedan"))) return hb20SedanPhotos;
  if (model.includes("hb20")) return hb20HatchPhotos;
  if (model.includes("onix")) return onixPlusPhotos;
  return [];
}

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const extra = vehicle as Vehicle & { body_type?: string | null; gallery_images?: string[] | null };
  const { data: company } = useCompanyInfo();
  const [slideIndex, setSlideIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const images = useMemo(() => {
    const gallery = Array.isArray(extra.gallery_images)
      ? extra.gallery_images.filter((url): url is string =>
          typeof url === "string" && Boolean(url.trim()) && isExteriorPhoto(url))
      : [];
    const preferred = preferredPhotos(vehicle);
    const directImage = vehicle.image_url && isExteriorPhoto(vehicle.image_url) ? [vehicle.image_url] : [];
    return Array.from(new Set([...preferred, ...gallery, ...directImage]));
  }, [extra.gallery_images, vehicle.image_url, vehicle.model]);

  const availableImages = images.filter((url) => !failedImages.includes(url));
  const activeIndex = availableImages.length ? slideIndex % availableImages.length : 0;
  const image = availableImages[activeIndex] ?? null;

  useEffect(() => {
    setSlideIndex(0);
    setFailedImages([]);
  }, [vehicle.brand, vehicle.model]);

  useEffect(() => {
    if (availableImages.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % availableImages.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [availableImages.length, vehicle.model]);

  const message =
    "Olá, tenho interesse no " + vehicle.brand + " " + vehicle.model +
    ". Gostaria de consultar a disponibilidade, o valor semanal e os equipamentos do veículo disponível.";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-border/60 bg-slate-50 px-4 py-3 sm:px-5">
        {image ? (
          <img
            key={image}
            src={image}
            alt={vehicle.brand + " " + vehicle.model + " — foto externa ilustrativa"}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-2 transition-opacity duration-500"
            onError={() => setFailedImages((current) => current.includes(image) ? current : [...current, image])}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Car className="h-10 w-10 opacity-30" />
            <span className="text-xs">Foto externa indisponível</span>
          </div>
        )}

        {availableImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setSlideIndex((current) => (current - 1 + availableImages.length) % availableImages.length)}
              aria-label={"Foto anterior do " + vehicle.model}
              className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-white/90 text-foreground shadow-sm transition hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setSlideIndex((current) => (current + 1) % availableImages.length)}
              aria-label={"Próxima foto do " + vehicle.model}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-white/90 text-foreground shadow-sm transition hover:bg-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1.5 shadow-sm">
              {availableImages.map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  aria-label={"Mostrar foto " + (index + 1) + " do " + vehicle.model}
                  aria-pressed={index === activeIndex}
                  onClick={() => setSlideIndex(index)}
                  className={"h-1.5 rounded-full transition-all " + (index === activeIndex ? "w-4 bg-primary" : "w-1.5 bg-slate-300")}
                />
              ))}
            </div>
          </>
        )}

        <span className="absolute right-3 top-3 rounded-full border border-border/80 bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
          {extra.body_type || "Veículo"}
        </span>
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
