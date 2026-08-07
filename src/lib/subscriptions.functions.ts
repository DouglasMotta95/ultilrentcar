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
    const request = getRequest();
    if (!request) throw new Error("Request context not found");

    // In a real production app with Stripe, we would use the user ID to create a session
    // For this premium driver copilot demo, we allow a smooth transition to the app
    console.log(`Simulando checkout para plano ${data.planId}`);

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

    try {
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
    } catch (e) {
      return { status: "inactive" };
    }
  });
