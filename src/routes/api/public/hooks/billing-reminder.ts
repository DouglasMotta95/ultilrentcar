import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'

export const Route = createFileRoute('/api/public/hooks/billing-reminder')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env["VITE_SUPABASE_PUBLISHABLE_KEY"]}`) {
          return new Response('Unauthorized', { status: 401 });
        }

        const supabaseUrl = process.env["VITE_SUPABASE_URL"];
        const supabaseServiceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];

        if (!supabaseUrl || !supabaseServiceKey) {
          return new Response('Config error', { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Find subscriptions ending in exactly 7 days
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
        const dateStr = sevenDaysFromNow.toISOString().split('T')[0];

        const { data: subscriptions } = await supabase
          .from('user_subscriptions')
          .select('user_id, plan_id')
          .eq('status', 'active')
          .gte('current_period_end', `${dateStr}T00:00:00Z`)
          .lte('current_period_end', `${dateStr}T23:59:59Z`);

        if (subscriptions) {
          for (const sub of subscriptions) {
            console.log(`Sending 7-day reminder to user ${sub.user_id} for plan ${sub.plan_id}`);
            // In a real app, send email/push notification here
          }
        }

        return new Response(JSON.stringify({ sent: subscriptions?.length || 0 }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }
})
