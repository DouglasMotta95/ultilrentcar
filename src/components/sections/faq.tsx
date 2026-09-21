import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

const faqs = [
  {
    q: "Como funciona a locação para motorista de aplicativo?",
    a: "Você consulta a frota e as condições, faz o cadastro e passa pela análise da locadora. Após a aprovação, a equipe orienta sobre contrato, caução e retirada do veículo.",
  },
  {
    q: "Precisa de caução?",
    a: "As condições de caução são informadas antes da contratação e constam no contrato. Consulte a equipe para saber o valor aplicável ao veículo escolhido.",
  },
  {
    q: "Quais documentos são necessários?",
    a: "A documentação necessária é informada durante a análise do cadastro. A locadora pode solicitar CNH, comprovante de residência e informações relacionadas ao uso em aplicativos.",
  },
  {
    q: "Os veículos possuem seguro?",
    a: "As condições de seguro, cobertura, assistência e responsabilidades são apresentadas antes da contratação e constam no contrato de locação.",
  },
  {
    q: "Os carros são revisados?",
    a: "A locadora acompanha a manutenção dos veículos e as condições necessárias para a utilização durante a locação.",
  },
  {
    q: "Posso alugar com nome negativado?",
    a: "Cada cadastro é analisado individualmente. Fale com a equipe para verificar as condições aplicáveis ao seu perfil.",
  },
  {
    q: "Qual o prazo mínimo de locação?",
    a: "Os períodos e planos disponíveis podem variar. Consulte a equipe para confirmar as condições atuais antes de contratar.",
  },
];

export function Faq() {
  const { data: company } = useCompanyInfo();

  return (
    <section id="duvidas" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Perguntas frequentes</span>
          <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Ainda tem dúvidas? Fale com a gente
          </h2>
        </div>

        <div className="soft-card mx-auto mt-12 max-w-4xl px-6">
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="py-6 text-left font-display text-base font-bold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <a
            href={whatsappUrl(company.whatsapp)}
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
