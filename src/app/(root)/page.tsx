'use client';

import { useState } from 'react';
import { Search, Target, Brain, BarChart3, Check, Zap, Layers, PieChart, DollarSign, MousePointer, Eye, Clock } from 'lucide-react';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="coming-soon">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <span className="logo-icon">🕸️</span>
            Ad SpyDr
          </div>
          <span className="badge">Coming Soon</span>
        </div>
      </header>

      {/* Hero */}
      <section 
        className="hero"
       
       
       
      >
        <div className="hero-content">
          <h1>Ad Spy Coming Soon — The Ultimate Free Ad Intelligence Tool</h1>
          <p className="subtitle">
            <strong>Coming soon!</strong> The free tool to spy on any competitor's Facebook and Google ads. 
            Find winning creatives, see what's converting, and scale your campaigns with data.
          </p>
          
          {submitted ? (
            <div className="success-card">
              <span className="success-icon">🕸️</span>
              <div><h3>You're on the list!</h3><p>We'll email you when we launch. You're #1 in line!</p></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="waitlist-form">
              <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit" disabled={loading}>{loading ? 'Joining...' : 'Join Waitlist'}</button>
            </form>
          )}
          <p className="note">🎉 <strong>Free forever plan</strong> for first 100 signups • No credit card</p>
        </div>
      </section>

      {/* Main Benefit */}
      <section className="main-benefit">
        <div className="benefit-content">
          <h2>What Is Ad Spy?</h2>
          <p className="benefit-text">
            Ad Spy is a free tool that lets you <strong>see every ad your competitors are running</strong>. 
            Just enter any website or brand name — we'll show you all their Facebook ads and Google ads. 
            See the creatives, copy, landing pages, and how long they've been running. 
            <strong>It's like having a spy in your competitor's marketing department — for free.</strong>
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="stats-banner">
        <div className="stats-grid">
          <div className="stat-item"><span className="stat-num">10M+</span><span className="stat-label">Ads Tracked</span></div>
          <div className="stat-item"><span className="stat-num">50K+</span><span className="stat-label">Advertisers Monitored</span></div>
          <div className="stat-item"><span className="stat-num">100+</span><span className="stat-label">Niches</span></div>
          <div className="stat-item"><span className="stat-num">Free</span><span className="stat-label">Forever Plan</span></div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="features">
        <h2>What You'll Can Do With Ad Spy (Coming Soon)</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Search size={32} strokeWidth={1.5} /></div>
            <h3>Find Any Competitor's Ads</h3>
            <p>Enter any domain — see all their active Facebook ads and Google ads instantly.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Eye size={32} strokeWidth={1.5} /></div>
            <h3>See Ad Creatives</h3>
            <p>View every image, video, and copy. Screenshot any ad for inspiration.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Brain size={32} strokeWidth={1.5} /></div>
            <h3>AI Analysis</h3>
            <p>AI tells you WHY the ad works. Get copy templates and hook ideas.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><BarChart3 size={32} strokeWidth={1.5} /></div>
            <h3>Track Over Time</h3>
            <p>Monitor competitors weekly. Get alerts when they launch new ads.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How Ad Spy Works (Coming Soon)</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-num">01</div>
            <h3>Enter Competitor</h3>
            <p>Type any brand or website. We'll find their ads automatically.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h3>Browse Ads</h3>
            <p>See all active ads, creatives, copy, and landing pages.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h3>Copy Winners</h3>
            <p>Save winning creatives. Remix them for your own campaigns.</p>
          </div>
          <div className="step">
            <div className="step-num">04</div>
            <h3>Scale & Profit</h3>
            <p>Data-driven campaigns beat guesswork. Watch your ROAS grow.</p>
          </div>
        </div>
      </section>

      {/* Why Marketers Need This */}
      <section className="why-need">
        <h2>Why You Need Ad Spy (Coming Soon)</h2>
        <div className="need-list">
          <div className="need-item">
            <Check size={24} />
            <div>
              <h3>Stop Guessing What Works</h3>
              <p>Instead of guessing, see exactly which ads are winning in your niche.</p>
            </div>
          </div>
          <div className="need-item">
            <Check size={24} />
            <div>
              <h3>Copy Winning Creatives Fast</h3>
              <p>Find high-converting ads, replicate the winners, and scale faster.</p>
            </div>
          </div>
          <div className="need-item">
            <Check size={24} />
            <div>
              <h3>Know Your Competition</h3>
              <p>See where competitors are bidding and what offers convert.</p>
            </div>
          </div>
          <div className="need-item">
            <Check size={24} />
            <div>
              <h3>Get AI-Powered Insights</h3>
              <p>Don't just see ads — let AI explain why they work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="who-for">
        <h2>Who Is Ad Spy For?</h2>
        <div className="who-grid">
          <div className="who-card">
            <DollarSign size={28} strokeWidth={1.5} />
            <h3>Performance Marketers</h3>
            <p>Find winning offers and scale campaigns fast.</p>
          </div>
          <div className="who-card">
            <MousePointer size={28} strokeWidth={1.5} />
            <h3>Agency Owners</h3>
            <p>Give clients a competitive edge.</p>
          </div>
          <div className="who-card">
            <Layers size={28} strokeWidth={1.5} />
            <h3>Media Buyers</h3>
            <p>See what's working before you spend.</p>
          </div>
          <div className="who-card">
            <PieChart size={28} strokeWidth={1.5} />
            <h3>Ecom Brands</h3>
            <p>Monitor competitors and spot trends.</p>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="features-list">
        <h2>Ad Spy Features (Coming Soon)</h2>
        <div className="list-grid">
          <div className="list-item"><Check size={20} /><span>Facebook Ads Library search</span></div>
          <div className="list-item"><Check size={20} /><span>Google Ads discovery</span></div>
          <div className="list-item"><Check size={20} /><span>Ad creative screenshots</span></div>
          <div className="list-item"><Check size={20} /><span>Landing page analysis</span></div>
          <div className="list-item"><Check size={20} /><span>Estimated spend data</span></div>
          <div className="list-item"><Check size={20} /><span>AI ad analysis</span></div>
          <div className="list-item"><Check size={20} /><span>Competitor tracking</span></div>
          <div className="list-item"><Check size={20} /><span>New ad alerts</span></div>
          <div className="list-item"><Check size={20} /><span>Historical ad data</span></div>
          <div className="list-item"><Check size={20} /><span>Export to CSV</span></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Is Ad Spy really free?</h3>
            <p>Yes! We're launching with a <strong>free forever plan</strong>. No credit card required. No hidden fees. Premium plans for power users coming soon.</p>
          </div>
          <div className="faq-item">
            <h3>How does the free ad spy work?</h3>
            <p>Enter any competitor's website. We scan Facebook and Google's ad libraries and show you every active ad. It's that simple.</p>
          </div>
          <div className="faq-item">
            <h3>Can I see ad spend estimates?</h3>
            <p>Coming soon! Our AI estimates spend based on ad frequency and creative variety.</p>
          </div>
          <div className="faq-item">
            <h3>Is this like Facebook Ad Library?</h3>
            <p>Better! We combine Facebook Ad Library + Google Ads + AI analysis + tracking into one free tool.</p>
          </div>
          <div className="faq-item">
            <h3>When is Ad Spy launching?</h3>
            <p>Coming soon! Join the waitlist to get <strong>free early access</strong>.</p>
          </div>
          <div className="faq-item">
            <h3>Do you have an API?</h3>
            <p>Yes! Enterprise plans with API access coming soon.</p>
          </div>
        </div>
      </section>

      {/* SEO Keywords Section */}
      <section className="keywords-section">
        <h2>What Is Ad Spy? Free Tool for Competitor Ad Intelligence</h2>
        <div className="keywords-content">
          <p>
            <strong>Ad Spy</strong> is a free online tool that helps digital marketers, media buyers, and e-commerce brands 
            <strong>spy on their competitors' advertising</strong>. Just enter any website URL — 
            we'll show you every ad they're running on <strong>Facebook</strong> and <strong>Google</strong>.
          </p>
          <p>
            Think of it as a <strong>free Facebook Ad Library alternative</strong> that also includes Google Ads, 
            landing page analysis, and AI-powered insights. Whether you're a performance marketer, agency owner, 
            or e-commerce brand — Ad Spy helps you find winning ads fast.
          </p>
          <p>
            <strong>Key searches people use Ad Spy for:</strong> free ad spy tool, competitor ad analyzer, 
            facebook ad spy, google ads spy, ad intelligence tool, ad spy software, find competitor ads, 
            ads library alternative, marketing intelligence, competitor research tool.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta">
        <h2>Get Free Early Access</h2>
        <p>Join the waitlist. Be first to use Ad Spy — free forever.</p>
        
        {submitted ? (
          <div className="success-card success-inline"><span>✅ You're on the list!</span></div>
        ) : (
          <form onSubmit={handleSubmit} className="waitlist-form inline">
            <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" disabled={loading}>{loading ? 'Joining...' : 'Join Waitlist'}</button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Ad SpyDr — Coming Soon. All rights reserved.</p>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #C4CBCA; color: #0A0F0D; line-height: 1.6; overflow-x: hidden; min-height: 100vh; width: 100vw; }
        .coming-soon { min-height: 100vh; }
        
        .header { position: absolute; top: 0; left: 0; right: 0; z-index: 100; padding: 24px; background: transparent; }
        .header-container { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.6rem; font-weight: 700; display: flex; align-items: center; gap: 8px; }
        .logo-icon { font-size: 1.4rem; }
        .badge { background: linear-gradient(135deg, #F95738, #F95738); color: #0A0F0D; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 100px 24px; position: relative; overflow: hidden; background: #C4CBCA; }
        .hero::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(249,87,56,0.08) 0%, transparent 50%); animation: pulse 8s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 0.8; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(249,87,56,0.3); } 50% { box-shadow: 0 0 40px rgba(249,87,56,0.6); } }
        .hero-content { max-width: 800px; position: relative; z-index: 2; margin: 0 auto; text-align: center; padding-top: 60px; animation: fadeInUp 1s ease-out; }
        .hero-content h1 { animation: fadeInUp 1s ease-out 0.2s backwards; }
        .hero-content p { animation: fadeInUp 1s ease-out 0.4s backwards; }
        .hero-content form { animation: fadeInUp 1s ease-out 0.6s backwards; }
        .hero-content p.note { animation: fadeInUp 1s ease-out 0.8s backwards; }
        .hero-content { max-width: 800px; position: relative; z-index: 2; margin: 0 auto; text-align: center; padding-top: 60px; }

        h1 { font-size: 2.8rem; font-weight: 700; margin-bottom: 20px; line-height: 1.2; }
        .subtitle { font-size: 1.15rem; color: #0A0F0D; margin-bottom: 32px; line-height: 1.7; }
        .subtitle strong { color: #F95738; }
        
        .waitlist-form { display: flex; gap: 12px; max-width: 480px; margin: 0 auto 20px; }
        .waitlist-form.inline { max-width: 420px; margin: 24px auto 0; }
        .waitlist-form input { flex: 1; padding: 16px 20px; border: 1px solid rgba(10,15,13,0.2); border-radius: 12px; background: white; color: #0A0F0D; font-size: 1rem; }
        .waitlist-form input:focus { outline: none; border-color: #F95738; }
        .waitlist-form button { padding: 16px 36px; background: linear-gradient(135deg, #F95738, #F95738); color: #0A0F0D; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 1rem; }
        .waitlist-form button:disabled { opacity: 0.7; }
        .note { color: #0A0F0D; font-size: 0.9rem; }
        .note strong { color: #F95738; }
        
        .success-card { display: flex; align-items: center; gap: 16px; background: rgba(249,87,56,0.1); border: 1px solid rgba(249,87,56,0.3); padding: 20px; border-radius: 12px; max-width: 480px; margin: 0 auto 20px; text-align: left; }
        .success-inline { display: inline-flex; margin-top: 16px; }
        .success-card h3 { font-size: 1.1rem; margin-bottom: 4px; }
        .success-card p { color: #0A0F0D; font-size: 0.9rem; }
        
        section { padding: 70px 24px; position: relative; z-index: 1; }
        
        .main-benefit { background: #C4CBCA; padding: 60px 24px; text-align: center; }
        .benefit-content { max-width: 800px; margin: 0 auto; }
        .benefit-content h2 { font-size: 1.8rem; margin-bottom: 20px; color: #0A0F0D; }
        .benefit-text { font-size: 1.1rem; color: #0A0F0D; line-height: 1.8; }
        .benefit-text strong { color: #F95738; }
        
        .stats-banner { background: linear-gradient(135deg, #F95738, #F95738); padding: 48px 24px; }
        .stats-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
        .stat-num { display: block; font-size: 2.2rem; font-weight: 700; color: #0A0F0D; }
        .stat-label { font-size: 0.85rem; color: rgba(0,0,0,0.7); }
        
        .features, .who-for, .features-list, .keywords-section { background: #C4CBCA; }
        .features h2, .benefits h2, .cta h2, .how-it-works h2, .who-for h2, .features-list h2, .faq-section h2, .why-need h2, .keywords-section h2, .main-benefit h2 { text-align: center; font-size: 1.8rem; margin-bottom: 36px; color: #0A0F0D; }
        
        .features-grid, .who-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1000px; margin: 0 auto; }
        .feature-card, .who-card { background: #C4CBCA; padding: 28px; border-radius: 14px; text-align: center; border: 1px solid rgba(10,15,13,0.2); transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .feature-card:hover { border-color: #F95738; transform: scale(1.02) translateY(-4px); }
        .feature-icon { display: flex; align-items: center; justify-content: center; width: 58px; height: 58px; margin: 0 auto 16px; background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05)); border-radius: 14px; color: #F95738; }
        .feature-card h3 { font-size: 1rem; margin-bottom: 8px; }
        .feature-card p { color: #0A0F0D; font-size: 0.85rem; }
        
        .how-it-works { background: #C4CBCA; }
        .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1000px; margin: 0 auto; }
        .step { text-align: left; padding: 20px; border-left: 3px solid #F95738; }
        .step-num { font-size: 1.8rem; font-weight: 700; color: #F95738; margin-bottom: 10px; }
        .step h3 { font-size: 1rem; margin-bottom: 6px; }
        .step p { color: #0A0F0D; font-size: 0.85rem; }
        
        .why-need { background: #C4CBCA; }
        .need-list { max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 18px; }
        .need-item { display: flex; gap: 14px; align-items: flex-start; }
        .need-item svg { color: #F95738; flex-shrink: 0; margin-top: 3px; }
        .need-item h3 { font-size: 1rem; margin-bottom: 4px; }
        .need-item p { color: #0A0F0D; font-size: 0.9rem; }
        
        .list-grid { max-width: 700px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .list-item { display: flex; align-items: center; gap: 10px; color: #0A0F0D; font-size: 0.95rem; }
        .list-item svg { color: #F95738; }
        
        .faq-section { background: #C4CBCA; }
        .faq-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .faq-item { background: #C4CBCA; padding: 22px; border-radius: 12px; }
        .faq-item h3 { font-size: 0.95rem; margin-bottom: 8px; }
        .faq-item p { color: #0A0F0D; font-size: 0.85rem; }
        .faq-item p strong { color: #F95738; }
        
        .keywords-section { background: #C4CBCA; }
        .keywords-content { max-width: 800px; margin: 0 auto; text-align: center; }
        .keywords-content p { color: #0A0F0D; font-size: 1.05rem; line-height: 1.8; margin-bottom: 16px; }
        .keywords-content p strong { color: #F95738; }
        
        .cta { background: #C4CBCA; text-align: center; }
        .cta p { color: #0A0F0D; margin-bottom: 24px; font-size: 1.05rem; }
        
        .footer { text-align: center; padding: 30px; color: #555; font-size: 0.8rem; }
        
        @media (max-width: 768px) {
          h1 { font-size: 2rem; }
          .hero-content { margin: 0 auto; }
          .hero-web { width: 300px; height: 300px; left: -60px; }
          .stats-grid, .features-grid, .who-grid, .steps-grid, .list-grid, .faq-grid { grid-template-columns: 1fr; }
          .waitlist-form { flex-direction: column; }
          .waitlist-form button { width: 100%; }
        }
      `}</style>
    </div>
  );
}