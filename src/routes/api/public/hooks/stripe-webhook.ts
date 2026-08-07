import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'

export const Route = createFileRoute('/api/public/hooks/stripe-webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // In a real implementation, verify Stripe signature
        // const signature = request.headers.get('stripe-signature');
        
        const body = await request.json() as any;
        
        const supabaseUrl = process.env["VITE_SUPABASE_URL"];
        const supabaseServiceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];

        if (!supabaseUrl || !supabaseServiceKey) {
          return new Response('Config error', { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        if (body.type === 'checkout.session.completed') {
          const session = body.data.object;
          const userId = session.client_reference_id;
          const planId = session.metadata.plan_id;

          // Calculate period end based on plan
          const now = new Date();
          let periodEnd = new Date();
          if (planId === 'mensal') periodEnd.setMonth(now.getMonth() + 1);
          else if (planId === 'trimestral') periodEnd.setMonth(now.getMonth() + 3);
          else if (planId === 'anual') periodEnd.setFullYear(now.getFullYear() + 1);

          await supabase
            .from('user_subscriptions')
            .upsert({
              user_id: userId,
              stripe_subscription_id: session.subscription,
              stripe_customer_id: session.customer,
              plan_id: planId,
              status: 'active',
              current_period_end: periodEnd.toISOString(),
            }, { onConflict: 'user_id' });
        }

        if (body.type === 'invoice.paid') {
          const invoice = body.data.object;
          const subscriptionId = invoice.subscription;
          
          const { data: sub } = await supabase
            .from('user_subscriptions')
            .select('plan_id')
            .eq('stripe_subscription_id', subscriptionId)
            .single();

          if (sub) {
            const now = new Date();
            let periodEnd = new Date();
            if (sub.plan_id === 'mensal') periodEnd.setMonth(now.getMonth() + 1);
            else if (sub.plan_id === 'trimestral') periodEnd.setMonth(now.getMonth() + 3);
            else if (sub.plan_id === 'anual') periodEnd.setFullYear(now.getFullYear() + 1);

            await supabase
              .from('user_subscriptions')
              .update({
                status: 'active',
                current_period_end: periodEnd.toISOString(),
              })
              .eq('stripe_subscription_id', subscriptionId);
          }
        }

        return new Response(JSON.stringify({ received: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }
})
