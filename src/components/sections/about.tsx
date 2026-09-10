import { Check, ArrowRight } from "lucide-react";

const highlights = [
  "Frota formada por sedãs ano 2025 ou mais novos",
  "Revisão completa antes da entrega",
  "Seguro e manutenção conforme as condições da locação",
  "Atendimento próximo e contrato com condições claras",
];

export function About() {
  return (
    <section id="quem-somos" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <span className="eyebrow">Quem somos</span>
        <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Uma locadora focada na rotina de quem vive do volante
        </h2>
        <div className="mt-6 max-w-4xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            A Util Locadora atende motoristas de aplicativo em Itu e região com uma proposta simples: oferecer veículos novos, bem cuidados e atendimento direto para quem depende do carro todos os dias.
          </p>
          <p>
            Nossa frota é composta por sedãs ano 2025 ou mais novos. O foco é entregar conforto, boa apresentação e veículos preparados para a rotina intensa de trabalho nos aplicativos.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <Check className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-base text-foreground">{item}</span>
            </div>
          ))}
        </div>
        <a href="#frota" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95">
          Conhecer a frota <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
