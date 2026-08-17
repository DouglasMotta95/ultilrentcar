# Plano de Implementação - Identidade Visual Útil Locadora

Ajustar a identidade visual do site da Útil Locadora para refletir as cores e o estilo profissional solicitados, baseando-se nas redes sociais e referências de mercado de locadoras premium.

## Mudanças Propostas

### Design e Estilo
- **Paleta de Cores**: Atualizar a cor primária (`--primary`) para um azul mais escuro e sóbrio (`oklch(0.45 0.18 255)`), frequentemente associado a confiança e profissionalismo no setor automotivo.
- **Gradientes e Efeitos**: Intensificar os gradientes de vidro e as sombras para criar um visual mais "Premium Dark".
- **Botões e Interação**: Refinar o estilo dos botões com cantos mais arredondados (`rounded-2xl`) e sombras dinâmicas.

### Componentes de Interface
- **Navbar**: Garantir que o nome "UTIL LOCADORA" esteja em destaque com o azul correto.
- **Hero**: Ajustar a imagem de destaque e as cores dos selos de benefícios.
- **Cards de Veículos**: Aplicar a nova cor primária nos preços e botões de ação.
- **Formulário de Cadastro**: Manter a coerência visual com o novo esquema de cores.

## Detalhes Técnicos

- Alteração no `src/styles.css` para redefinir o token `--primary`.
- Ajustes pontuais nos componentes `src/components/layout/navbar.tsx`, `src/components/sections/hero.tsx` e `src/components/sections/vehicle-card.tsx` para garantir a aplicação correta dos tokens e classes de estilo.
- Substituição de links de WhatsApp e referências de redes sociais se houver informação específica adicional.

## Próximos Passos
1. Atualizar o arquivo `src/styles.css` com a nova definição de cor.
2. Revisar e aplicar ajustes de layout em componentes-chave.
3. Validar a responsividade e o contraste em modo escuro.
