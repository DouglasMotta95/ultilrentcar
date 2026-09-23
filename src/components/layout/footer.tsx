import { useCompanyInfo } from "@/hooks/use-company-info";

const nav = [
  { href: "/#quem-somos", label: "Quem somos" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#frota", label: "Nossa frota" },
  { href: "/#duvidas", label: "Dúvidas" },
  { href: "/#contato", label: "Contato" },
];

export function Footer() {
  const { data: company } = useCompanyInfo();
  const logoSrc = "/logo-util-rent.svg";
  const phoneHref = company.phone ? `tel:${company.phone.replace(/\D/g, "")}` : null;

  return (
    <footer className="bg-ink py-16 text-ink-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt="UTIL rent a car — Locadora de veículos" className="h-14 w-auto max-w-[300px] object-contain object-left" />
            </div>
            <p className="mt-6 max-w-xs leading-relaxed text-ink-foreground/60">
              Locação de veículos para motoristas de aplicativo em Itu e região.
            </p>

            {(company.instagram_url || company.facebook_url) && (
              <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
                {company.instagram_url && (
                  <a href={company.instagram_url} target="_blank" rel="noopener noreferrer" className="text-ink-foreground/70 transition hover:text-ink-foreground">
                    Instagram
                  </a>
                )}
                {company.facebook_url && (
                  <a href={company.facebook_url} target="_blank" rel="noopener noreferrer" className="text-ink-foreground/70 transition hover:text-ink-foreground">
                    Facebook
                  </a>
                )}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em]">Navegação</h3>
            <ul className="mt-6 space-y-4">
              {nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-ink-foreground/60 transition hover:text-ink-foreground">{link.label}</a>
                </li>
              ))}
              <li>
                <a href="/privacidade" className="text-ink-foreground/60 transition hover:text-ink-foreground">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em]">Contato</h3>
            <ul className="mt-6 space-y-4 text-ink-foreground/60">
              {company.phone && <li>{phoneHref ? <a href={phoneHref} className="transition hover:text-ink-foreground">{company.phone}</a> : company.phone}</li>}
              {company.email && <li><a href={`mailto:${company.email}`} className="transition hover:text-ink-foreground">{company.email}</a></li>}
              <li>{company.address || [company.city, company.state].filter(Boolean).join(" — ")}</li>
              {company.hours && <li>{company.hours}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-ink-foreground/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {company.name}. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="/privacidade" className="transition hover:text-ink-foreground">Privacidade</a>
            <span>Consulte os requisitos e condições para locação.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
