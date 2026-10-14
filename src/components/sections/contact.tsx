import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

export function Contact() {
  const { data: company } = useCompanyInfo();
  const phoneHref = company.phone ? `tel:${company.phone.replace(/\D/g, "")}` : null;
  const location = company.address || [company.city, company.state].filter(Boolean).join(" — ");

  const infos = [
    company.phone ? { icon: Phone, label: company.phone, href: phoneHref } : null,
    { icon: Mail, label: "comercial@utilrentcar.com.br", href: "mailto:comercial@utilrentcar.com.br" },
    location ? { icon: MapPin, label: location, href: null } : null,
    company.hours ? { icon: Clock, label: company.hours, href: null } : null,
  ].filter(Boolean) as Array<{ icon: typeof Phone; label: string; href: string | null }>;

  // Só incorporamos um mapa quando houver endereço exato ou URL de mapa
  // cadastrada. Exibir apenas "Itu - SP" no mapa poderia sugerir um endereço incorreto.
  const defaultMap =
    company.address?.trim() && company.city
      ? `https://www.google.com/maps?q=${encodeURIComponent(
          [company.address, company.city, company.state, "Brasil"].filter(Boolean).join(", "),
        )}&output=embed`
      : null;
  const hasExactAddress = Boolean(company.address?.trim() && company.city?.trim());
  // Prioriza o endereço confirmado para não reutilizar um mapa antigo que só aponta para a cidade.
  const mapUrl = hasExactAddress ? defaultMap : null;

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

            {mapUrl ? (
              <div className="mt-9 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg">
                <iframe
                  title="Localização da UTIL Rent a Car"
                  src={mapUrl}
                  loading="lazy"
                  className="h-[300px] w-full border-0 md:h-[390px]"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="mt-9 flex min-h-[300px] flex-col justify-center rounded-[2rem] border border-border bg-white p-7 shadow-lg md:min-h-[390px] md:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-primary">
                  <MapPin className="h-6 w-6" />
                </span>
                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-sky-700">
                  Área de atendimento
                </p>
                <h4 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Itu e região
                </h4>
                <p className="mt-3 max-w-lg leading-7 text-muted-foreground">
                  Consulte a equipe para confirmar o endereço de atendimento, a disponibilidade e o local de retirada do veículo.
                </p>
                <a
                  href={whatsappUrl(company.whatsapp, "Olá! Poderia me informar o endereço de atendimento e o local de retirada dos veículos?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground transition hover:brightness-95"
                >
                  Consultar endereço
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
