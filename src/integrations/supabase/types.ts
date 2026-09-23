export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      leads: {
        Row: {
          admin_notes: string | null
          app_profile_url: string | null
          birth_date: string
          cellphone: string
          cep: string
          city: string
          cnh_url: string | null
          complement: string | null
          cpf: string
          created_at: string | null
          criminal_record_url: string | null
          email: string
          facebook: string | null
          full_name: string
          id: string
          instagram: string | null
          landline: string | null
          neighborhood: string
          number: string
          platform: Database["public"]["Enums"]["platform_type"]
          profession: string
          privacy_consent_at?: string | null
          privacy_policy_version?: string | null
          ref_phone_1: string
          ref_phone_2: string
          residence_proof_url: string | null
          state: string
          status: Database["public"]["Enums"]["lead_status"] | null
          street: string
          updated_at: string | null
          vehicle_interest: string | null
        }
        Insert: {
          admin_notes?: string | null
          app_profile_url?: string | null
          birth_date: string
          cellphone: string
          cep: string
          city: string
          cnh_url?: string | null
          complement?: string | null
          cpf: string
          created_at?: string | null
          criminal_record_url?: string | null
          email: string
          facebook?: string | null
          full_name: string
          id?: string
          instagram?: string | null
          landline?: string | null
          neighborhood: string
          number: string
          platform: Database["public"]["Enums"]["platform_type"]
          profession: string
          ref_phone_1: string
          ref_phone_2: string
          residence_proof_url?: string | null
          state: string
          status?: Database["public"]["Enums"]["lead_status"] | null
          street: string
          updated_at?: string | null
          vehicle_interest?: string | null
        }
        Update: {
          admin_notes?: string | null
          app_profile_url?: string | null
          birth_date?: string
          cellphone?: string
          cep?: string
          city?: string
          cnh_url?: string | null
          complement?: string | null
          cpf?: string
          created_at?: string | null
          criminal_record_url?: string | null
          email?: string
          facebook?: string | null
          full_name?: string
          id?: string
          instagram?: string | null
          landline?: string | null
          neighborhood?: string
          number?: string
          platform?: Database["public"]["Enums"]["platform_type"]
          profession?: string
          privacy_consent_at?: string | null
          privacy_policy_version?: string | null
          ref_phone_1?: string
          ref_phone_2?: string
          residence_proof_url?: string | null
          state?: string
          status?: Database["public"]["Enums"]["lead_status"] | null
          street?: string
          updated_at?: string | null
          vehicle_interest?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          id: string
          plan_id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          plan_id: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          plan_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          app_category: string | null
          body_type: string | null
          brand: string
          color: string | null
          created_at: string | null
          description: string | null
          features: string[] | null
          gallery_images: string[]
          id: string
          image_url: string | null
          is_active: boolean | null
          model: string
          plate: string | null
          price_per_week: number | null
          sort_order: number
          transmission: string | null
          updated_at: string | null
          year: number
        }
        Insert: {
          app_category?: string | null
          body_type?: string | null
          brand: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          gallery_images?: string[]
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          model: string
          plate?: string | null
          price_per_week?: number | null
          sort_order?: number
          transmission?: string | null
          updated_at?: string | null
          year: number
        }
        Update: {
          app_category?: string | null
          body_type?: string | null
          brand?: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          gallery_images?: string[]
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          model?: string
          plate?: string | null
          price_per_week?: number | null
          sort_order?: number
          transmission?: string | null
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      company_settings: {
        Row: {
          address: string | null
          city: string | null
          email: string | null
          facebook_url: string | null
          hero_image_url: string | null
          hero_subtitle: string | null
          hero_title: string | null
          hours: string | null
          id: number
          instagram_url: string | null
          logo_url: string | null
          map_embed_url: string | null
          name: string
          phone: string | null
          state: string | null
          updated_at: string | null
          weekly_price_from: number | null
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          email?: string | null
          facebook_url?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          hours?: string | null
          id?: number
          instagram_url?: string | null
          logo_url?: string | null
          map_embed_url?: string | null
          name?: string
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          weekly_price_from?: number | null
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          email?: string | null
          facebook_url?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          hours?: string | null
          id?: number
          instagram_url?: string | null
          logo_url?: string | null
          map_embed_url?: string | null
          name?: string
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          weekly_price_from?: number | null
          whatsapp?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      lead_status:
        | "em_analise"
        | "documentacao_pendente"
        | "aprovado"
        | "reprovado"
        | "finalizado"
      platform_type: "Uber" | "99" | "inDrive" | "Outro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      lead_status: [
        "em_analise",
        "documentacao_pendente",
        "aprovado",
        "reprovado",
        "finalizado",
      ],
      platform_type: ["Uber", "99", "inDrive", "Outro"],
    },
  },
} as const
