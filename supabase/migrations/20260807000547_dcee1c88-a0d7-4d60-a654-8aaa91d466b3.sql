-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create user_subscriptions table
CREATE TABLE public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    plan_id TEXT NOT NULL, -- 'mensal', 'trimestral', 'anual'
    status TEXT NOT NULL DEFAULT 'inactive', -- 'active', 'inactive', 'past_due', 'canceled'
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

GRANT SELECT ON public.user_subscriptions TO authenticated;
GRANT ALL ON public.user_subscriptions TO service_role;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription"
ON public.user_subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Update trigger for user_subscriptions
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
