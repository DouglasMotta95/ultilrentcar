import { ArrowRight, Car, MapPin, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

const fleetModels = ["Polo Track", "HB20 Hatch", "HB20 Sedan", "Onix Plus"];

export function Hero() {
  const { data: company } = useCompanyInfo();
  const weeklyPrice = Number(company.weekly_price_from ?? 700);

  return (
    <section id="inicio" className="bg-background pt-[140px] sm:pt-[150px] lg:pt-[132px]">
      <div className="container mx-auto max-w-[1320px] px-4 pb-10 pt-5 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16 lg:pt-8">
        <div className="grid items-center gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-accent-foreground">
              <MapPin className="h-3.5 w-3.5" /> Itu e região
            </span>
            <h1 className="mt-5 max-w-2xl font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-[3.4rem]">
              Aluguel de carros para <span className="text-primary">motoristas de aplicativo.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Consulte os modelos disponíveis, confirme as condições e escolha o veículo para sua rotina de trabalho.
            </p>

            {Number.isFinite(weeklyPrice) && weeklyPrice > 0 && (
              <div className="mt-6 inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-2xl border border-border bg-white px-5 py-3.5 shadow-sm">
                <span className="text-sm font-semibold text-muted-foreground">A partir de</span>
                <strong className="font-display text-2xl font-extrabold text-foreground">
                  {weeklyPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 })}
                </strong>
                <span className="text-sm text-muted-foreground">/ semana</span>
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="h-12 rounded-full px-6 font-bold">
                <a href="#frota">Ver veículos <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full px-6 font-bold">
                <a href={whatsappUrl(company.whatsapp)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-1 h-4 w-4" /> Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink p-6 text-ink-foreground shadow-xl sm:rounded-[2rem] sm:p-8 lg:p-9">
            <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/80">
                UTIL Rent a Car
              </span>
              <div className="mt-6 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                  <Car className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-sky-200">Frota para aplicativos</p>
                  <h2 className="mt-1 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                    Quatro modelos para sua rotina.
                  </h2>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {fleetModels.map((model) => (
                  <div key={model} className="rounded-xl border border-white/10 bg-white/[0.07] px-3 py-3 text-sm font-semibold text-white sm:px-4">
                    {model}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-white/65">
                Fotos ilustrativas. Consulte a disponibilidade, a versão e os equipamentos do veículo com a equipe.
              </p>
              <a href="#frota" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:gap-3">
                Conheça a frota <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
