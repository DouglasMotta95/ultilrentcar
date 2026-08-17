import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadForm } from "@/components/sections/lead-form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cadastro")({
  component: Cadastro,
  head: () => ({
    title: "Cadastro | UT Locadora",
    meta: [
      { name: "description", content: "Faça seu cadastro online na UT Locadora e comece a rodar." },
    ]
  })
});

function Cadastro() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <Navbar />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-border">
          <h1 className="text-3xl font-bold mb-8">Faça seu Cadastro</h1>
          <p className="text-muted-foreground mb-8">
            Preencha o formulário abaixo para iniciar sua solicitação de locação.
          </p>
          
          <div className="mt-8">
            <LeadForm />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
