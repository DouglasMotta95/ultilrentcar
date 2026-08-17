# UT/Util Locadora - Implementation Plan

Complete reconstruction of the UT Locadora platform for professional drivers (Uber, 99, inDrive).

## Phase 1: Branding & Visual Identity (Complete)
- [x] Configure Tailwind v4 with UT Locadora colors (Professional Blue).
- [x] Setup premium typography (Sora for headings, Manrope for body).
- [x] Implement glassmorphism and modern UI utilities.

## Phase 2: Core Platform Infrastructure
- [x] Create navigation and global layout.
- [x] Implement Hero section with value propositions (R$ 750/week, 7k km).
- [x] Implement Locality/Conditions section.
- [x] Setup routing for Home and Registration (/cadastro).

## Phase 3: Registration & Document Management
- [ ] Build multi-step registration form (Personal, Address, Professional, References).
- [ ] Implement secure file upload system for CNH, Residence Proof, Criminal Records, and App Profile.
- [ ] Configure storage buckets with private access for documents.
- [ ] Implement validation (MIME, size) and security layers.

## Phase 4: Backend & Notifications
- [ ] Create Supabase schema for leads/solicitations.
- [ ] Implement RLS policies for data privacy.
- [ ] Setup server function to send email notifications to `utillocadora@gmail.com` on new leads.

## Phase 5: Admin Dashboard
- [ ] Create protected admin routes (`/admin`, `/admin/solicitacoes`).
- [ ] Build dashboard for tracking lead status (Yellow: Analysis, Green: Approved, etc.).
- [ ] Implement vehicle management CRUD (utilizing real customer photos).

## Phase 6: Final Polish
- [ ] Integrate WhatsApp CTAs across all pages.
- [ ] Implement "How it Works" visual guide.
- [ ] Full mobile optimization and PWA configuration.

### Technical Details
- **Frontend**: TanStack Start v1 (React 19), Tailwind CSS v4, Lucide Icons.
- **Backend**: Supabase (Database, Auth, Storage).
- **Security**: RLS, private storage, authenticated admin functions.
- **Communications**: Email notifications via server functions (Resend/SMTP), WhatsApp integration.
