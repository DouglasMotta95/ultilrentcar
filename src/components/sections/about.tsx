import { ArrowRight, Check } from "lucide-react";

const highlights = [
  "Atendimento em Itu e região",
  "Valores e condições confirmados antes da contratação",
  "Cadastro online com análise inicial",
];

export function About() {
  return (
    <section id="quem-somos" className="section-section bg-surface">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
          <div>
            <span className="eyebrow">Sobre a UTIL</span>
            <h2 className="mt-6 max-w-xl font-display text-3xl font-extrabold leading-[1.08] tracking-normal sm:text-3xl lg:text-4xl">
              Uma locação mais clara para quem vive na rua trabalhando.
            </h2>
          </div>

          <div>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              A UTIL Rent a Car apresenta opções de veículos para motoristas de aplicativo em Itu e região. Consulte o modelo disponível, confirme os equipamentos e converse com a equipe para entender os valores e as regras antes de contratar.
            </p>
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
              className="mt-8 inline-flex items-center gap-2 font-bold text-primary transition hover:gap-3"
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
