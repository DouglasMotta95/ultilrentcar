import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

const stats = [
  { value: "Seguro", label: "Consulte as condições" },
  { value: "4 modelos", label: "Frota selecionada" },
  { value: "Manutenção", label: "Conforme o contrato" },
  { value: "Apps", label: "Veículos para motoristas" },
];

export function Hero() {
  const { data: company } = useCompanyInfo();
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-secondary">
        {company.hero_image_url && (
          <>
            <img src={company.hero_image_url} alt="Frota de veículos da UTIL LOCADORA" fetchPriority="high" decoding="async" sizes="100vw" className="h-full w-full object-cover object-right" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/35" />
          </>
        )}
      </div>
      <div className="container mx-auto px-4">
        <span className="eyebrow">Itu • São Paulo • Motoristas de aplicativo</span>
        <h1 className="mt-6 max-w-3xl font-display text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-7xl">{company.hero_title || "LOCAÇÃO DE CARROS PARA APLICATIVOS"}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {company.hero_subtitle || "Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan para a rotina de quem trabalha com aplicativos."}
          {company.weekly_price_from != null && Number(company.weekly_price_from) > 0 && <span className="mt-2 block font-bold text-foreground">A partir de R$ {Number(company.weekly_price_from).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} por semana.</span>}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/cadastro" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">QUERO ALUGAR UM CARRO <ArrowRight className="h-4 w-4" /></Link>
          <a href="#frota" className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-background px-7 py-4 font-bold text-foreground transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">VER NOSSA FROTA</a>
          <a href={whatsappUrl(company.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-4 font-bold text-foreground transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><MessageCircle className="h-5 w-5" /> FALAR COM A LOCADORA</a>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((item) => <div key={item.label}><p className="font-display text-xl font-extrabold text-foreground">{item.value}</p><p className="mt-1 text-sm text-muted-foreground">{item.label}</p></div>)}
        </div>
      </div>
    </section>
  );
}
