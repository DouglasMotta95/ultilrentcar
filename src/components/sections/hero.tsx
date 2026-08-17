import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, Calendar, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-primary/10 rounded-l-[200px] hidden lg:block blur-3xl opacity-50" />
      <div className="absolute top-1/4 -left-20 -z-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              <span>Locação de carros para aplicativos</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              A liberdade que você precisa para <span className="text-primary">ganhar mais</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Alugue seu carro com a Util Locadora e tenha toda a estrutura necessária para rodar na Uber, 99 e inDrive com segurança e lucratividade.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8" asChild>
                <Link to="/cadastro">QUERO ALUGAR UM CARRO</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8" asChild>
                <a href="https://wa.me/5511947265882" target="_blank" rel="noopener noreferrer">FALAR COM A LOCADORA</a>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-base font-semibold text-foreground bg-card/50 px-4 py-3 rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span>7.000 km mensais inclusos</span>
              </div>
              <div className="flex items-center gap-3 text-base font-semibold text-foreground bg-card/50 px-4 py-3 rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                <span>Seguro total e assistência 24h</span>
              </div>
              <div className="flex items-center gap-3 text-base font-semibold text-foreground bg-card/50 px-4 py-3 rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
                <Calendar className="w-6 h-6 text-primary shrink-0" />
                <span>Manutenção preventiva inclusa</span>
              </div>
              <div className="flex items-center gap-3 text-base font-bold text-primary bg-primary/10 px-4 py-3 rounded-2xl border border-primary/20 shadow-xl backdrop-blur-sm">
                <Zap className="w-6 h-6 shrink-0" />
                <span>R$ 750,00 por semana</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative animate-in fade-in slide-in-from-right duration-700 delay-200">
            {/* Image Placeholder - Will be replaced by real vehicle photo */}
            <div className="relative z-10 w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)] bg-card border border-white/20 group">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000" 
                alt="Toyota Corolla Cross - Premium Fleet" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent flex items-end p-8">
                <div className="text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-1">Destaque da Semana</p>
                  <p className="text-3xl font-bold text-foreground">SUV Premium 2025</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
