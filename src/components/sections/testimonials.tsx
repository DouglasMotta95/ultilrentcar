import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Aluguei na sexta e no sábado já estava rodando. Carro limpo, revisado e o pessoal responde na hora no WhatsApp. Nunca fiquei na mão.",
    name: "Rodrigo Alves",
    role: "Motorista Uber · Itu-SP",
  },
  {
    quote:
      "O pagamento semanal salvou meu planejamento. Consigo trabalhar, pagar a locação e ainda sobra. Atendimento muito honesto.",
    name: "Cleiton Ramos",
    role: "Motorista 99 · Salto-SP",
  },
  {
    quote:
      "Já passei por outras locadoras e a diferença é o suporte. Tive um problema com pneu e resolveram no mesmo dia, sem custo extra.",
    name: "Marcos Ferreira",
    role: "Motorista Uber e InDriver",
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="bg-surface py-20 md:py-28">
      <div className="container mx-auto px-4">
        <span className="eyebrow">Depoimentos</span>

        <h2 className="mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Quem roda com a Util recomenda
        </h2>

        <div className="mt-12 space-y-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="soft-card p-7">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 text-base leading-relaxed text-foreground/90 sm:text-lg">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <p className="font-display font-bold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
