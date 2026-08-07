-- Add RLS policy for user_roles (Admins can see everything, users see their own)
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Restrict execution of has_role function
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;

-- Fix search_path for handle_updated_at function
ALTER FUNCTION public.handle_updated_at() SET search_path = public;
