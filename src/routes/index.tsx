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
    title: "UTIL LOCADORA | Locação de veículos para motoristas de aplicativo",
    meta: [
      {
        name: "description",
        content:
          "Locação de veículos para motoristas de aplicativo em Itu e região. Conheça a frota da UTIL LOCADORA, consulte condições e faça seu cadastro.",
      },
      {
        name: "keywords",
        content:
          "locação de veículos Itu, locadora de veículos Itu, carro para aplicativo, aluguel semanal, Polo Track, HB20, Onix Plus",
      },
      {
        property: "og:title",
        content: "UTIL LOCADORA | Locação de veículos para motoristas de aplicativo",
      },
      {
        property: "og:description",
        content:
          "Frota objetiva, atendimento direto e condições claras para locação em Itu e região.",
      },
      { property: "og:url", content: "https://utilrentcar.com.br/" },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://utilrentcar.com.br/logo-util-rent.svg",
      },
      {
        name: "twitter:title",
        content: "UTIL LOCADORA | Locação de veículos para motoristas de aplicativo",
      },
      {
        name: "twitter:description",
        content:
          "Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan. Consulte disponibilidade e condições.",
      },
    ],
    links: [{ rel: "canonical", href: "https://utilrentcar.com.br/" }],
  }),
});

function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "UTIL LOCADORA",
    url: "https://utilrentcar.com.br/",
    telephone: "+55 11 94722-9449",
    email: "utillocadora@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Itu",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: ["Itu", "Salto", "Indaiatuba", "Sorocaba"],
    priceRange: "$",
    description: "Locação de veículos para motoristas de aplicativo em Itu e região.",
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <Hero />
      <About />
      <Services />

      <section id="frota" className="section-section scroll-mt-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow">Nossa frota</span>
              <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                Escolha o modelo que combina com o seu dia a dia.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Fotos em destaque, identificação clara do modelo e acesso direto à consulta de disponibilidade.
            </p>
          </div>

          <div className="mt-12">
            <Suspense
              fallback={
                <div className="rounded-[2rem] border border-border bg-secondary/50 py-16 text-center text-muted-foreground">
                  Carregando frota...
                </div>
              }
            >
              <VehicleCatalog />
            </Suspense>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Benefits />
      <Faq />
      <Contact />
      <Footer />
      <WhatsappButton />
    </main>
  );
}
