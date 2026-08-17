const nav = [
  { href: "#quem-somos", label: "Quem somos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#frota", label: "Nossa frota" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="bg-ink py-16 text-ink-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white/90 border-b-primary text-primary">
                <span className="font-display text-[0.7rem] font-extrabold">UTIL</span>
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight">UTIL RENT CAR</span>
            </div>
            <p className="mt-6 max-w-xs leading-relaxed text-ink-foreground/60">
              Locação de veículos para motoristas de aplicativo em Itu e região. Frota revisada,
              seguro 24h e o melhor custo-benefício.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em]">Navegação</h3>
            <ul className="mt-6 space-y-4">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink-foreground/60 transition hover:text-ink-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em]">Contato</h3>
            <ul className="mt-6 space-y-4 text-ink-foreground/60">
              <li>(11) 94722-9449</li>
              <li>utillocadora@gmail.com</li>
              <li>Itu — São Paulo</li>
              <li>Segunda a sábado, 09h às 18h</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-ink-foreground/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Util Locadora de Veículos. Todos os direitos reservados.</p>
          <p>CNH com EAR obrigatória para locação.</p>
        </div>
      </div>
    </footer>
  );
}
