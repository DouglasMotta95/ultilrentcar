import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        planId: z.enum(["mensal", "trimestral", "anual"]),
        priceId: z.string(),
      })
      .parse(data)
  )
  .handler(async ({ data, request }) => {
    // In a real implementation, you would:
    // 1. Get the user from the Supabase session
    // 2. Use Stripe to create a checkout session
    // 3. Return the session URL

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Unauthorized");
    }

    const supabase = createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Mock implementation for checkout
    console.log(`Creating checkout session for user ${user.id} on plan ${data.planId}`);

    // Here you would integrate with Stripe:
    /*
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [{ price: data.priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.APP_URL}/corrida?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/assinatura`,
    });
    return { url: session.url };
    */

    return { url: "/corrida" };
  });

export const getSubscriptionStatus = createServerFn({ method: "GET" })
  .handler(async ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return { status: "inactive" };
    }

    const supabase = createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));

    if (authError || !user) {
      return { status: "inactive" };
    }

    const { data: subscription } = await supabase
      .from("user_subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single();

    return {
      status: subscription?.status || "inactive",
      planId: subscription?.plan_id,
      currentPeriodEnd: subscription?.current_period_end,
    };
  });
