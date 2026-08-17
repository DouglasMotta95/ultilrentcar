import { CheckCircle2, Send, Clock, ShieldCheck, CreditCard, Car } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "01 — Faça seu cadastro",
      description: "Preencha seus dados básicos e profissionais diretamente em nosso site.",
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: "02 — Envie sua documentação",
      description: "Envie fotos da sua CNH, comprovante de residência e antecedentes.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "03 — Aguarde a análise",
      description: "Nossa equipe analisará seu perfil em até 24 horas úteis.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "04 — Aprovação",
      description: "Com tudo certo, você recebe a confirmação via WhatsApp ou E-mail.",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "05 — Pagamento do caução",
      description: "Realize o pagamento do caução para garantir sua reserva.",
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "06 — Retirada do veículo",
      description: "Agende o horário e retire seu carro revisado e pronto para rodar.",
    },
  ];

  return (
    <section className="py-24 bg-background text-white border-y border-white/5" id="como-funciona">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Como Funciona a Locação</h2>
          <p className="text-white/60 text-lg">
            Um processo simples e rápido para você começar a trabalhar sem burocracia excessiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Decorative connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/5 via-primary/40 to-primary/5 -translate-y-1/2 z-0 blur-sm" />
          
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative z-10 glass-card p-8 rounded-[2rem] backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 bg-primary rounded-[1.25rem] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-500">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/60 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
