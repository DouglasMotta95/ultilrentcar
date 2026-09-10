const benefits = [
  { title: "Frota 2025+", description: "Sedãs novos, com boa apresentação e preparados para a rotina do motorista." },
  { title: "Veículos revisados", description: "Manutenção preventiva e itens de segurança acompanhados pela locadora." },
  { title: "Conforto para trabalhar", description: "Sedãs que entregam mais espaço e conforto para motorista e passageiros." },
  { title: "Planos para quem roda", description: "Condições de locação pensadas para a rotina de quem trabalha com aplicativos." },
  { title: "Atendimento direto", description: "Suporte próximo para tirar dúvidas e resolver o que for necessário." },
  { title: "Condições claras", description: "Você conhece valores, regras e responsabilidades antes de fechar a locação." },
  { title: "Documentação em dia", description: "Veículos regularizados e preparados para começar a trabalhar." },
  { title: "Disponibilidade atualizada", description: "Consulte a equipe para saber quais sedãs estão disponíveis no momento." },
];

export function Benefits() {
  return (
    <section id="beneficios" className="bg-ink py-20 text-ink-foreground md:py-28">
      <div className="container mx-auto px-4">
        <span className="inline-flex items-center rounded-full bg-primary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">Benefícios</span>
        <h2 className="mt-8 max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Por que escolher a Util Locadora</h2>
        <p className="mt-5 max-w-2xl text-ink-foreground/65">Uma estrutura pensada para quem precisa do veículo como ferramenta de trabalho.</p>
        <div className="mt-12 grid gap-x-12 sm:grid-cols-2">
          {benefits.map((b) => (
            <div key={b.title} className="border-t border-white/15 py-6">
              <h3 className="font-display text-lg font-bold">{b.title}</h3>
              <p className="mt-2 text-ink-foreground/60">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
