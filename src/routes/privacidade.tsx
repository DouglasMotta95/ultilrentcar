import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCompanyInfo } from "@/hooks/use-company-info";

export const Route = createFileRoute("/privacidade")({
  component: PrivacyPage,
  head: () => ({
    title: "Política de Privacidade | UTIL LOCADORA",
    meta: [
      { name: "description", content: "Política de Privacidade da UTIL LOCADORA: informações sobre coleta, uso, armazenamento, compartilhamento e direitos relacionados aos dados pessoais." },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://utilrentcar.com.br/privacidade" }],
  }),
});

function PrivacyPage() {
  const { data: company } = useCompanyInfo();
  return (
    <main className="min-h-screen bg-background pt-28">
      <Navbar />
      <article className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <span className="eyebrow">Privacidade e proteção de dados</span>
        <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Política de Privacidade</h1>
        <p className="mt-4 text-sm text-muted-foreground">Última atualização: setembro de 2026</p>
        <div className="mt-10 space-y-8 text-base leading-relaxed text-muted-foreground">
          <section><h2 className="font-display text-xl font-bold text-foreground">1. Quem trata os dados</h2><p className="mt-3">A UTIL LOCADORA é responsável pelo tratamento dos dados pessoais enviados por meio deste site para atendimento, análise de solicitações de locação e continuidade do processo de contratação, conforme as condições aplicáveis a cada caso.</p></section>
          <section><h2 className="font-display text-xl font-bold text-foreground">2. Quais dados podem ser coletados</h2><p className="mt-3">O cadastro pode solicitar nome completo, CPF, data de nascimento, telefone, e-mail, CEP, endereço, profissão, plataforma de trabalho, telefones de referência e veículo de interesse. O envio de dados deve ficar limitado às informações necessárias para a finalidade informada.</p></section>
          <section><h2 className="font-display text-xl font-bold text-foreground">3. Finalidades e bases legais</h2><p className="mt-3">Os dados podem ser tratados para responder ao contato, analisar uma solicitação de locação, confirmar informações, realizar procedimentos pré-contratuais e cumprir obrigações legais ou contratuais. Quando o tratamento depender de consentimento, o site solicita uma autorização específica antes do envio do cadastro.</p></section>
          <section><h2 className="font-display text-xl font-bold text-foreground">4. Armazenamento e acesso</h2><p className="mt-3">As informações são armazenadas nos serviços utilizados para operar o sistema. O acesso administrativo aos cadastros é restrito por permissões configuradas para usuários autorizados. Medidas técnicas e administrativas são adotadas para reduzir riscos de acesso, alteração, divulgação ou destruição não autorizados.</p></section>
          <section><h2 className="font-display text-xl font-bold text-foreground">5. Compartilhamento e operadores</h2><p className="mt-3">Os dados não são utilizados para venda ou comercialização de listas. O compartilhamento pode ocorrer com fornecedores técnicos que atuem na operação do site, armazenamento, comunicação ou atendimento, somente na medida necessária à prestação desses serviços, ou quando exigido por lei.</p></section>
          <section><h2 className="font-display text-xl font-bold text-foreground">6. Retenção e eliminação</h2><p className="mt-3">Os dados são mantidos pelo período necessário às finalidades do atendimento e, quando houver contratação ou obrigação legal, pelos prazos necessários para cumprir deveres legais, regulatórios, contratuais ou para exercício regular de direitos. Depois disso, poderão ser eliminados, anonimizados ou mantidos quando houver fundamento legal para sua conservação.</p></section>
          <section><h2 className="font-display text-xl font-bold text-foreground">7. Direitos do titular</h2><p className="mt-3">Conforme a legislação aplicável, o titular pode solicitar confirmação da existência de tratamento, acesso aos dados, correção de informações incompletas ou desatualizadas, informações sobre compartilhamento, anonimização, bloqueio ou eliminação quando cabível, portabilidade e revogação do consentimento, observadas as hipóteses e limitações previstas em lei.</p></section>
          <section><h2 className="font-display text-xl font-bold text-foreground">8. Cookies e tecnologias semelhantes</h2><p className="mt-3">O funcionamento do site pode envolver tecnologias técnicas necessárias para carregar páginas, fontes, recursos de segurança e serviços essenciais. Caso sejam adicionadas tecnologias não essenciais que realizem medição, publicidade ou personalização, as informações e eventuais mecanismos de escolha serão atualizados nesta política.</p></section>
          <section><h2 className="font-display text-xl font-bold text-foreground">9. Segurança</h2><p className="mt-3">Nenhum ambiente digital é completamente livre de riscos. A UTIL LOCADORA busca aplicar controles técnicos e administrativos compatíveis com a operação para proteger os dados contra incidentes e acessos não autorizados.</p></section>
          <section><h2 className="font-display text-xl font-bold text-foreground">10. Atendimento sobre privacidade</h2><p className="mt-3">Para exercer direitos, esclarecer dúvidas ou solicitar informações sobre o tratamento de dados, utilize o canal de contato da locadora:{company.email ? <> <a className="font-semibold text-primary underline underline-offset-2" href={`mailto:${company.email}`}>{company.email}</a></> : " os canais de atendimento informados no site"}.</p><p className="mt-3">Solicitações podem exigir confirmação da identidade do titular para proteger informações pessoais e evitar acesso indevido por terceiros.</p></section>
          <section className="rounded-3xl border border-border bg-secondary/40 p-6"><h2 className="font-display text-xl font-bold text-foreground">Transparência</h2><p className="mt-3">Esta política pode ser atualizada para refletir mudanças no site, nos processos de atendimento ou na legislação aplicável. A versão vigente será publicada nesta página com a respectiva data de atualização.</p></section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
