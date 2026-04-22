'use client';

import Link from 'next/link';
import '@/components/layout.css';

const features = [
  { title: 'Real-time Ad Tracking', description: 'Monitor ads across Facebook and Google. See new ad creatives the moment they go live.', icon: '📊', benefits: ['Live monitoring', 'Instant alerts', 'Historical data'] },
  { title: 'AI Ad Analysis', description: 'Get instant insights on hooks, CTAs, audience targeting, and creative sentiment with AI.', icon: '🤖', benefits: ['Hook analysis', 'CTA insights', 'Audience targeting'] },
  { title: 'Ad Spend Estimation', description: 'Understand competitor ad budgets with estimated monthly spend data.', icon: '💰', benefits: ['Monthly estimates', 'Platform breakdown', 'Trend analysis'] },
  { title: 'Ad Change Alerts', description: 'Get notified when rivals launch new campaigns or change strategies.', icon: '🔔', benefits: ['Instant alerts', 'Campaign updates', 'Strategy changes'] },
  { title: 'Ad Copy Extraction', description: 'Download ad copy, headlines, and descriptions for inspiration.', icon: '📝', benefits: ['CSV export', 'Headline extraction', 'Description capture'] },
  { title: 'Landing Page Spy', description: 'See which landing pages ads are driving traffic to.', icon: '🎯', benefits: ['URL tracking', 'Page analysis', 'Conversion insights'] }
];

const tools = [
  { name: 'Facebook Ads', description: 'Track all active Facebook advertisements' },
  { name: 'Google Ads', description: 'Monitor Google search and display ads' },
  { name: 'Instagram Ads', description: 'View Instagram advertising campaigns' },
  { name: 'TikTok Ads', description: 'Spy on TikTok advertising strategies' }
];

export default function FeaturesPage() {
  return (
    <div className="page">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <Link href="/" className="logo">Ad SpyDr</Link>
          <div className="nav-links">
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <Link href="/auth/signup" className="btn-nav">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="features-hero">
        <div className="hero-bg"></div>
        <div className="hero-container">
          <div className="hero-badge">🚀 Powerful Features</div>
          <h1 className="hero-title">Everything You Need to<br /><span>Spy on Competitors</span></h1>
          <p className="hero-subtitle">Powerful ad intelligence to find competitor ads and create better advertising.</p>
        </div>
      </section>

      {/* Core Features */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Core Features</h2>
            <p>Everything you need to outsmart your competition</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-illustration">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="feature-benefits">{feature.benefits.map((b, i) => (<li key={i}>✓ {b}</li>))}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="platforms-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Supported Platforms</h2>
            <p>Spy on ads across all major platforms</p>
          </div>
          <div className="platforms-grid">
            {tools.map((tool, index) => (<div key={index} className="platform-card"><h3>{tool.name}</h3><p>{tool.description}</p></div>))}
          </div>
        </div>
      </section>

      {/* Why Use */}
      <section className="benefits-section">
        <div className="section-container">
          <h2>Why Use Ad SpyDR?</h2>
          <div className="benefits-list">
            <div className="benefit-item"><span className="benefit-icon">⚡</span><div><h3>Save Time</h3><p>Find competitor ads in seconds, not hours.</p></div></div>
            <div className="benefit-item"><span className="benefit-icon">💡</span><div><h3>Get Inspiration</h3><p>See winning creatives for your campaigns.</p></div></div>
            <div className="benefit-item"><span className="benefit-icon">🎯</span><div><h3>Target Better</h3><p>Learn from competitor strategies.</p></div></div>
            <div className="benefit-item"><span className="benefit-icon">📈</span><div><h3>Scale Faster</h3><p>Create more effective ads.</p></div></div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="use-cases-section">
        <div className="section-container">
          <h2>Popular Use Cases</h2>
          <div className="use-cases-grid">
            <div className="use-case-card"><h3>🏪 E-commerce</h3><p>Find what competitors are advertising and their pricing.</p></div>
            <div className="use-case-card"><h3>📚 Courses & SaaS</h3><p>Discover funnels and messaging strategies.</p></div>
            <div className="use-case-card"><h3>🏥 Local Businesses</h3><p>See what local businesses are advertising.</p></div>
            <div className="use-case-card"><h3>📱 Agencies</h3><p>Research for client pitches.</p></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="section-container">
          <h2>Start Spying on Competitor Ads</h2>
          <p>Get started for free</p>
          <Link href="/auth/signup" className="btn-cta">Get Started Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand"><div className="logo">Ad SpyDr</div><p>The #1 free tool to spy on competitor ads.</p></div>
          <div className="footer-links">
            <div className="footer-col"><h4>Product</h4><a href="/features">Features</a><a href="/pricing">Pricing</a><a href="/blog">Blog</a></div>
            <div className="footer-col"><h4>Company</h4><a href="#">About</a><a href="#">Blog</a></div>
            <div className="footer-col"><h4>Support</h4><a href="#">Contact</a><a href="#">Help</a></div>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Ad SpyDr. All rights reserved.</div>
      </footer>
    </div>
  );
}