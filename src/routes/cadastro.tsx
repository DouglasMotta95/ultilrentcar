import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadForm } from "@/components/sections/lead-form";

export const Route = createFileRoute("/cadastro")({
  component: Cadastro,
  head: () => ({
    title: "Cadastro | UTIL LOCADORA",
    meta: [
      {
        name: "description",
        content:
          "Faça seu cadastro online na UTIL LOCADORA e envie sua solicitação de locação.",
      },
      { name: "robots", content: "noindex,follow" },
    ],
    links: [{ rel: "canonical", href: "https://utilrentcar.com.br/cadastro" }],
  }),
});

function Cadastro() {
  const { data: company } = useCompanyInfo();

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16">
            <aside className="lg:sticky lg:top-28">
              <span className="eyebrow">Cadastro</span>
              <h1 className="mt-7 max-w-xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                Vamos começar sua solicitação de locação.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                Preencha seus dados para iniciar a análise. A equipe entra em contato para orientar sobre disponibilidade, valores e próximos passos.
              </p>

              <div className="mt-9 space-y-4">
                {[
                  "Cadastro organizado em 3 etapas",
                  "Dados tratados conforme a Política de Privacidade",
                  "Análise inicial antes da contratação",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-semibold leading-6 text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={whatsappUrl(company.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center gap-2 font-bold text-primary transition hover:gap-3"
              >
                <MessageCircle className="h-5 w-5" />
                Prefere falar primeiro?
                <ArrowRight className="h-4 w-4" />
              </a>
            </aside>

            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-xl sm:p-8 md:p-10">
              <div className="mb-8 border-b border-border pb-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-primary">
                  Solicitação de locação
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                  Seus dados
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Informe os dados solicitados e avance pelas etapas do cadastro.
                </p>
              </div>

              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
