import { useCompanyInfo } from "@/hooks/use-company-info";
import logo from "@/assets/util-logo-original.jpg.asset.json";

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
        <div className="grid gap-10 border-b border-ink-foreground/10 pb-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <img
              src={logo.url}
              alt="UTIL rent a car — Locadora de veículos"
              className="h-[98px] w-[148px] rounded-md bg-background p-2 object-contain"
            />
            <p className="mt-5 max-w-sm leading-7 text-ink-foreground/55">
              Locação de veículos para motoristas de aplicativo em Itu e região.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink-foreground/75">
              Navegação
            </h3>
            <nav className="mt-5 space-y-3">
              {nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-semibold text-ink-foreground/55 transition hover:text-ink-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/privacidade"
                className="block text-sm font-semibold text-ink-foreground/55 transition hover:text-ink-foreground"
              >
                Política de Privacidade
              </a>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink-foreground/75">
              Contato
            </h3>
            <div className="mt-5 space-y-3 text-sm text-ink-foreground/55">
              {company.phone && (
                <a
                  href={`tel:${company.phone.replace(/\D/g, "")}`}
                  className="block transition hover:text-ink-foreground"
                >
                  {company.phone}
                </a>
              )}
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="block break-words transition hover:text-ink-foreground"
                >
                  {company.email}
                </a>
              )}
              <p>{company.address || [company.city, company.state].filter(Boolean).join(" — ")}</p>
              {company.hours && <p>{company.hours}</p>}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-ink-foreground/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {company.name}. Todos os direitos reservados.</p>
          <p>Locação sujeita a análise e às condições vigentes.</p>
        </div>
      </div>
    </footer>
  );
}
