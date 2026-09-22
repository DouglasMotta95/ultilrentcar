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
    <section id="contato" className="bg-surface py-20 md:py-28">
      <div className="container mx-auto px-4">
        <span className="eyebrow">Contato</span>
        <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Solicite seu orçamento agora
        </h2>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Atendimento sem compromisso. Envie uma mensagem e consulte as condições atualizadas da frota disponível.
        </p>

        <div className="mt-10 space-y-4">
          {infos.map(({ icon: Icon, label, href }) => {
            const content = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-base text-foreground">{label}</span>
              </>
            );

            return href ? (
              <a key={label} href={href} className="soft-card flex items-center gap-5 px-6 py-4 transition hover:-translate-y-0.5 hover:shadow-md">
                {content}
              </a>
            ) : (
              <div key={label} className="soft-card flex items-center gap-5 px-6 py-4">
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl(company.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95"
          >
            <MessageCircle className="h-5 w-5" /> Falar no WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
          {phoneHref && (
            <a href={phoneHref} className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-3.5 font-semibold text-foreground transition hover:bg-secondary">
              Ligar agora
            </a>
          )}
        </div>

        {mapUrl && (
          <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-lg">
            <iframe
              title="Localização da UTIL LOCADORA"
              src={mapUrl}
              loading="lazy"
              className="h-[320px] w-full border-0 md:h-[420px]"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </section>
  );
}
