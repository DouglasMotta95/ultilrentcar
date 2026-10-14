const benefits = [
  {
    title: "Fotos externas de referência",
    description: "Compare o formato dos modelos. Ano, versão e equipamentos são confirmados com a locadora.",
  },
  {
    title: "Consulta por modelo",
    description: "O botão de cada veículo abre o WhatsApp com o modelo de interesse já informado.",
  },
  {
    title: "Cadastro em etapas",
    description: "Envie a solicitação online para análise inicial antes de seguir para a contratação.",
  },
  {
    title: "Condições antes de fechar",
    description: "Confirme preço, disponibilidade, caução e regras de locação diretamente com a equipe.",
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="section-section bg-ink text-ink-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/80">
              Diferenciais
            </span>
            <h2 className="mt-7 max-w-xl font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Menos complicação. Mais clareza para começar.
            </h2>
          </div>

          <div className="grid border-t border-white/15 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="border-b border-white/15 py-7 sm:px-7 sm:odd:border-r">
                <h3 className="font-display text-xl font-bold">{benefit.title}</h3>
                <p className="mt-3 max-w-sm leading-7 text-white/60">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
