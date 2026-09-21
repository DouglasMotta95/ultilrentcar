# UTIL LOCADORA

Site institucional e operacional da UTIL LOCADORA, com foco em locação de veículos para motoristas de aplicativo em Itu-SP e região.

## O que existe no projeto

- Site público com apresentação da empresa, frota, benefícios, FAQ e contato.
- Cadastro online de interessados em locação.
- Frota dinâmica armazenada no Supabase.
- Painel administrativo em `/admin`.
- Login protegido por Supabase Auth e função de administrador.
- Gestão de veículos: adicionar, editar, excluir, ordenar, ativar/ocultar, preço, categoria e descrição.
- Upload e troca de fotos reais dos veículos.
- Gestão de logo, imagem principal, WhatsApp, telefone, e-mail, endereço, mapa e textos do site.
- Gestão de cadastros recebidos e seus status.
- RLS no Supabase para impedir leitura pública dos dados dos candidatos.

## Frota base do projeto

A frota publicada foi alinhada aos modelos informados pela locadora:

- Volkswagen Polo Track
- Hyundai HB20 Hatch
- Hyundai HB20 Sedan (HB20S)
- Chevrolet Onix Sedan (Onix Plus)

A migration de correção reaproveita os registros ativos existentes para preservar os valores semanais já cadastrados. Fotos, preços, disponibilidade e demais informações podem ser mantidos pelo painel administrativo.

## Desenvolvimento

```sh
npm install
npm run dev
```

Build de produção:

```sh
npm run build
```

O projeto utiliza TanStack Start, React, Tailwind, Supabase e Lovable.
