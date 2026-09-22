import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCompanyInfo } from "@/hooks/use-company-info";

export const Route = createFileRoute("/privacidade")({
  component: PrivacyPage,
  head: () => ({
    title: "Política de Privacidade | UTIL LOCADORA",
    meta: [
      {
        name: "description",
        content:
          "Saiba como a UTIL LOCADORA utiliza os dados enviados no formulário de solicitação de locação.",
      },
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
        <span className="eyebrow">Privacidade</span>
        <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Última atualização: setembro de 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Quais dados são enviados</h2>
            <p className="mt-3">
              Ao preencher o cadastro, você pode informar nome, CPF, data de nascimento, telefone,
              e-mail, endereço, profissão, plataforma de trabalho, telefones de referência e o veículo
              de interesse.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Para que os dados são utilizados</h2>
            <p className="mt-3">
              Os dados são utilizados para analisar a solicitação de locação, entrar em contato com o
              interessado, confirmar informações fornecidas e dar continuidade ao atendimento e à
              eventual contratação.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Armazenamento e acesso</h2>
            <p className="mt-3">
              As informações enviadas pelo site são armazenadas nos serviços utilizados para operar o
              sistema e ficam acessíveis somente a usuários autorizados da administração, conforme as
              permissões configuradas no painel.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Compartilhamento</h2>
            <p className="mt-3">
              A UTIL LOCADORA não utiliza os dados do cadastro para comercialização de listas. O
              compartilhamento pode ocorrer com fornecedores técnicos necessários para manter o site e
              o atendimento funcionando, ou quando houver obrigação legal aplicável.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Seus dados</h2>
            <p className="mt-3">
              Você pode entrar em contato para solicitar informações sobre os dados enviados, pedir
              correção de informações ou tratar de uma solicitação relacionada à privacidade, observadas
              as obrigações legais e contratuais aplicáveis.
            </p>
          </section>

          <section className="rounded-3xl border border-border bg-secondary/40 p-6">
            <h2 className="font-display text-xl font-bold text-foreground">Contato sobre privacidade</h2>
            <p className="mt-3">
              Para falar com a UTIL LOCADORA sobre esta política ou sobre seus dados, utilize
              {company.email ? (
                <>
                  {" "}o e-mail{" "}
                  <a className="font-semibold text-primary underline underline-offset-2" href={`mailto:${company.email}`}>
                    {company.email}
                  </a>
                </>
              ) : (
                " os canais de atendimento informados no site"
              )}.
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
