-- Use the professional company contact address consistently in public/admin settings.
UPDATE public.company_settings
SET email = 'comercial@utilrentcar.com.br',
    updated_at = NOW()
WHERE id = 1;
