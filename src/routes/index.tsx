import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Benefits } from "@/components/sections/benefits";
import { VehicleCatalog } from "@/components/sections/vehicle-catalog";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    title: "Util Rent Car | Locadora de Veículos para Motoristas de App",
    meta: [
      {
        name: "description",
        content:
          "Locação de veículos em Itu-SP para motoristas de Uber, 99 e InDriver. Frota revisada, seguro 24h, pagamento semanal e liberação rápida.",
      },
      { property: "og:title", content: "Util Rent Car - Locadora de Veículos" },
      {
        property: "og:description",
        content:
          "Aluguel de carros para motoristas de aplicativo com seguro 24h, frota revisada e suporte de verdade.",
      },
    ],
  }),
});

function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <Benefits />

      <section id="frota" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <span className="eyebrow">Nossa frota</span>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Carros populares, econômicos e prontos para rodar
          </h2>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Trabalhamos com os modelos nacionais mais rentáveis para motoristas de aplicativo.
            Consulte a disponibilidade do dia.
          </p>

          <div className="mt-12">
            <Suspense
              fallback={<p className="py-12 text-center text-muted-foreground">Carregando frota...</p>}
            >
              <VehicleCatalog />
            </Suspense>
          </div>
        </div>
      </section>

      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
      <WhatsappButton />
    </main>
  );
}
