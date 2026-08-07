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

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Unauthorized");
    }

    const supabaseUrl = process.env["VITE_SUPABASE_URL"];
    const supabaseServiceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase environment variables not set");
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
      throw new Error("Unauthorized");
    }

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
