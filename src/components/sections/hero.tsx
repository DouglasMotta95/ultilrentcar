import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

const fallbackHeroImage =
  "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_traseira.webp";

export function Hero() {
  const { data: company } = useCompanyInfo();

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="container mx-auto px-4">
        <div className="grid min-h-[680px] items-center gap-10 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:pb-24">
          <div className="relative z-10 max-w-2xl py-10">
            <span className="eyebrow">Itu • São Paulo • Motoristas de aplicativo</span>
            <h1 className="mt-7 text-balance font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[5.35rem]">
              {company.hero_title || "LOCAÇÃO DE VEÍCULOS PARA MOTORISTAS DE APLICATIVOS"}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              {company.hero_subtitle ||
                "Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan para motoristas de aplicativos."}
            </p>

            {company.weekly_price_from != null &&
              Number(company.weekly_price_from) > 0 && (
                <div className="mt-6 inline-flex items-baseline gap-2 rounded-2xl border border-border bg-background px-4 py-3 shadow-sm">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Locação a partir de
                  </span>
                  <strong className="font-display text-xl font-extrabold text-foreground">
                    R$ {Number(company.weekly_price_from).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </strong>
                  <span className="text-sm text-muted-foreground">/ semana</span>
                </div>
              )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/cadastro"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:brightness-95"
              >
                Quero alugar um veículo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={whatsappUrl(company.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-4 font-bold text-foreground transition hover:-translate-y-0.5 hover:bg-secondary"
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
              </a>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-7 sm:grid-cols-4">
              {[
                ["4", "modelos"],
                ["Semanal", "forma prática"],
                ["Direto", "atendimento"],
                ["Apps", "foco da frota"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-lg font-extrabold">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/10 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-secondary shadow-2xl">
              {company.hero_image_url || fallbackHeroImage ? (
                <img
                  src={company.hero_image_url || fallbackHeroImage}
                  alt="Veículo da frota da UTIL LOCADORA"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="aspect-[4/5] w-full object-cover object-center sm:aspect-[5/4]"
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center sm:aspect-[5/4]">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Frota UTIL LOCADORA
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 pt-24 text-white">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                      Nossa proposta
                    </p>
                    <p className="mt-2 max-w-md font-display text-xl font-bold sm:text-2xl">
                      Um veículo para colocar sua rotina de trabalho na rua.
                    </p>
                  </div>
                  <a
                    href="#frota"
                    className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md sm:flex"
                    aria-label="Ir para a frota"
                  >
                    <ArrowDown className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
