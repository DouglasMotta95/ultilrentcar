import { MessageCircle, FileText, Search, KeyRound, ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: MessageCircle,
    title: "Fale com a gente",
    description:
      "Chame no WhatsApp e conte qual plataforma você roda. Em minutos apresentamos o plano ideal para o seu perfil.",
  },
  {
    n: "02",
    icon: FileText,
    title: "Envie os documentos",
    description:
      "CNH com EAR, comprovante de residência e cadastro no aplicativo. Análise rápida e sem burocracia desnecessária.",
  },
  {
    n: "03",
    icon: Search,
    title: "Escolha o veículo",
    description:
      "Você seleciona o carro disponível que mais combina com a sua rotina e confere tudo antes de assinar.",
  },
  {
    n: "04",
    icon: KeyRound,
    title: "Retire e comece a rodar",
    description:
      "Assinatura do contrato, caução apenas na retirada do veículo e chave na mão para começar a faturar.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <span className="eyebrow">Como funciona</span>

        <h2 className="mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Do primeiro contato à chave na mão
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map(({ n, icon: Icon, title, description }) => (
            <div key={n} className="soft-card p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="font-display text-5xl font-extrabold text-muted/80 text-secondary-foreground/15">
                {n}
              </span>
              <Icon className="mt-5 h-6 w-6 text-primary" />
              <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <a
          href="https://wa.me/5511947229449"
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
