import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, Car, Check, ChevronLeft, ChevronRight, Gauge } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const extra = vehicle as Vehicle & {
    transmission?: string | null;
    body_type?: string | null;
    app_category?: string | null;
    description?: string | null;
    gallery_images?: string[] | null;
  };

  const { data: company } = useCompanyInfo();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const images = useMemo(() => {
    const gallery = Array.isArray(extra.gallery_images)
      ? extra.gallery_images.filter(Boolean)
      : [];

    if (gallery.length > 0) return gallery;
    return vehicle.image_url ? [vehicle.image_url] : [];
  }, [extra.gallery_images, vehicle.image_url]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [vehicle.id]);

  useEffect(() => {
    if (paused || images.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentImageIndex((current) => (current + 1) % images.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [images.length, paused]);

  const currentImage = images[currentImageIndex];

  function previousImage() {
    setCurrentImageIndex((current) => (current - 1 + images.length) % images.length);
  }

  function nextImage() {
    setCurrentImageIndex((current) => (current + 1) % images.length);
  }

  const message = `Olá, tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year}. Gostaria de consultar a disponibilidade.`;

  return (
    <article className="soft-card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative aspect-video overflow-hidden bg-white"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {currentImage ? (
          <img
            key={currentImage}
            src={currentImage}
            alt={`${vehicle.brand} ${vehicle.model} - foto ${currentImageIndex + 1} de ${images.length}`}
            loading="lazy"
            className="h-full w-full object-contain transition duration-500"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-secondary text-muted-foreground">
            <Car className="h-12 w-12 opacity-30" />
            <span className="text-xs">Foto em atualização</span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-2 text-xs font-extrabold text-foreground shadow">
          {(extra.body_type || "Veículo").toUpperCase()} • {vehicle.year}
        </span>

        {vehicle.price_per_week != null && Number(vehicle.price_per_week) > 0 ? (
          <span className="absolute right-4 top-4 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg">
            R$ {Number(vehicle.price_per_week).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/sem
          </span>
        ) : (
          <span className="absolute right-4 top-4 rounded-full bg-background/95 px-4 py-2 text-xs font-bold text-foreground shadow">
            Consultar valor
          </span>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label={`Foto anterior do ${vehicle.model}`}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur transition hover:bg-black/75"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label={`Próxima foto do ${vehicle.model}`}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur transition hover:bg-black/75"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-3 py-2 backdrop-blur">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Abrir foto ${index + 1} do ${vehicle.model}`}
                  className={`h-2 rounded-full transition-all ${index === currentImageIndex ? "w-5 bg-white" : "w-2 bg-white/55 hover:bg-white/80"}`}
                />
              ))}
            </div>

            <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
              {currentImageIndex + 1}/{images.length}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{vehicle.brand}</p>
        <h3 className="mt-1 font-display text-2xl font-bold">{vehicle.model}</h3>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" /> Ano {vehicle.year}
          </span>
          <span className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-primary" /> {extra.transmission || "Consulte o câmbio"}
          </span>
        </div>

        {images.length > 1 && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Galeria com {images.length} fotos • troca automática
          </p>
        )}

        {extra.app_category && (
          <p className="mt-4 rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-foreground">
            Categoria: {extra.app_category}
          </p>
        )}

        {extra.description && (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{extra.description}</p>
        )}

        {vehicle.features && vehicle.features.length > 0 && (
          <div className="mt-5 space-y-2 border-t border-border pt-5">
            {vehicle.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-sm text-foreground/80">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        <a
          href={whatsappUrl(company.whatsapp, message)}
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
