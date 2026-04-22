import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          email_verified: boolean | null;
          name: string | null;
          avatar_url: string | null;
          password_hash: string | null;
          role: 'USER' | 'ADMIN';
          plan: 'FREE' | 'PRO' | 'AGENCY';
          stripe_customer_id: string | null;
          stripe_sub_id: string | null;
          plan_expires_at: string | null;
          trial_ends_at: string | null;
          onboarding_done: boolean;
          team_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          email_verified?: boolean | null;
          name?: string | null;
          avatar_url?: string | null;
          password_hash?: string | null;
          role?: 'USER' | 'ADMIN';
          plan?: 'FREE' | 'PRO' | 'AGENCY';
          stripe_customer_id?: string | null;
          stripe_sub_id?: string | null;
          plan_expires_at?: string | null;
          trial_ends_at?: string | null;
          onboarding_done?: boolean;
          team_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          email_verified?: boolean | null;
          name?: string | null;
          avatar_url?: string | null;
          password_hash?: string | null;
          role?: 'USER' | 'ADMIN';
          plan?: 'FREE' | 'PRO' | 'AGENCY';
          stripe_customer_id?: string | null;
          stripe_sub_id?: string | null;
          plan_expires_at?: string | null;
          trial_ends_at?: string | null;
          onboarding_done?: boolean;
          team_id?: string | null;
          updated_at?: string;
        };
      };
      teams: {
        Row: {
          id: string;
          name: string;
          owner_id: string;
          created_at: string;
          logo: string | null;
          brand_color: string | null;
          brand_name: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          owner_id: string;
          created_at?: string;
          logo?: string | null;
          brand_color?: string | null;
          brand_name?: string | null;
        };
        Update: {
          name?: string;
          owner_id?: string;
          logo?: string | null;
          brand_color?: string | null;
          brand_name?: string | null;
        };
      };
      searches: {
        Row: {
          id: string;
          user_id: string;
          domain: string;
          company_name: string | null;
          company_logo: string | null;
          industry: string | null;
          status: 'PENDING' | 'RUNNING' | 'DONE' | 'FAILED';
          platforms: string[];
          ads_found: number;
          spend_tier: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' | null;
          spend_est_low: number | null;
          spend_est_high: number | null;
          ai_summary: string | null;
          ai_insights: any | null;
          raw_data: any | null;
          competitor_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          domain: string;
          company_name?: string | null;
          company_logo?: string | null;
          industry?: string | null;
          status?: 'PENDING' | 'RUNNING' | 'DONE' | 'FAILED';
          platforms?: string[];
          ads_found?: number;
          spend_tier?: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' | null;
          spend_est_low?: number | null;
          spend_est_high?: number | null;
          ai_summary?: string | null;
          ai_insights?: any | null;
          raw_data?: any | null;
          competitor_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'PENDING' | 'RUNNING' | 'DONE' | 'FAILED';
          ads_found?: number;
          spend_tier?: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' | null;
          spend_est_low?: number | null;
          spend_est_high?: number | null;
          ai_summary?: string | null;
          ai_insights?: any | null;
          raw_data?: any | null;
          updated_at?: string;
        };
      };
      ads: {
        Row: {
          id: string;
          search_id: string;
          platform: 'FACEBOOK' | 'GOOGLE' | 'TIKTOK' | 'LINKEDIN';
          ad_id: string;
          headline: string | null;
          body: string | null;
          call_to_action: string | null;
          destination_url: string | null;
          image_url: string | null;
          video_url: string | null;
          started_running: string | null;
          stopped_running: string | null;
          is_active: boolean;
          days_running: number | null;
          hook_type: string | null;
          targeting: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          search_id: string;
          platform: 'FACEBOOK' | 'GOOGLE' | 'TIKTOK' | 'LINKEDIN';
          ad_id: string;
          headline?: string | null;
          body?: string | null;
          call_to_action?: string | null;
          destination_url?: string | null;
          image_url?: string | null;
          video_url?: string | null;
          started_running?: string | null;
          stopped_running?: string | null;
          is_active?: boolean;
          days_running?: number | null;
          hook_type?: string | null;
          targeting?: any | null;
          created_at?: string;
        };
        Update: {
          is_active?: boolean;
          stopped_running?: string | null;
        };
      };
      tracked_competitors: {
        Row: {
          id: string;
          user_id: string;
          domain: string;
          nickname: string | null;
          company_name: string | null;
          company_logo: string | null;
          notes: string | null;
          is_active: boolean;
          created_at: string;
          last_checked: string | null;
          last_new_ad: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          domain: string;
          nickname?: string | null;
          company_name?: string | null;
          company_logo?: string | null;
          notes?: string | null;
          is_active?: boolean;
          created_at?: string;
          last_checked?: string | null;
          last_new_ad?: string | null;
        };
        Update: {
          nickname?: string | null;
          notes?: string | null;
          is_active?: boolean;
          last_checked?: string | null;
          last_new_ad?: string | null;
        };
      };
      alerts: {
        Row: {
          id: string;
          user_id: string;
          competitor_id: string | null;
          type: 'NEW_AD' | 'AD_STOPPED' | 'SPEND_INCREASE' | 'NEW_COMPETITOR_DOMAIN';
          channel: 'EMAIL' | 'SLACK' | 'WEBHOOK';
          frequency: 'INSTANT' | 'DAILY' | 'WEEKLY';
          is_active: boolean;
          last_fired: string | null;
          last_checked: string | null;
          config: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          competitor_id?: string | null;
          type: 'NEW_AD' | 'AD_STOPPED' | 'SPEND_INCREASE' | 'NEW_COMPETITOR_DOMAIN';
          channel?: 'EMAIL' | 'SLACK' | 'WEBHOOK';
          frequency?: 'INSTANT' | 'DAILY' | 'WEEKLY';
          is_active?: boolean;
          last_fired?: string | null;
          last_checked?: string | null;
          config?: any | null;
          created_at?: string;
        };
        Update: {
          is_active?: boolean;
          channel?: 'EMAIL' | 'SLACK' | 'WEBHOOK';
          frequency?: 'INSTANT' | 'DAILY' | 'WEEKLY';
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          body: string;
          type: string;
          read_at: string | null;
          link: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          body: string;
          type: string;
          read_at?: string | null;
          link?: string | null;
          created_at?: string;
        };
        Update: {
          read_at?: string | null;
        };
      };
      reports: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          status: 'GENERATING' | 'READY' | 'FAILED';
          type: 'COMPETITOR_OVERVIEW' | 'MULTI_COMPETITOR' | 'AD_INTELLIGENCE';
          file_url: string | null;
          config: any;
          is_white_label: boolean;
          created_at: string;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          status?: 'GENERATING' | 'READY' | 'FAILED';
          type?: 'COMPETITOR_OVERVIEW' | 'MULTI_COMPETITOR' | 'AD_INTELLIGENCE';
          file_url?: string | null;
          config?: any;
          is_white_label?: boolean;
          created_at?: string;
          expires_at?: string | null;
        };
        Update: {
          status?: 'GENERATING' | 'READY' | 'FAILED';
          file_url?: string | null;
        };
      };
      api_keys: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          key_hash: string;
          key_prefix: string;
          last_used: string | null;
          expires_at: string | null;
          created_at: string;
          revoked_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          key_hash: string;
          key_prefix: string;
          last_used?: string | null;
          expires_at?: string | null;
          created_at?: string;
          revoked_at?: string | null;
        };
        Update: {
          last_used?: string | null;
          revoked_at?: string | null;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          cover_image: string | null;
          published: boolean;
          published_at: string | null;
          author: string;
          tags: string[];
          seo_title: string | null;
          seo_desc: string | null;
          views: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          cover_image?: string | null;
          published?: boolean;
          published_at?: string | null;
          author?: string;
          tags?: string[];
          seo_title?: string | null;
          seo_desc?: string | null;
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          excerpt?: string;
          content?: string;
          cover_image?: string | null;
          published?: boolean;
          published_at?: string | null;
          tags?: string[];
          seo_title?: string | null;
          seo_desc?: string | null;
          views?: number;
          updated_at?: string;
        };
      };
      usage_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          meta: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          meta?: any | null;
          created_at?: string;
        };
        Update: {};
      };
    };
  };
};
