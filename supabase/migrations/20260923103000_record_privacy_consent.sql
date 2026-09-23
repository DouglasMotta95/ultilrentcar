ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS privacy_consent_at timestamptz,
  ADD COLUMN IF NOT EXISTS privacy_policy_version text;

COMMENT ON COLUMN public.leads.privacy_consent_at IS 'Data e hora em que o titular autorizou o tratamento informado no cadastro.';
COMMENT ON COLUMN public.leads.privacy_policy_version IS 'Versão da Política de Privacidade aceita no momento do cadastro.';
