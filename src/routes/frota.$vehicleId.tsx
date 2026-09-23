import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  BadgeCheck,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Gauge,
  MessageCircle,
  Pause,
  Play,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { getVehicles } from "@/lib/leads.functions";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

export const Route = createFileRoute("/frota/$vehicleId")({
  component: VehicleDetailPage,
  head: () => ({
    title: "Veículo | UTIL LOCADORA",
    meta: [
      {
        name: "description",
        content: "Confira fotos, especificações e condições do veículo disponível na UTIL LOCADORA.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
});

function VehicleDetailPage() {
  const { vehicleId } = useParams({ from: "/frota/$vehicleId" });
  const getVehiclesFn = useServerFn(getVehicles);
  const { data: vehicles } = useSuspenseQuery({
    queryKey: ["vehicles"],
    queryFn: () => getVehiclesFn(),
  });
  const { data: company } = useCompanyInfo();

  const vehicle = vehicles.find((item: any) => String(item.id) === String(vehicleId));

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-background pt-28">
        <Navbar />
        <section className="container mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4 py-20 text-center">
          <div>
            <span className="eyebrow">Frota</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold">Veículo não encontrado</h1>
            <p className="mt-4 text-muted-foreground">
              Este veículo pode ter saído da frota pública ou estar temporariamente indisponível.
            </p>
            <Link
              to="/"
              hash="frota"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para a frota
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return <VehicleDetail vehicle={vehicle} company={company} />;
}

function VehicleDetail({ vehicle, company }: { vehicle: any; company: any }) {
  const images = useMemo(
    () =>
      Array.from(
        new Set(
          (Array.isArray(vehicle.gallery_images) ? vehicle.gallery_images : [vehicle.image_url]).filter(Boolean),
        ),
      ) as string[],
    [vehicle.gallery_images, vehicle.image_url],
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || manualPaused) return;
    const timer = window.setInterval(
      () => setCurrentImageIndex((current) => (current + 1) % images.length),
      4200,
    );
    return () => window.clearInterval(timer);
  }, [images.length, manualPaused]);

  const currentImage = images[currentImageIndex] ?? null;
  const message = `Olá, tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year > 0 ? vehicle.year : ""}. Gostaria de consultar a disponibilidade e as condições.`;
  const price =
    vehicle.price_per_week != null && Number(vehicle.price_per_week) > 0
      ? `R$ ${Number(vehicle.price_per_week).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/semana`
      : "Valor sob consulta";

  return (
    <main className="min-h-screen bg-background pt-28">
      <Navbar />

      <section className="container mx-auto px-4 py-10 md:py-16">
        <Link
          to="/"
          hash="frota"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para a frota
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm md:aspect-[16/10]">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={`${vehicle.brand} ${vehicle.model} — foto ${currentImageIndex + 1} de ${images.length}`}
                  className="h-full w-full object-contain"
                  decoding="async"
                  fetchPriority="high"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <Car className="h-14 w-14 opacity-30" />
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImageIndex((current) => (current - 1 + images.length) % images.length)
                    }
                    aria-label="Foto anterior"
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentImageIndex((current) => (current + 1) % images.length)}
                    aria-label="Próxima foto"
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualPaused((value) => !value)}
                    aria-label={manualPaused ? "Continuar galeria" : "Pausar galeria"}
                    className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur"
                  >
                    {manualPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </button>
                  <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-2 text-xs font-bold text-white backdrop-blur">
                    {currentImageIndex + 1}/{images.length}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-video overflow-hidden rounded-xl border-2 bg-white ${index === currentImageIndex ? "border-primary" : "border-transparent"}`}
                  >
                    <img
                      src={image}
                      alt={`Miniatura ${index + 1} de ${vehicle.model}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="self-start rounded-[2rem] border border-border bg-white p-7 shadow-sm md:p-9">
            <span className="eyebrow">{(vehicle.body_type || "Veículo").toUpperCase()}</span>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-primary">{vehicle.brand}</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{vehicle.model}</h1>

            <p className="mt-5 text-2xl font-extrabold text-foreground">{price}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-secondary/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Ano</p>
                <p className="mt-1 flex items-center gap-2 font-bold">
                  <Gauge className="h-4 w-4 text-primary" />
                  {vehicle.year > 0 ? vehicle.year : "A consultar"}
                </p>
              </div>
              <div className="rounded-2xl bg-secondary/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Câmbio</p>
                <p className="mt-1 flex items-center gap-2 font-bold">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  {vehicle.transmission || "A consultar"}
                </p>
              </div>
              {vehicle.app_category && (
                <div className="rounded-2xl bg-secondary/60 p-4 sm:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Categoria de aplicativo</p>
                  <p className="mt-1 font-bold">{vehicle.app_category}</p>
                </div>
              )}
            </div>

            {vehicle.description && (
              <p className="mt-7 leading-relaxed text-muted-foreground">{vehicle.description}</p>
            )}

            {Array.isArray(vehicle.features) && vehicle.features.length > 0 && (
              <div className="mt-7 border-t border-border pt-7">
                <h2 className="font-display text-lg font-extrabold">Destaques</h2>
                <div className="mt-4 space-y-3">
                  {vehicle.features.map((feature: string) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={whatsappUrl(company.whatsapp, message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95"
              >
                <MessageCircle className="h-5 w-5" /> Consultar no WhatsApp
              </a>
              <Link
                to="/cadastro"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-center font-bold text-foreground transition hover:bg-secondary"
              >
                Quero fazer cadastro
              </Link>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Valores, disponibilidade, requisitos, seguro, caução e condições finais devem ser confirmados com a locadora antes da contratação.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsappButton />
    </main>
  );
}
