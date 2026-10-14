import { ArrowRight, CarFront, Check, ClipboardCheck, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

export function Hero() {
  const { data: company } = useCompanyInfo();
  const storedTitle = (company.hero_title || "Locação de veículos para motoristas de aplicativos").trim();
  const title = storedTitle.charAt(0).toLocaleUpperCase("pt-BR") + storedTitle.slice(1).toLocaleLowerCase("pt-BR");

  return (
    <section id="inicio" className="relative overflow-hidden bg-white pt-32 md:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute -right-36 top-24 h-96 w-96 rounded-full bg-sky-100/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-10 pb-16 pt-5 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:pb-24">
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
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_28px_80px_-32px_rgba(15,23,42,0.24)]">
              <div className="border-b border-border bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-sky-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  Como funciona
                </span>
                <h2 className="mt-4 max-w-md font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-foreground sm:text-3xl">
                  Da escolha à locação, sem complicação.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                  Consulte os modelos e converse com a equipe para entender as condições antes de iniciar.
                </p>
              </div>

              <div className="divide-y divide-border px-5 sm:px-8">
                <div className="flex gap-4 py-5 sm:py-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <CarFront className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-foreground">1. Conheça a frota</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Veja as fotos e os detalhes dos modelos disponíveis.</p>
                  </div>
                </div>
                <div className="flex gap-4 py-5 sm:py-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-foreground">2. Consulte a equipe</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Confirme disponibilidade, valores e condições pelo WhatsApp.</p>
                  </div>
                </div>
                <div className="flex gap-4 py-5 sm:py-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <ClipboardCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-foreground">3. Faça seu cadastro</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Envie seus dados para iniciar a análise da locação.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 bg-ink p-5 text-ink-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sky-200">UTIL Rent a Car</p>
                  <p className="mt-1 text-sm text-white/75">Atendimento em Itu e região</p>
                </div>
                <a href="#frota" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-foreground transition hover:bg-sky-50">
                  Ver a frota <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
