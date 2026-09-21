import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadForm } from "@/components/sections/lead-form";

export const Route = createFileRoute("/cadastro")({
  component: Cadastro,
  head: () => ({
    title: "Cadastro | UTIL LOCADORA",
    meta: [
      { name: "description", content: "Faça seu cadastro online na UTIL LOCADORA e envie sua solicitação de locação." },
    ],
  }),
});

function Cadastro() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <Navbar />
      <div className="container mx-auto max-w-4xl px-4">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-xl md:p-12">
          <h1 className="mb-8 text-3xl font-bold">Faça seu cadastro</h1>
          <p className="mb-8 text-muted-foreground">
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
