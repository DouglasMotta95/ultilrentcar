import { ArrowRight, Car, MapPin, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";
import hero from "@/assets/util-hero.jpg.asset.json";

export function Hero() {
  const { data: company } = useCompanyInfo();
  const weeklyPrice = Number(company.weekly_price_from ?? 700);
  return (
    <section id="inicio" className="bg-background pt-[100px] sm:pt-[116px]">
      <div className="container mx-auto pb-7 pt-6 sm:pb-10 sm:pt-10">
        <div className="flex items-center gap-2 text-xs font-bold text-primary"><MapPin className="h-3.5 w-3.5" />UTIL RENT A CAR · ITU E REGIÃO</div>
        <div className="mt-4 grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <h1 className="max-w-2xl font-display text-[30px] font-bold leading-[1.2] sm:text-[42px] lg:text-[48px]">Aluguel de carros para <span className="text-primary">motoristas de aplicativo.</span></h1>
          <div>
            <p className="max-w-lg text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">Seu próximo carro de trabalho está aqui. Conheça a frota da Util e encontre o modelo para a sua rotina.</p>
            {Number.isFinite(weeklyPrice) && weeklyPrice > 0 && <p className="mt-3 text-sm text-muted-foreground">A partir de <strong className="font-display text-xl text-foreground">{weeklyPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 })}</strong> / semana</p>}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 sm:mt-7">
          <Button asChild className="h-11 rounded-full px-5 font-bold"><Link to="/cadastro">Quero alugar <ArrowRight /></Link></Button>
          <Button asChild variant="outline" className="h-11 rounded-full px-5 font-bold"><a href={whatsappUrl(company.whatsapp)} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp</a></Button>
        </div>
      </div>
      <div className="hero-panorama relative overflow-hidden bg-surface">
        <img src={hero.url} alt="Chevrolet Onix Plus em uma estrada — imagem ilustrativa do modelo" fetchPriority="high" width={2000} height={729} className="h-full w-full object-cover object-[70%_50%]" />
        <span className="absolute bottom-3 right-4 rounded-full bg-background/90 px-3 py-1 text-[10px] text-foreground">Imagem ilustrativa</span>
      </div>
      <div className="border-b border-border bg-surface"><div className="container mx-auto flex flex-wrap items-center justify-between gap-3 py-4 text-xs font-semibold text-muted-foreground sm:text-sm">
        <span className="inline-flex items-center gap-2"><Car className="h-4 w-4 text-primary" />Polo Track · HB20 · Onix Sedan</span>
        <a href="#frota" className="inline-flex items-center gap-2 text-primary">Conheça nossa frota <ArrowRight className="h-4 w-4" /></a>
      </div></div>
    </section>
  );
}
