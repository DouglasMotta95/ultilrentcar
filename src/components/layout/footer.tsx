import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

const nav = [
  { href: "/#inicio", label: "Início" },
  { href: "/#quem-somos", label: "Sobre a UTIL" },
  { href: "/#frota", label: "Nossa frota" },
  { href: "/#servicos", label: "Locação" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#contato", label: "Contato" },
];

export function Footer() {
  const { data: company } = useCompanyInfo();
  const phoneDigits = (company.phone || "").replace(/[^0-9]/g, "");
  const location = company.address || [company.city, company.state].filter(Boolean).join(" — ");

  return (
    <footer id="rodape" className="bg-ink text-ink-foreground">
      <div className="container mx-auto max-w-[1320px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 border-b border-ink-foreground/10 pb-10 md:grid-cols-[1.15fr_0.8fr_1fr] md:gap-8 lg:gap-14">
          <div>
            <div className="inline-flex rounded-xl bg-white p-2 shadow-sm">
              <img src="/logo-util-rent.svg" alt="UTIL Rent a Car" width={1048} height={730} className="h-[76px] w-[142px] object-contain sm:h-[84px] sm:w-[158px]" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-ink-foreground/70">
              Locação de veículos para motoristas de aplicativo em Itu e região.
            </p>
            <a href={whatsappUrl(company.whatsapp, "Olá! Gostaria de consultar a disponibilidade dos veículos da UTIL Rent a Car.")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-white transition hover:brightness-95">
              <MessageCircle className="h-4 w-4" /> Falar pelo WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink-foreground/85">Navegação</h3>
            <nav aria-label="Links do rodapé" className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
              {nav.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-medium text-ink-foreground/65 transition hover:text-white">
                  {link.label}
                </a>
              ))}
              <a href="/privacidade" className="text-sm font-medium text-ink-foreground/65 transition hover:text-white">Política de Privacidade</a>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink-foreground/85">Atendimento</h3>
            <div className="mt-5 space-y-4 text-sm text-ink-foreground/70">
              {company.phone && (
                <a href={phoneDigits ? "tel:" + phoneDigits : undefined} className="flex items-start gap-3 transition hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" /><span>{company.phone}</span>
                </a>
              )}
              {company.email && (
                <a href={"mailto:" + company.email} className="flex items-start gap-3 break-words transition hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" /><span>{company.email}</span>
                </a>
              )}
              {location && (
                <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" /><span>{location}</span></div>
              )}
              {company.hours && (
                <div className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" /><span>{company.hours}</span></div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs leading-5 text-ink-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 UTIL Rent a Car. Todos os direitos reservados.</p>
          <p>Locação sujeita à análise e às condições vigentes.</p>
        </div>
      </div>
    </footer>
  );
}
