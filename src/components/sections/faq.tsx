import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, MessageCircle } from "lucide-react";

const faqs = [
  {
    q: "Como funciona a locação para motorista de aplicativo?",
    a: "Você escolhe o plano semanal ou mensal, envia a documentação, aprovamos o cadastro e entregamos o veículo revisado e pronto para rodar nas plataformas.",
  },
  {
    q: "Precisa de caução?",
    a: "Sim, a caução é paga apenas na retirada do veículo e é devolvida ao fim do contrato, conforme as condições assinadas.",
  },
  {
    q: "Quais documentos são necessários?",
    a: "CNH com observação EAR, comprovante de residência atualizado e o cadastro ativo em pelo menos uma plataforma de aplicativo.",
  },
  {
    q: "Os veículos possuem seguro?",
    a: "Todos os carros saem com seguro 24 horas ativo e assistência, para você não ficar parado em caso de imprevisto.",
  },
  {
    q: "Os carros são revisados?",
    a: "Sim. Cada veículo passa por revisão completa antes da entrega e recebe manutenção preventiva durante toda a locação.",
  },
  {
    q: "Posso alugar com nome negativado?",
    a: "Analisamos cada caso individualmente. Fale com a nossa equipe pelo WhatsApp para verificar as condições disponíveis para o seu perfil.",
  },
  {
    q: "Qual o prazo mínimo de locação?",
    a: "O prazo mínimo é de uma semana, com renovação automática enquanto você quiser continuar rodando.",
  },
];

export function Faq() {
  return (
    <section id="duvidas" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Perguntas frequentes</span>
          <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Ainda tem dúvidas? A gente responde
          </h2>
        </div>

        <div className="soft-card mx-auto mt-12 max-w-4xl px-6">
          <Accordion type="single" collapsible>
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="py-6 text-left font-display text-base font-bold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://wa.me/5511947229449"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95"
          >
            <MessageCircle className="h-5 w-5" />
            Tirar dúvida no WhatsApp
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
