import { CalendarClock, Car, Headphones, ShieldCheck, Wallet } from "lucide-react";

const services = [
  {
    icon: CalendarClock,
    title: "Locação semanal",
    description: "Uma forma prática de organizar a locação para quem trabalha com aplicativos.",
  },
  {
    icon: Car,
    title: "Locação mensal",
    description: "Consulte condições para períodos maiores e escolha o formato que combina com sua rotina.",
  },
  {
    icon: Wallet,
    title: "Foco em aplicativos",
    description: "Frota apresentada para quem precisa de um veículo para trabalhar com as principais plataformas.",
  },
  {
    icon: ShieldCheck,
    title: "Condições claras",
    description: "Cobertura, responsabilidades, caução e demais regras são apresentadas antes da contratação.",
  },
  {
    icon: Headphones,
    title: "Atendimento direto",
    description: "Fale com a equipe para consultar disponibilidade, valores e tirar dúvidas.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="section-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow">Serviços</span>
            <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Tudo organizado para você focar no que realmente importa.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Uma jornada objetiva: entender as opções, escolher o veículo e conversar com a locadora antes de fechar.
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-border bg-card md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className={`group border-border p-7 transition hover:bg-secondary/60 md:p-8 ${
                index % 3 !== 2 ? "lg:border-r" : ""
              } ${index < 3 ? "lg:border-b" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs font-bold text-muted-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-8 font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 max-w-sm leading-7 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
