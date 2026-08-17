import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Conditions } from "@/components/sections/conditions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    title: "UT Locadora | Aluguel de Carros para Aplicativos",
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
      <Conditions />
      
      {/* Footer Placeholder */}
      <footer className="bg-foreground text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-60">© 2026 UT Locadora. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
