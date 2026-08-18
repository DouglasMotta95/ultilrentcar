import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

const stats = [
  { value: "Seguro", label: "Contra roubo e furto" },
  { value: "7.000 km", label: "Mensais incluídos" },
  { value: "Manutenção", label: "Por conta da locadora" },
  { value: "Apps", label: "Veículos para motoristas" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600"
          alt="Veículo revisado disponível para locação"
          className="h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>

      <div className="container mx-auto px-4">
        <span className="eyebrow">Itu • São Paulo • Uber · 99 · InDriver</span>

        <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-7xl">
          LOCAÇÃO DE CARROS PARA <span className="text-primary">APLICATIVOS</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Tenha um veículo para trabalhar e aumentar suas oportunidades como motorista de aplicativo.
          A partir de <span className="font-bold text-foreground">R$ 750,00 por semana</span>.
          <span className="block mt-1 text-sm font-medium">*O valor depende do veículo escolhido.</span>
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/cadastro"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95"
          >
            QUERO ALUGAR UM CARRO
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/cadastro"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-4 font-bold text-foreground transition hover:bg-secondary"
          >
            FAZER MEU CADASTRO
          </Link>
          <a
            href="https://wa.me/5511947229449"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-4 font-bold text-foreground transition hover:bg-secondary"
          >
            <MessageCircle className="h-5 w-5" />
            FALAR COM A LOCADORA
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-extrabold text-primary sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
