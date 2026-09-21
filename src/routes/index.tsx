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
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    title: "UTIL LOCADORA | Veículos 2025+ para Motoristas de Aplicativo em Itu",
    meta: [
      {
        name: "description",
        content:
          "Locação de veículos 2025 e mais novos em Itu-SP para motoristas de aplicativo. Consulte a frota, disponibilidade e condições diretamente com a UTIL LOCADORA.",
      },
      { property: "og:title", content: "UTIL LOCADORA | Frota 2025+ para Motoristas de App" },
      {
        property: "og:description",
        content:
          "Conheça a frota disponível e consulte as condições atualizadas para locação em Itu e região.",
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
          <span className="eyebrow">Frota 2025+</span>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Veículos novos e preparados para a sua rotina
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Consulte os modelos disponíveis no momento. Fotos, valores e disponibilidade são atualizados pela própria locadora no painel administrativo.
          </p>

          <div className="mt-12">
            <Suspense fallback={<p className="py-12 text-center text-muted-foreground">Carregando frota...</p>}>
              <VehicleCatalog />
            </Suspense>
          </div>
        </div>
      </section>

      <Faq />
      <Contact />
      <Footer />
      <WhatsappButton />
    </main>
  );
}
