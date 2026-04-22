-- Ad SpyDR Blog Posts SQL
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blog_posts table
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

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS policy for public read
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts FOR SELECT USING (published = true);

-- Insert sample blog posts (one at a time)
INSERT INTO public.blog_posts (slug, title, excerpt, content, published, published_at, author, tags, read_time, featured, seo_title, seo_desc) VALUES
('how-to-spy-on-competitor-ads', 'How to Spy on Competitor Ads in 2026', 'Learn the best strategies to find and analyze competitor advertisements.',
'Why Spy on Competitor Ads? Understanding what your competitors are advertising can give you a massive edge in the market.

Step 1: Choose Your Target Start by selecting a competitor in your niche. Look for businesses that are in your industry, have a similar target audience, and are actively advertising.

Step 2: Use Ad Spy Tools Tools like Ad SpyDR let you see active Facebook ads, view Google advertisements, analyze ad creative strategies, and get AI-powered insights.

Step 3: Analyze the Data Look for patterns in messaging themes, hooks, CTAs, and offers.

Step 4: Apply to Your Business Use what you learn to create better ad copy, improve your targeting, differentiate from competitors, and test new angles.

Conclusion Spying on competitor ads is essential for staying competitive.',
true, NOW(), 'Ad SpyDR Team', ARRAY['tips', 'strategy'], 5, true, 'How to Spy on Competitor Ads in 2026 - Ad SpyDR', 'Learn the best strategies to find and analyze competitor advertisements with Ad SpyDR.');

INSERT INTO public.blog_posts (slug, title, excerpt, content, published, published_at, author, tags, read_time, featured, seo_title, seo_desc) VALUES
('facebook-vs-google-ads', 'Facebook vs Google Ads: Which is Better?', 'Comparing the two biggest advertising platforms.',
'Overview Facebook Ads and Google Ads are the two largest advertising platforms. But which one is right for your business?

Facebook Ads are social media advertising, good for awareness and engagement, visual-focused, with demographic targeting. Best for B2C brands.

Google Ads are search advertising, good for intent-based traffic, keyword targeting, and conversion-focused. Best for high-intent searches.

Which is Better? It depends on your goals. Use Facebook for brand awareness and engagement. Use Google for direct response. Many businesses benefit from both platforms.',
true, NOW(), 'Ad SpyDR Team', ARRAY['comparison', 'advertising'], 7, false, 'Facebook Ads vs Google Ads: Which is Better?', 'Compare Facebook Ads and Google Ads to find the best platform for your business.');

INSERT INTO public.blog_posts (slug, title, excerpt, content, published, published_at, author, tags, read_time, featured, seo_title, seo_desc) VALUES
('top-ad-spy-tools-2026', 'Top 10 Ad Spy Tools in 2026', 'The best ad spy tools reviewed and compared.',
'Top Ad Spy Tools in 2026: 1. Ad SpyDR - Free option with AI analysis 2. AdSpy - Extensive Facebook ads database 3. BigSpy - Multi-platform coverage 4. Minea - AI-powered insights 5. PowerAdSpy - Budget-friendly option 6. AdsWatch - Real-time alerts 7. SpySchool - Educational focus 8. AdPeek - User-friendly interface 9. AdVault - Enterprise features 10. AdQuest - Budget options.

How to Choose Consider your budget, required features, and platform coverage. Most tools offer free trials so test before you commit.',
true, NOW(), 'Ad SpyDR Team', ARRAY['tools', 'review'], 8, true, 'Top 10 Ad Spy Tools in 2026 - Ad SpyDR', 'The best ad spy tools reviewed and compared for 2026.');

INSERT INTO public.blog_posts (slug, title, excerpt, content, published, published_at, author, tags, read_time, featured, seo_title, seo_desc) VALUES
('ai-for-ad-analysis', 'How to Use AI for Ad Analysis', 'Leverage AI to analyze competitor ads and gain strategic insights.',
'Why Use AI? AI can analyze thousands of ads in seconds, identifying patterns humans might miss.

What AI Can Analyze: Messaging themes, hook effectiveness, CTA patterns, target audience signals, and tone and voice.

How to Use AI Analysis: 1. Gather competitor ads 2. Run through AI analyzer 3. Review insights 4. Apply to your strategy

Best Practices: Compare multiple competitors, track changes over time, test AI recommendations, and iterate based on results.',
true, NOW(), 'Ad SpyDR Team', ARRAY['AI', 'strategy'], 6, false, 'How to Use AI for Ad Analysis - Ad SpyDR', 'Leverage AI to analyze competitor ads and gain strategic insights.');

-- Grant permissions
GRANT ALL ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO anon;
GRANT ALL ON public.blog_posts TO service_role;