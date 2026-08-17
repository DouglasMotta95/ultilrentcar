const benefits = [
  { title: "Pagamento semanal", description: "Caução somente na retirada do veículo." },
  { title: "Processo rápido", description: "Aprovação e liberação no mesmo dia em muitos casos." },
  { title: "Veículos revisados", description: "Manutenção preventiva e itens de segurança em dia." },
  { title: "Suporte de verdade", description: "Equipe disponível para resolver, não para enrolar." },
  { title: "Excelente economia", description: "Carros 1.0 econômicos, feitos para render mais por litro." },
  { title: "Frota moderna", description: "Modelos populares atuais, aceitos pelas plataformas." },
  { title: "Atendimento humanizado", description: "Você fala com gente que entende da rotina do app." },
  { title: "Prontos para rodar", description: "Documentação regular e cadastro sem dor de cabeça." },
];

export function Benefits() {
  return (
    <section id="beneficios" className="bg-ink py-20 text-ink-foreground md:py-28">
      <div className="container mx-auto px-4">
        <span className="inline-flex items-center rounded-full bg-primary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
          Benefícios
        </span>

        <h2 className="mt-8 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Motivos para alugar com a Util
        </h2>

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
