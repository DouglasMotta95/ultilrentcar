import { ArrowRight, Check } from "lucide-react";

const highlights = [
  "Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan",
  "Condições de locação apresentadas antes da contratação",
  "Atendimento direto com a locadora",
];

export function About() {
  return (
    <section id="quem-somos" className="section-section bg-surface">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <div>
            <span className="eyebrow">Quem somos</span>
            <p className="mt-7 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              Locação pensada para quem transforma o carro em ferramenta de trabalho.
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              Uma estrutura simples para você escolher, cadastrar e começar a rodar.
            </h2>
            <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p>
                A UTIL LOCADORA atende motoristas de aplicativo em Itu e região com uma apresentação clara da frota e atendimento direto para consultar disponibilidade, valores e condições.
              </p>
              <p>
                A ideia é facilitar sua decisão: você conhece o modelo, entende as condições e faz o cadastro sem precisar navegar por uma página cheia de informação desnecessária.
              </p>
            </div>

            <div className="mt-8 grid gap-4 border-t border-border pt-7 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold leading-6 text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="#frota"
              className="mt-9 inline-flex items-center gap-2 font-bold text-primary transition hover:gap-3"
            >
              Conhecer a frota
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
