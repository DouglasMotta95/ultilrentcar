import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

export function Contact() {
  const { data: company } = useCompanyInfo();
  const phoneHref = company.phone ? `tel:${company.phone.replace(/\D/g, "")}` : null;
  const location = company.address || [company.city, company.state].filter(Boolean).join(" — ");

  const infos = [
    company.phone ? { icon: Phone, label: company.phone, href: phoneHref } : null,
    company.email ? { icon: Mail, label: company.email, href: `mailto:${company.email}` } : null,
    location ? { icon: MapPin, label: location, href: null } : null,
    company.hours ? { icon: Clock, label: company.hours, href: null } : null,
  ].filter(Boolean) as Array<{ icon: typeof Phone; label: string; href: string | null }>;

  const defaultMap = company.city
    ? `https://www.google.com/maps?q=${encodeURIComponent([company.address, company.city, company.state, "Brasil"].filter(Boolean).join(", "))}&output=embed`
    : null;
  const mapUrl = company.map_embed_url || defaultMap;

  return (
    <section id="contato" className="section-section bg-surface">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="rounded-[2rem] bg-ink p-8 text-ink-foreground shadow-xl md:p-10">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/80">
              Contato
            </span>
            <h2 className="mt-7 font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl">
              Vamos encontrar a melhor opção para sua rotina.
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-white/65">
              Fale com a equipe, consulte os veículos disponíveis e tire suas dúvidas antes de fazer o cadastro.
            </p>

            <div className="mt-9 space-y-4">
              {infos.map(({ icon: Icon, label, href }) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-white/85">{label}</span>
                  </>
                );

                return href ? (
                  <a key={label} href={href} className="flex items-center gap-4 transition hover:text-white">
                    {content}
                  </a>
                ) : (
                  <div key={label} className="flex items-center gap-4">
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl(company.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground transition hover:brightness-95"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/cadastro"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Fazer cadastro
              </a>
            </div>
          </div>

          <div className="flex min-h-full flex-col justify-end">
            <div>
              <span className="eyebrow">Onde estamos</span>
              <h3 className="mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                Atendimento em Itu e região.
              </h3>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Consulte a disponibilidade e as condições atuais diretamente com a locadora.
              </p>
            </div>

            {mapUrl && (
              <div className="mt-9 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg">
                <iframe
                  title="Localização da UTIL LOCADORA"
                  src={mapUrl}
                  loading="lazy"
                  className="h-[300px] w-full border-0 md:h-[390px]"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
