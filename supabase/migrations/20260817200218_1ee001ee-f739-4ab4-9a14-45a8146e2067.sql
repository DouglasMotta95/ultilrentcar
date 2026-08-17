-- Create lead status enum
DO $$ BEGIN
    CREATE TYPE public.lead_status AS ENUM ('em_analise', 'documentacao_pendente', 'aprovado', 'reprovado', 'finalizado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create platforms enum
DO $$ BEGIN
    CREATE TYPE public.platform_type AS ENUM ('Uber', '99', 'inDrive', 'Outro');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    full_name TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    birth_date DATE NOT NULL,
    cellphone TEXT NOT NULL,
    landline TEXT,
    email TEXT NOT NULL,
    
    cep TEXT NOT NULL,
    street TEXT NOT NULL,
    number TEXT NOT NULL,
    complement TEXT,
    neighborhood TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    
    profession TEXT NOT NULL,
    platform platform_type NOT NULL,
    
    facebook TEXT,
    instagram TEXT,
    
    ref_phone_1 TEXT NOT NULL,
    ref_phone_2 TEXT NOT NULL,
    
    cnh_url TEXT,
    residence_proof_url TEXT,
    criminal_record_url TEXT,
    app_profile_url TEXT,
    
    status lead_status DEFAULT 'em_analise',
    admin_notes TEXT,
    vehicle_interest TEXT
);

-- Grant access
GRANT SELECT, INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policies (using simple public submission)
DO $$ BEGIN
    CREATE POLICY "Anyone can submit a lead" ON public.leads
        FOR INSERT TO anon WITH CHECK (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Anyone can view leads (temporary for testing)" ON public.leads
        FOR SELECT TO anon USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create vehicles table
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    model TEXT NOT NULL,
    brand TEXT NOT NULL,
    year INTEGER NOT NULL,
    plate TEXT,
    color TEXT,
    price_per_week DECIMAL(10,2) NOT NULL,
    features TEXT[] DEFAULT '{}',
    image_url TEXT,
    is_active BOOLEAN DEFAULT true
);

GRANT SELECT ON public.vehicles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vehicles TO authenticated;
GRANT ALL ON public.vehicles TO service_role;

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Anyone can view active vehicles" ON public.vehicles
        FOR SELECT TO anon USING (is_active = true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
