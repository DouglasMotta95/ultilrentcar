import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Car } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const extra = vehicle as Vehicle & {
    body_type?: string | null;
    gallery_images?: string[] | null;
  };

  const { data: company } = useCompanyInfo();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const images = useMemo(() => {
    const gallery = Array.isArray(extra.gallery_images)
      ? Array.from(new Set(extra.gallery_images.filter(Boolean)))
      : [];
    const source = gallery.length > 0 ? gallery : vehicle.image_url ? [vehicle.image_url] : [];
    return source.filter((url) => !failedImages.includes(url));
  }, [extra.gallery_images, vehicle.image_url, failedImages]);

  useEffect(() => {
    setCurrentImageIndex(0);
    setFailedImages([]);
  }, [vehicle.id]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || images.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentImageIndex((current) => (current + 1) % images.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (currentImageIndex >= images.length && images.length > 0) {
      setCurrentImageIndex(0);
    }
  }, [currentImageIndex, images.length]);

  const currentImage = images[currentImageIndex];
  const message = `Olá, tenho interesse no ${vehicle.brand} ${vehicle.model}. Gostaria de consultar a disponibilidade.`;

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {currentImage ? (
          <img
            key={currentImage}
            src={currentImage}
            alt={`${vehicle.brand} ${vehicle.model}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
            onError={() => {
              setFailedImages((current) =>
                current.includes(currentImage) ? current : [...current, currentImage],
              );
              setCurrentImageIndex(0);
            }}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Car className="h-12 w-12 opacity-25" />
            <span className="text-xs">Foto em atualização</span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent p-5 pt-20">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold uppercase text-foreground shadow-sm">
              {extra.body_type || "Veículo"}
            </span>
            <span className="text-xs font-bold text-white/85">{images.length} fotos</span>
          </div>
        </div>
      </div>

      <div className="p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">{vehicle.brand}</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-bold tracking-tight">{vehicle.model}</h3>
          <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Consulte disponibilidade e condições atuais para locação.
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
