# Plan: Implement Útil Rent Car Project

Transform the existing project into a professional car rental platform for Útil Rent Car, following the structure and features of the reference site (util-drive-pro.lovable.app).

## User Review Required

> [!IMPORTANT]
> The current project structure (LucroReal) will be completely replaced. This includes resetting routes, styles, and database models.

- **Logo**: Do you have the official logo file available, or should I use a professional placeholder for now?
- **Colors**: The reference site uses specific branding. Should I stick strictly to those or can I suggest a modern evolution?
- **Fleet**: I will set up the structure for vehicles. Do you have specific models to include immediately?

## Proposed Changes

### 1. Project Reset
- Remove all LucroReal specific routes, components, and logic.
- Reset `src/styles.css` to a clean, professional "Agency" style (Light/Dark support, premium typography).

### 2. Branding & Design
- Implement the Útil Rent Car visual identity.
- Typography: Inter/Manrope for body, Sora/Outfit for headings.
- Colors: Deep blues/greens (trust) with clean whites/greys.

### 3. Core Pages
- **Homepage**: Hero section, "Quem Somos", "Serviços", "Como Funciona", "Benefícios", "Frota", "FAQ", "Contato".
- **Legal**: "Política de Privacidade", "Termos de Uso".
- **Client/Admin Area**: Secure login and dashboard for managing fleet and leads.

### 4. Features
- **Fleet Management**: CRUD for vehicles (Model, Year, Category, Status, Photos).
- **Lead Capture**: WhatsApp integration with pre-filled messages and a budget request form.
- **Dynamic Content**: CMS-like ability to edit site text and contact info via the dashboard.
- **SEO & Performance**: Optimized meta tags, lazy loading, and mobile-first responsiveness.

## Technical Details
- **Frontend**: TanStack Start (React 19), Tailwind CSS v4.
- **Backend/DB**: Lovable Cloud (Supabase) for Lead storage and Fleet management.
- **Auth**: Supabase Auth for the Admin/Client area.
- **Integrations**: WhatsApp API (link-based), Google Maps (placeholder or API if key provided).
