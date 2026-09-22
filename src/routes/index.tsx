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
    title: "UTIL LOCADORA | Carros para Motoristas de Aplicativo em Itu",
    meta: [
      {
        name: "description",
        content:
          "Locação de Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan para motoristas de aplicativo em Itu-SP e região. Consulte valores e disponibilidade.",
      },
      { property: "og:title", content: "UTIL LOCADORA | Veículos para Motoristas de App" },
      {
        property: "og:description",
        content:
          "Conheça a frota da UTIL LOCADORA e consulte valores, condições e disponibilidade em Itu e região.",
      },
      { property: "og:url", content: "https://utilrentcar.com.br/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "UTIL LOCADORA | Veículos para Motoristas de App" },
      {
        name: "twitter:description",
        content:
          "Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan para motoristas de aplicativo em Itu e região.",
      },
    ],
    links: [{ rel: "canonical", href: "https://utilrentcar.com.br/" }],
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
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Modelos para trabalhar com conforto e praticidade
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan. Consulte os veículos disponíveis, os valores atuais e as condições de locação.
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
