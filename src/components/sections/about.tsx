import { Check, ArrowRight, MessageCircle } from "lucide-react";

const highlights = [
  "Aprovados em Uber, 99 e InDriver",
  "Revisão completa antes da entrega",
  "Seguro 24 horas incluso",
  "Contrato transparente, sem surpresas",
];

export function About() {
  return (
    <section id="quem-somos" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <span className="eyebrow">Quem somos</span>

        <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Uma locadora feita para quem vive do volante
        </h2>

        <div className="mt-6 max-w-4xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            A Util Locadora de Veículos nasceu em Itu-SP com um propósito claro: dar ao motorista de
            aplicativo um carro confiável, um custo justo e um atendimento que resolve. Cuidamos da
            manutenção, da documentação e do seguro — você cuida das corridas.
          </p>
          <p>
            Nossa frota é composta por veículos populares nacionais, econômicos e aprovados nas
            principais plataformas de mobilidade. Cada carro passa por revisão antes da entrega e
            recebe acompanhamento durante todo o período de locação.
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

        <a
          href="#servicos"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95"
        >
          <MessageCircle className="h-5 w-5" />
          Conhecer condições
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
