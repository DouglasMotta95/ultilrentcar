import { ArrowRight, FileText, KeyRound, MessageCircle, Search } from "lucide-react";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

const steps = [
  {
    n: "01",
    icon: MessageCircle,
    title: "Fale com a gente",
    description: "Chame no WhatsApp e conte como você pretende utilizar o veículo.",
  },
  {
    n: "02",
    icon: FileText,
    title: "Faça seu cadastro",
    description: "Preencha os dados para a análise inicial da sua solicitação.",
  },
  {
    n: "03",
    icon: Search,
    title: "Escolha o veículo",
    description: "Veja os modelos disponíveis, valores e condições antes de decidir.",
  },
  {
    n: "04",
    icon: KeyRound,
    title: "Contrato e retirada",
    description: "Após a aprovação, a equipe orienta os próximos passos para retirada.",
  },
];

export function HowItWorks() {
  const { data: company } = useCompanyInfo();

  return (
    <section id="como-funciona" className="section-section bg-surface">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <span className="eyebrow">Como funciona</span>
          <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            Da primeira conversa até a retirada do veículo.
          </h2>
        </div>

        <div className="mt-14 grid gap-0 overflow-hidden rounded-[2rem] border border-border bg-card lg:grid-cols-4">
          {steps.map(({ n, icon: Icon, title, description }, index) => (
            <div
              key={n}
              className={`relative p-7 md:p-8 lg:p-9 ${
                index < steps.length - 1 ? "border-b lg:border-b-0 lg:border-r" : ""
              }`}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Etapa {n}
              </span>
              <span className="mt-7 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-7 font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <a
          href={whatsappUrl(company.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center gap-2 font-bold text-primary transition hover:gap-3"
        >
          Começar pelo WhatsApp
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
