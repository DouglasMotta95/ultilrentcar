import { useCompanyInfo } from "@/hooks/use-company-info";

const nav = [
  { href: "/#quem-somos", label: "Quem somos" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#frota", label: "Frota" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#contato", label: "Contato" },
];

export function Footer() {
  const { data: company } = useCompanyInfo();

  return (
    <footer className="bg-ink py-14 text-ink-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <img
              src="/logo-util-rent.svg"
              alt="UTIL rent a car — Locadora de veículos"
              className="h-12 w-auto max-w-[240px] object-contain object-left brightness-0 invert"
            />
            <p className="mt-5 max-w-sm leading-7 text-white/55">
              Locação de veículos para motoristas de aplicativo em Itu e região.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/75">
              Navegação
            </h3>
            <nav className="mt-5 space-y-3">
              {nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-semibold text-white/55 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/privacidade"
                className="block text-sm font-semibold text-white/55 transition hover:text-white"
              >
                Política de Privacidade
              </a>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/75">
              Contato
            </h3>
            <div className="mt-5 space-y-3 text-sm text-white/55">
              {company.phone && (
                <a
                  href={`tel:${company.phone.replace(/\D/g, "")}`}
                  className="block transition hover:text-white"
                >
                  {company.phone}
                </a>
              )}
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="block break-words transition hover:text-white"
                >
                  {company.email}
                </a>
              )}
              <p>{company.address || [company.city, company.state].filter(Boolean).join(" — ")}</p>
              {company.hours && <p>{company.hours}</p>}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {company.name}. Todos os direitos reservados.</p>
          <p>Locação sujeita a análise e às condições vigentes.</p>
        </div>
      </div>
    </footer>
  );
}
