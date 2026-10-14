import { ArrowDown, ArrowRight, Check, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

const fallbackHeroImage =
  "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_traseira.webp";

export function Hero() {
  const { data: company } = useCompanyInfo();
  const storedTitle = (company.hero_title || "Locação de veículos para motoristas de aplicativos").trim();
  const title = storedTitle.charAt(0).toLocaleUpperCase("pt-BR") + storedTitle.slice(1).toLocaleLowerCase("pt-BR");
  const heroImage = company.hero_image_url && !/(interior|interna|internas|painel|dashboard|cockpit|console|multim[ií]dia|bancos|estofado)/i.test(company.hero_image_url)
    ? company.hero_image_url
    : fallbackHeroImage;

  return (
    <section id="inicio" className="relative overflow-hidden bg-white pt-32 md:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute -right-36 top-24 h-96 w-96 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="container relative mx-auto px-4">
        <div className="grid min-h-[570px] items-center gap-12 pb-16 pt-5 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:pb-24">
          <div className="relative z-10 max-w-2xl py-8">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.19em] text-sky-700">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Itu · São Paulo · Locação para aplicativos
            </span>
            <h1 className="mt-6 max-w-xl text-balance font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl xl:text-[3.7rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {company.hero_subtitle ||
                "Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan para a rotina de quem trabalha com aplicativos."}
            </p>


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
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-7 py-4 font-bold text-foreground transition hover:-translate-y-0.5 hover:bg-secondary"
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6 text-sm font-semibold text-muted-foreground">
              {["Atendimento direto", "Frota para aplicativos", "Condições a consultar"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-sky-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div aria-hidden="true" className="absolute -inset-4 rounded-[2.5rem] bg-sky-100/80 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-surface shadow-[0_28px_80px_-32px_rgba(15,23,42,0.35)]">
              <img
                src={heroImage}
                alt="Foto externa ilustrativa de um veículo da frota UTIL Rent a Car"
                fetchPriority="high"
                decoding="async"
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="aspect-[5/4] w-full object-cover object-center sm:aspect-[4/3] lg:aspect-[5/4]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent p-6 pt-28 text-white sm:p-8 sm:pt-36">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/75">UTIL Rent a Car</p>
                <p className="mt-2 max-w-md font-display text-2xl font-bold leading-tight sm:text-3xl">
                  Um carro para colocar seu trabalho em movimento.
                </p>
                <a
                  href="#frota"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:gap-3"
                >
                  Conheça os modelos
                  <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-border bg-white/95 px-5 py-4 shadow-lg backdrop-blur sm:left-8 sm:right-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">Frota para aplicativos</p>
              <p className="mt-1 text-sm font-semibold text-foreground">Polo Track · HB20 Hatch · HB20 Sedan · Onix Sedan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
