import { createFileRoute, Link } from '@tanstack/react-router';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Car, Users, Settings, Database } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Painel Administrativo</h1>
          <p className="text-slate-500">Gerencie sua frota, leads e informações da empresa.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AdminCard 
            title="Frota" 
            description="Gerenciar veículos da locadora" 
            icon={Car} 
            href="/admin/veiculos" 
          />
          <AdminCard 
            title="Leads" 
            description="Candidatos e solicitações" 
            icon={Users} 
            href="/admin/leads" 
          />
          <AdminCard 
            title="Dados Empresa" 
            description="Informações institucionais" 
            icon={Database} 
            href="/admin/configuracoes" 
          />
          <AdminCard 
            title="Segurança" 
            description="Acessos e permissões" 
            icon={Settings} 
            href="/admin/seguranca" 
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}

function AdminCard({ title, description, icon: Icon, href }: { title: string, description: string, icon: any, href: string }) {
  return (
    <Link 
      to={href}
      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-cyan-200"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </Link>
  );
}
