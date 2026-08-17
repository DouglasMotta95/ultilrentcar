import { Phone, Mail, MapPin, Clock, ArrowRight, MessageCircle } from "lucide-react";

const infos = [
  { icon: Phone, label: "(11) 94722-9449" },
  { icon: Mail, label: "utillocadora@gmail.com" },
  { icon: MapPin, label: "Itu — São Paulo" },
  { icon: Clock, label: "Segunda a sábado, 09h às 18h" },
];

export function Contact() {
  return (
    <section id="contato" className="bg-surface py-20 md:py-28">
      <div className="container mx-auto px-4">
        <span className="eyebrow">Contato</span>

        <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Solicite seu orçamento agora
        </h2>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Atendimento rápido e sem compromisso. Envie uma mensagem e receba as condições atualizadas
          da frota disponível hoje.
        </p>

        <div className="mt-10 space-y-4">
          {infos.map(({ icon: Icon, label }) => (
            <div key={label} className="soft-card flex items-center gap-5 px-6 py-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-base text-foreground">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://wa.me/5511947229449"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-95"
          >
            <MessageCircle className="h-5 w-5" />
            Falar no WhatsApp
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="tel:+5511947229449"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-3.5 font-semibold text-foreground transition hover:bg-secondary"
          >
            Ligar agora
          </a>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-lg">
          <iframe
            title="Mapa de Itu - São Paulo"
            src="https://www.google.com/maps?q=Itu,+SP,+Brasil&output=embed"
            loading="lazy"
            className="h-[320px] w-full border-0 md:h-[420px]"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
