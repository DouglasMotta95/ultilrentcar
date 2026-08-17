import { Shield, Settings, Clock, CheckCircle, CreditCard, XCircle } from "lucide-react";

export function Conditions() {
  const conditions = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Valor Semanal",
      description: "A partir de R$ 750,00 por semana, dependendo do veículo escolhido.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Seguro Completo",
      description: "Proteção contra roubo, furto e perda total inclusa em todos os contratos.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Franquia",
      description: "Apenas 8% da tabela FIPE, variando conforme o veículo locado.",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Caução Facilitado",
      description: "A partir de R$ 1.500,00, devolvido 30 dias após o fim do contrato.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Km Inclusa",
      description: "Franquia generosa de 7.000 km mensais para você rodar tranquilo.",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Manutenção",
      description: "Preventiva por conta da Util Locadora. Corretiva só em caso de mau uso.",
    },
  ];

  return (
    <section className="py-24 bg-background relative" id="condicoes">
      <div className="absolute inset-0 bg-primary/5 skew-y-3 origin-left -z-10" />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Condições de Locação Transparentes</h2>
          <p className="text-muted-foreground text-lg">
            Na Util Locadora, acreditamos na transparência. Veja as principais condições para alugar seu veículo hoje mesmo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conditions.map((item, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-3xl shadow-xl border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Pronto para começar?</h3>
            <p className="text-white/80">Faça seu cadastro online e aguarde nossa análise em até 24h.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-white/90 transition-colors">
              INICIAR CADASTRO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
