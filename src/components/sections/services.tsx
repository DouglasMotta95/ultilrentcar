import { CalendarClock, Car, MessageCircle } from "lucide-react";

const services = [
  {
    icon: CalendarClock,
    title: "Locação semanal",
    description: "Consulte o valor vigente, caução, quilometragem e as condições do plano antes de fechar.",
  },
  {
    icon: Car,
    title: "Veículos para aplicativos",
    description: "Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan, conforme disponibilidade da frota.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento direto",
    description: "Confirme modelo, equipamentos, documentação e prazo de retirada com a equipe.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="section-section bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <span className="eyebrow">Serviços</span>
            <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              Tudo o que você precisa confirmar antes de alugar.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Informações essenciais, contato simples e próximos passos apresentados sem prometer equipamentos ou condições não confirmadas.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {services.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs font-bold text-muted-foreground/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7 font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
