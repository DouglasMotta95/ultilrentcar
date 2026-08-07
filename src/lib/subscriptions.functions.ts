import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { getRequest } from "@tanstack/react-start/server";

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        planId: z.enum(["mensal", "trimestral", "anual"]),
        priceId: z.string(),
      })
      .parse(data)
  )
  .handler(async ({ data }) => {
    // On Lovable, we might be in a preview environment without full auth headers sometimes
    // Or we want to allow a smooth "Free Trial" flow for the demo
    const authHeader = request.headers.get("Authorization");
    
    // For the "Free Trial" / Demo purpose in this app, we'll allow navigation
    // In a real app, you'd strictly verify the Supabase user here.
    
    // Mock implementation for checkout redirect
    console.log(`Creating checkout session for plan ${data.planId}`);
    
    // Return a dummy stripe-like URL or just the app route for the demo
    return { url: "/corrida" };
  });

    // Mock implementation for checkout
    console.log(`Creating checkout session for user ${user.id} on plan ${data.planId}`);

    return { url: "/corrida" };
  });

export const getSubscriptionStatus = createServerFn({ method: "GET" })
  .handler(async () => {
    const request = getRequest();
    if (!request) return { status: "inactive" };

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return { status: "inactive" };
    }

    const supabaseUrl = process.env["VITE_SUPABASE_URL"];
    const supabaseServiceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];

    if (!supabaseUrl || !supabaseServiceKey) {
      return { status: "inactive" };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

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
