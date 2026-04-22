-- Ad SpyDR Complete Database Schema
-- Run this in your Supabase SQL Editor - All tables in correct order
-- Note: Run ONE BLOCK AT A TIME if you get errors

-- ===========================
-- BLOCK 1: Enable extensions
-- ===========================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================
-- BLOCK 2: Create core tables (in order - no dependencies)
-- ===========================

-- Teams table
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    logo TEXT,
    brand_color TEXT,
    brand_name TEXT
);

-- Users table (simplified - no auth.users reference to avoid issues)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT false,
    name TEXT,
    avatar_url TEXT,
    password_hash TEXT,
    role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
    plan TEXT DEFAULT 'FREE' CHECK (plan IN ('FREE', 'PRO', 'AGENCY')),
    stripe_customer_id TEXT UNIQUE,
    stripe_sub_id TEXT,
    plan_expires_at TIMESTAMPTZ,
    trial_ends_at TIMESTAMPTZ,
    onboarding_done BOOLEAN DEFAULT false,
    team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Searches table
CREATE TABLE IF NOT EXISTS public.searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    domain TEXT NOT NULL,
    company_name TEXT,
    company_logo TEXT,
    industry TEXT,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'RUNNING', 'DONE', 'FAILED')),
    platforms TEXT[] DEFAULT '{}',
    ads_found INTEGER DEFAULT 0,
    spend_tier TEXT CHECK (spend_tier IN ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH')),
    spend_est_low INTEGER,
    spend_est_high INTEGER,
    ai_summary TEXT,
    ai_insights JSONB,
    raw_data JSONB,
    competitor_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ads table
CREATE TABLE IF NOT EXISTS public.ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    search_id UUID NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('FACEBOOK', 'GOOGLE', 'TIKTOK', 'LINKEDIN')),
    ad_id TEXT NOT NULL,
    headline TEXT,
    body TEXT,
    call_to_action TEXT,
    destination_url TEXT,
    image_url TEXT,
    video_url TEXT,
    started_running TIMESTAMPTZ,
    stopped_running TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    days_running INTEGER,
    hook_type TEXT,
    targeting JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracked Competitors table
CREATE TABLE IF NOT EXISTS public.tracked_competitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    domain TEXT NOT NULL,
    nickname TEXT,
    company_name TEXT,
    company_logo TEXT,
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_checked TIMESTAMPTZ,
    last_new_ad TIMESTAMPTZ
);

-- Alerts table
CREATE TABLE IF NOT EXISTS public.alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    competitor_id UUID,
    type TEXT NOT NULL CHECK (type IN ('NEW_AD', 'AD_STOPPED', 'SPEND_INCREASE', 'NEW_COMPETITOR_DOMAIN')),
    channel TEXT DEFAULT 'EMAIL' CHECK (channel IN ('EMAIL', 'SLACK', 'WEBHOOK')),
    frequency TEXT DEFAULT 'INSTANT' CHECK (frequency IN ('INSTANT', 'DAILY', 'WEEKLY')),
    is_active BOOLEAN DEFAULT true,
    last_fired TIMESTAMPTZ,
    last_checked TIMESTAMPTZ,
    config JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    type TEXT,
    read_at TIMESTAMPTZ,
    link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports table
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'GENERATING' CHECK (status IN ('GENERATING', 'READY', 'FAILED')),
    type TEXT DEFAULT 'COMPETITOR_OVERVIEW' CHECK (type IN ('COMPETITOR_OVERVIEW', 'MULTI_COMPETITOR', 'AD_INTELLIGENCE')),
    file_url TEXT,
    config JSONB DEFAULT '{}',
    is_white_label BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- API Keys table
CREATE TABLE IF NOT EXISTS public.api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    key_hash TEXT NOT NULL UNIQUE,
    key_prefix TEXT NOT NULL,
    last_used TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);

-- Blog Posts table (already exists - skip if error)
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    author TEXT DEFAULT 'Ad SpyDR Team',
    tags TEXT[] DEFAULT '{}',
    seo_title TEXT,
    seo_desc TEXT,
    views INTEGER DEFAULT 0,
    read_time INTEGER DEFAULT 5,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage Logs table
CREATE TABLE IF NOT EXISTS public.usage_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    action TEXT NOT NULL,
    meta JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- BLOCK 3: Create indexes
-- ===========================
CREATE INDEX IF NOT EXISTS idx_searches_user_id ON public.searches(user_id);
CREATE INDEX IF NOT EXISTS idx_searches_domain ON public.searches(domain);
CREATE INDEX IF NOT EXISTS idx_ads_search_id ON public.ads(search_id);
CREATE INDEX IF NOT EXISTS idx_ads_platform ON public.ads(platform);
CREATE INDEX IF NOT EXISTS idx_competitors_user_id ON public.tracked_competitors(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON public.alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user ON public.usage_logs(user_id, created_at);

-- ===========================
-- BLOCK 4: Enable RLS (Row Level Security)
-- ===========================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracked_competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- ===========================
-- BLOCK 5: RLS Policies (simplified)
-- ===========================
-- Users can view their own data
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Users can manage their own searches
CREATE POLICY "Users can manage searches" ON public.searches FOR ALL USING (auth.uid() = user_id);

-- Users can manage their competitors
CREATE POLICY "Users can manage competitors" ON public.tracked_competitors FOR ALL USING (auth.uid() = user_id);

-- Users can manage their alerts
CREATE POLICY "Users can manage alerts" ON public.alerts FOR ALL USING (auth.uid() = user_id);

-- Users can view their own notifications
CREATE POLICY "Users can view notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Anyone can view published blog posts
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts FOR SELECT USING (published = true);

-- ===========================
-- BLOCK 6: Grant permissions
-- ===========================
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.teams TO authenticated;
GRANT ALL ON public.searches TO authenticated;
GRANT ALL ON public.ads TO authenticated;
GRANT ALL ON public.tracked_competitors TO authenticated;
GRANT ALL ON public.alerts TO authenticated;
GRANT ALL ON public.notifications TO authenticated;
GRANT ALL ON public.reports TO authenticated;
GRANT ALL ON public.api_keys TO authenticated;
GRANT ALL ON public.blog_posts TO authenticated;
GRANT ALL ON public.usage_logs TO authenticated;

GRANT ALL ON public.users TO anon;
GRANT ALL ON public.teams TO anon;
GRANT ALL ON public.searches TO anon;
GRANT ALL ON public.ads TO anon;
GRANT ALL ON public.tracked_competitors TO anon;
GRANT ALL ON public.alerts TO anon;
GRANT ALL ON public.notifications TO anon;
GRANT ALL ON public.reports TO anon;
GRANT ALL ON public.api_keys TO anon;
GRANT ALL ON public.blog_posts TO anon;
GRANT ALL ON public.usage_logs TO anon;

GRANT ALL ON public.users TO service_role;
GRANT ALL ON public.teams TO service_role;
GRANT ALL ON public.searches TO service_role;
GRANT ALL ON public.ads TO service_role;
GRANT ALL ON public.tracked_competitors TO service_role;
GRANT ALL ON public.alerts TO service_role;
GRANT ALL ON public.notifications TO service_role;
GRANT ALL ON public.reports TO service_role;
GRANT ALL ON public.api_keys TO service_role;
GRANT ALL ON public.blog_posts TO service_role;
GRANT ALL ON public.usage_logs TO service_role;

-- ===========================
-- DONE!
-- ===========================
-- Verify tables created: SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';