# Plano de Implementação - UT Locadora Premium

O objetivo é transformar o site atual no design premium solicitado nas fotos de referência, garantindo que o nome da marca e as informações estejam corretas.

## 1. Ajustes de Nome e Branding
- Corrigir o nome da marca para "UTIL LOCADORA" em vez de "UT LOCADORA" onde for apropriado.
- Revisar o logo e as referências textuais no `navbar.tsx`, `footer.tsx` e `hero.tsx`.

## 2. Refinamento Visual (Estética das Fotos)
- Aplicar o estilo exato das fotos de referência (Dark Premium).
- Melhorar os cartões de veículos com efeitos de vidro mais intensos.
- Adicionar badges de status nos veículos (Disponível/Alugado).

## 3. Fluxo de Cadastro e Documentos
- Adicionar campos de upload de documentos (CNH, Comprovante de Residência) no `lead-form.tsx`.
- Configurar bucket no Supabase Storage para armazenar os documentos.

## 4. Painel Administrativo
- Criar a rota `/admin` protegida.
- Implementar lista de leads com visualização de documentos.
- Implementar CRUD de veículos para gestão da frota.

## Detalhes Técnicos
- **Estilos:** Tailwind v4 com variáveis CSS em `src/styles.css`.
- **Backend:** TanStack Server Functions para processamento de formulários.
- **Database:** Supabase para persistência e Storage para arquivos.
