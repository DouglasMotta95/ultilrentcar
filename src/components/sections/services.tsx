import { CalendarClock, Car, Headphones, ShieldCheck, Wallet, Wrench } from "lucide-react";

const services = [
  {
    icon: CalendarClock,
    title: "Locação semanal",
    description:
      "Opção prática para quem trabalha com aplicativos e prefere organizar o pagamento por semana.",
  },
  {
    icon: Car,
    title: "Locação mensal",
    description:
      "Consulte as condições disponíveis para períodos maiores e escolha o formato que melhor atende sua rotina.",
  },
  {
    icon: Wallet,
    title: "Para motoristas de aplicativo",
    description:
      "Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan. Consulte a compatibilidade do veículo com a plataforma e a categoria em que você pretende rodar.",
  },
  {
    icon: ShieldCheck,
    title: "Seguro e assistência",
    description:
      "As condições de cobertura, assistência e responsabilidades são apresentadas de forma clara antes da contratação.",
  },
  {
    icon: Wrench,
    title: "Veículos revisados",
    description:
      "A locadora acompanha a manutenção preventiva e as condições do veículo durante a locação.",
  },
  {
    icon: Headphones,
    title: "Atendimento direto",
    description:
      "Fale com a equipe pelo WhatsApp para consultar disponibilidade, valores e tirar dúvidas antes de fechar.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="bg-surface py-20 md:py-28">
      <div className="container mx-auto px-4">
        <span className="eyebrow">Serviços</span>

        <h2 className="mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Tudo o que você precisa para rodar com tranquilidade
        </h2>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Condições pensadas para a rotina do motorista de aplicativo, com informações claras antes da contratação.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map(({ icon: Icon, title, description }) => (
            <div key={title} className="soft-card p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
