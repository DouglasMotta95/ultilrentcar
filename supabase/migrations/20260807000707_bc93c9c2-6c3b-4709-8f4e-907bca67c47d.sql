CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

SELECT cron.schedule(
  'daily-billing-reminder',
  '0 9 * * *', -- 9 AM every day
  $$
  SELECT net.http_post(
    url := 'https://project--26e37ee9-dd9f-49d3-811b-f6fbeb632bee-dev.lovable.app/api/public/hooks/billing-reminder',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer sb_publishable_oRCoso4_rSPv03XDUPuTwQ_54m5lDiO"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);
