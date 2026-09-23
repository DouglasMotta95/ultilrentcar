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
    title: "UTIL LOCADORA | Aluguel de carros em Itu e região",
    meta: [
      { name: "description", content: "Aluguel de Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan para motoristas de aplicativo em Itu e região. Consulte valores, disponibilidade e condições." },
      { name: "keywords", content: "aluguel de carros Itu, locadora de veículos Itu, carro para aplicativo, aluguel semanal, Polo Track, HB20, Onix Plus" },
      { property: "og:title", content: "UTIL LOCADORA | Aluguel de carros em Itu e região" },
      { property: "og:description", content: "Frota selecionada, atendimento direto e condições claras para locação de veículos em Itu e região." },
      { property: "og:url", content: "https://utilrentcar.com.br/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://utilrentcar.com.br/logo-util-rent.svg" },
      { name: "twitter:title", content: "UTIL LOCADORA | Aluguel de carros em Itu e região" },
      { name: "twitter:description", content: "Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan. Consulte disponibilidade e condições de locação." },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar /><Hero /><About /><Services /><HowItWorks /><Benefits />
      <section id="frota" className="scroll-mt-24 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <span className="eyebrow">Nossa frota</span>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Modelos para trabalhar com conforto e praticidade</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan. Consulte os veículos disponíveis, os valores atuais e as condições de locação.</p>
          <div className="mt-12"><Suspense fallback={<p className="py-12 text-center text-muted-foreground" aria-live="polite">Carregando frota...</p>}><VehicleCatalog /></Suspense></div>
        </div>
      </section>
      <Faq /><Contact /><Footer /><WhatsappButton />
    </main>
  );
}
