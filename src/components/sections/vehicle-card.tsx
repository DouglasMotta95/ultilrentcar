import { useEffect, useMemo, useState } from "react";
import { Car } from "lucide-react";
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
    <article className="soft-card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-white sm:aspect-video">
        {currentImage ? (
          <img
            key={currentImage}
            src={currentImage}
            alt={`${vehicle.brand} ${vehicle.model}`}
            loading="lazy"
            decoding="async"
            onError={() => {
              setFailedImages((current) =>
                current.includes(currentImage) ? current : [...current, currentImage],
              );
              setCurrentImageIndex(0);
            }}
            className="h-full w-full object-contain object-center transition-opacity duration-500"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-secondary text-muted-foreground">
            <Car className="h-12 w-12 opacity-30" />
            <span className="text-xs">Foto em atualização</span>
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-2 text-xs font-extrabold uppercase text-foreground shadow">
          {extra.body_type || "Veículo"}
        </span>

        <span className="absolute right-4 bottom-4 rounded-full bg-black/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          {images.length} fotos
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{vehicle.brand}</p>
        <h3 className="mt-1 font-display text-2xl font-bold">{vehicle.model}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Confira a galeria do veículo e consulte disponibilidade e condições de locação.
        </p>

        <a
          href={whatsappUrl(company.whatsapp, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95"
        >
          Consultar disponibilidade
        </a>
      </div>
    </article>
  );
}
