'use client';

import Link from 'next/link';
import { useState } from 'react';
import '@/components/layout.css';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    popular: false,
    features: [
      '5 searches per month',
      'Basic ad insights',
      'Facebook + Google ads',
      'Email support',
      'Ad copy extraction'
    ],
    cta: 'Get Started Free',
    ctaPrimary: false
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For serious marketers',
    popular: true,
    features: [
      'Unlimited searches',
      'AI strategy analysis',
      'Competitor alerts',
      'Export reports (CSV)',
      'Priority support',
      'Historical ads data',
      'Landing page spy'
    ],
    cta: 'Start Free Trial',
    ctaPrimary: true
  },
  {
    name: 'Agency',
    price: '$99',
    period: '/month',
    description: 'For teams and agencies',
    popular: false,
    features: [
      'Everything in Pro',
      '5 team members',
      'API access',
      'Custom integrations',
      'Dedicated support',
      'White-label reports',
      'Track 20 competitors'
    ],
    cta: 'Contact Sales',
    ctaPrimary: false
  }
];

const comparisons = [
  { feature: 'Monthly Searches', free: '5', pro: 'Unlimited', agency: 'Unlimited' },
  { feature: 'Facebook Ads', free: '✓', pro: '✓', agency: '✓' },
  { feature: 'Google Ads', free: '✓', pro: '✓', agency: '✓' },
  { feature: 'AI Analysis', free: 'Basic', pro: 'Full', agency: 'Full' },
  { feature: 'Competitor Alerts', free: '✗', pro: '✓', agency: '✓' },
  { feature: 'Export Reports', free: '✗', pro: '✓', agency: '✓' },
  { feature: 'Historical Data', free: '✗', pro: '✓', agency: '✓' },
  { feature: 'API Access', free: '✗', pro: '✗', agency: '✓' },
  { feature: 'Team Members', free: '1', pro: '1', agency: '5' },
  { feature: 'Support', free: 'Email', pro: 'Priority', agency: 'Dedicated' }
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

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
      <section className="pricing-hero">
        <div className="hero-bg"></div>
        <div className="hero-container">
          <h1 className="hero-title">Simple, Transparent<br /><span>Pricing</span></h1>
          <p className="hero-subtitle">Start free, scale as you grow. No hidden fees, cancel anytime.</p>
          
          <div className="billing-toggle">
            <button className={`toggle-btn ${!annual ? 'active' : ''}`} onClick={() => setAnnual(false)}>Monthly</button>
            <button className={`toggle-btn ${annual ? 'active' : ''}`} onClick={() => setAnnual(true)}>Annual <span className="save-badge">Save 20%</span></button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-section">
        <div className="section-container">
          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="pricing-badge">✓ Best Value</div>}
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-price">{plan.price}{plan.period && <span className="pricing-period">{plan.period}</span>}</div>
                <p className="pricing-desc">{plan.description}</p>
                <ul className="pricing-features">
                  {plan.features.map((feature, i) => (<li key={i}>✓ {feature}</li>))}
                </ul>
                <Link href="/auth/signup" className={`btn-pricing ${plan.ctaPrimary ? 'primary' : ''}`}>{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="comparison-section">
        <div className="section-container">
          <h2 className="section-title">Compare Plans</h2>
          <div className="comparison-table">
            <table>
              <thead><tr><th>Feature</th><th>Free</th><th>Pro</th><th>Agency</th></tr></thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index}><td>{row.feature}</td><td>{row.free}</td><td>{row.pro}</td><td>{row.agency}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="section-container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item"><h3>Can I cancel anytime?</h3><p>Yes! Cancel anytime with no hidden fees.</p></div>
            <div className="faq-item"><h3>What payment methods?</h3><p>We accept all major credit cards and PayPal.</p></div>
            <div className="faq-item"><h3>Free trial?</h3><p>Yes! 14-day free trial on Pro. No credit card required.</p></div>
            <div className="faq-item"><h3>Change plan?</h3><p>Upgrade or downgrade anytime.</p></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="section-container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands using Ad SpyDR</p>
          <Link href="/auth/signup" className="btn-cta">Start Free Now</Link>
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