import { CalendarClock, Car, Wallet, ShieldCheck, Wrench, Headphones } from "lucide-react";

const services = [
  {
    icon: CalendarClock,
    title: "Locação semanal",
    description:
      "Plano flexível com pagamento semanal, ideal para quem quer começar a rodar hoje mesmo e manter o caixa organizado.",
  },
  {
    icon: Car,
    title: "Locação mensal",
    description:
      "Melhor valor por diária para quem roda todos os dias. Estabilidade, previsibilidade e economia no fim do mês.",
  },
  {
    icon: Wallet,
    title: "Locação para Uber e 99",
    description:
      "Veículos dentro dos requisitos das plataformas, com documentação em dia e prontos para cadastro imediato.",
  },
  {
    icon: ShieldCheck,
    title: "Seguro 24 horas",
    description:
      "Cobertura ativa o tempo todo e assistência para você não ficar parado quando mais precisa trabalhar.",
  },
  {
    icon: Wrench,
    title: "Veículos revisados",
    description:
      "Manutenção preventiva, pneus, freios e revisão periódica acompanhados pela nossa equipe técnica.",
  },
  {
    icon: Headphones,
    title: "Atendimento rápido",
    description:
      "Resposta ágil no WhatsApp, suporte humanizado e solução prática — do orçamento à entrega das chaves.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="bg-surface py-20 md:py-28">
      <div className="container mx-auto px-4">
        <span className="eyebrow">Serviços</span>

        <h2 className="mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Tudo o que você precisa para rodar tranquilo
        </h2>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Planos pensados para o dia a dia do motorista de aplicativo, com condições claras e suporte
          do início ao fim.
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
