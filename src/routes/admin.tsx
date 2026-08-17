import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    // Para simplificar, vamos redirecionar para login se não houver sessão
    // Em um app real, verificaríamos o papel do usuário via context.supabase
    // redirect({ to: "/login" });
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-white/5 p-6 flex flex-col gap-8">
        <div className="text-xl font-extrabold tracking-tighter uppercase">
          Util <span className="text-primary">Admin</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-bold">
            Dashboard
          </div>
          <div className="px-4 py-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer text-muted-foreground">
            Leads / Cadastros
          </div>
          <div className="px-4 py-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer text-muted-foreground">
            Frota de Veículos
          </div>
          <div className="px-4 py-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer text-muted-foreground">
            Configurações
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold uppercase tracking-tighter">Visão Geral</h1>
          <div className="flex gap-4">
            <div className="bg-card border border-white/5 px-4 py-2 rounded-xl text-sm font-medium">
              Admin: utillocadora@gmail.com
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 rounded-3xl">
            <div className="text-muted-foreground text-sm font-medium mb-1">Total de Leads</div>
            <div className="text-4xl font-extrabold text-primary">0</div>
          </div>
          <div className="glass-card p-6 rounded-3xl">
            <div className="text-muted-foreground text-sm font-medium mb-1">Veículos Ativos</div>
            <div className="text-4xl font-extrabold text-primary">3</div>
          </div>
          <div className="glass-card p-6 rounded-3xl">
            <div className="text-muted-foreground text-sm font-medium mb-1">Contratos Ativos</div>
            <div className="text-4xl font-extrabold text-primary">0</div>
          </div>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-bold">Últimos Cadastros</h2>
            <button className="text-primary text-sm font-bold hover:underline">Ver todos</button>
          </div>
          <div className="p-12 text-center text-muted-foreground">
            Nenhum cadastro recebido até o momento.
          </div>
        </div>
      </main>
    </div>
  );
}
