import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo">Ad SpyDr</div>
          <p>The #1 free tool to spy on competitor ads.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Product</h4>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Contact</a>
            <a href="#">Help</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2026 Ad SpyDr. All rights reserved.</div>
    </footer>
  );
}