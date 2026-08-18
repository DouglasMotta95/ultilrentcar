# Reestruturação Completa — Útil Rent Car (Itu/SP)

Transformação integral do projeto para a identidade oficial da **Útil Rent Car**, focada em motoristas de aplicativo, com base em pesquisa de dados reais e referências premium.

## Identidade e Branding
- **Branding**: Mudança definitiva para **Util Rent Car** e **Util Locadora de Veículos**.
- **Design System**: Refinamento do tema claro com acentos ciano (`--primary`), tipografia **Sora** (Headings) e **Manrope** (Body), e sombras `soft-card`.
- **Pesquisa Real**: Integração de dados confirmados de Itu/SP (Telefone: (11) 94722-9449, E-mail: utillocadora@gmail.com).

## Funcionalidades e Conteúdo
- **Hero de Alto Impacto**: Novos títulos e sub-estatísticas (Seguro, 7.000km, Manutenção).
- **Catálogo Dinâmico**: Integração com Supabase para exibição de frota real com filtros de disponibilidade.
- **Fluxo de Cadastro**: Formulário multi-step aprimorado com upload de documentos (CNH, Comprovante, Antecedentes) e barra de progresso.
- **Painel Administrativo**: Criação de rotas `/admin` para gestão de frota, leads e dados institucionais da empresa.
- **WhatsApp Integrado**: Botão flutuante e chamadas diretas com mensagens pré-configuradas.

## Detalhes Técnicos
- **Frontend**: TanStack Start v1 + Tailwind CSS v4 + Framer Motion para animações de entrada.
- **Backend**: Supabase (PostgreSQL) com tabelas `leads` e `vehicles`, incluindo RLS e Grants.
- **Responsividade**: Layout mobile-first otimizado para motoristas que acessam via celular durante o trabalho.
- **SEO**: Meta tags exclusivas por rota e JSON-LD para busca local em Itu/SP.
