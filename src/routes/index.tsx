import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Conditions } from "@/components/sections/conditions";
import { VehicleCatalog } from "@/components/sections/vehicle-catalog";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    title: "Util Locadora | Aluguel de Carros para Aplicativos",
    meta: [
      { name: "description", content: "Locação de veículos para motoristas Uber, 99 e inDrive. A partir de R$ 750,00 por semana. 7.000 km inclusos, seguro e manutenção." },
      { property: "og:title", content: "UT Locadora - Ganhe mais com o carro certo" },
      { property: "og:description", content: "Aluguel simplificado de carros para motoristas profissionais." },
    ]
  })
});

function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section className="py-24 bg-background relative" id="veiculos">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-right -z-10" />
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-tighter">Nossa Frota</h2>
            <p className="text-muted-foreground text-lg">
              Veículos revisados e prontos para você começar a faturar hoje mesmo.
            </p>
          </div>
          <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Carregando frota...</div>}>
            <VehicleCatalog />
          </Suspense>
        </div>
      </section>

      <Conditions />
      <HowItWorks />
      
      <Footer />
    </main>
  );
}
