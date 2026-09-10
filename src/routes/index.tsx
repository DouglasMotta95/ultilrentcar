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
    title: "Util Locadora | Sedãs 2025+ para Motoristas de Aplicativo em Itu",
    meta: [
      {
        name: "description",
        content:
          "Locação de sedãs 2025 e mais novos em Itu-SP para motoristas de aplicativo. Frota nova, revisada, manutenção pela locadora e contratação simplificada.",
      },
      { property: "og:title", content: "Util Locadora | Sedãs 2025+ para Motoristas de App" },
      {
        property: "og:description",
        content:
          "Frota de sedãs 2025 e mais novos para quem busca conforto, qualidade e melhores oportunidades nos aplicativos.",
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
            Sedãs novos, confortáveis e preparados para o seu trabalho
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A Util Locadora trabalha com sedãs ano 2025 ou mais novos, ideais para motoristas que valorizam conforto, apresentação e categorias superiores nos aplicativos. Consulte os modelos disponíveis no momento.
          </p>

          <div className="mt-12">
            <Suspense fallback={<p className="py-12 text-center text-muted-foreground">Carregando frota...</p>}>
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
