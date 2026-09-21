import { ArrowRight, FileText, KeyRound, MessageCircle, Search } from "lucide-react";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

const steps = [
  {
    n: "01",
    icon: MessageCircle,
    title: "Fale com a gente",
    description:
      "Chame no WhatsApp e conte como você pretende utilizar o veículo. A equipe apresenta as opções disponíveis.",
  },
  {
    n: "02",
    icon: FileText,
    title: "Faça seu cadastro",
    description:
      "Preencha os seus dados para a análise inicial. Caso seja necessário, a equipe solicita a documentação complementar.",
  },
  {
    n: "03",
    icon: Search,
    title: "Escolha o veículo",
    description:
      "Confira os modelos disponíveis, os valores e as condições antes de seguir com a contratação.",
  },
  {
    n: "04",
    icon: KeyRound,
    title: "Contrato e retirada",
    description:
      "Após a aprovação, confira o contrato, as condições de caução e os detalhes para retirada do veículo.",
  },
];

export function HowItWorks() {
  const { data: company } = useCompanyInfo();

  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <span className="eyebrow">Como funciona</span>

        <h2 className="mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Do primeiro contato à retirada do veículo
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map(({ n, icon: Icon, title, description }) => (
            <div key={n} className="soft-card p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="font-display text-5xl font-extrabold text-foreground/10">{n}</span>
              <Icon className="mt-5 h-6 w-6 text-primary" />
              <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <a
          href={whatsappUrl(company.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95"
        >
          <MessageCircle className="h-5 w-5" />
          Começar agora pelo WhatsApp
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
