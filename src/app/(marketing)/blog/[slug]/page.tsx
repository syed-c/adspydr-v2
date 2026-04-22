'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  published_at: string;
  category: string;
  read_time: number;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blogs?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data.post);
        }
      } catch (e) {
        // Demo data
        setPost({
          id: '1',
          title: 'How to Spy on Competitor Ads in 2026',
          slug: slug,
          excerpt: 'Learn the best strategies to find and analyze competitor advertisements.',
          content: `
## Why Spy on Competitor Ads?

Understanding what your competitors are advertising can give you a massive edge in the market. Here's how to do it effectively.

### Step 1: Choose Your Target

Start by selecting a competitor in your niche. Look for businesses that:
- Are in your industry
- Have a similar target audience
- Are actively advertising

### Step 2: Use Ad Spy Tools

Tools like Ad SpyDR let you:
- See active Facebook ads
- View Google advertisements  
- Analyze ad creative strategies
- Get AI-powered insights

### Step 3: Analyze the Data

Look for patterns in:
- **Messaging themes** - What benefits do they emphasize?
- **Hooks** - What's their opening hook?
- **CTAs** - What action do they want users to take?
- **Offers** - What incentives do they offer?

### Step 4: Apply to Your Business

Use what you learn to:
- Create better ad copy
- Improve your targeting
- Differentiate from competitors
- Test new angles

## Conclusion

Spying on competitor ads is essential for staying competitive. Use these strategies to create better ads and grow your business faster.
          `,
          cover_image: '',
          author: 'Ad SpyDR Team',
          published_at: '2026-04-15',
          category: 'Tips',
          read_time: 5
        });
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  // Demo related posts
  useEffect(() => {
    setRelatedPosts([
      { id: '2', title: 'Facebook vs Google Ads', slug: 'facebook-vs-google-ads', excerpt: 'Comparing the two biggest platforms.', content: '', cover_image: '', author: 'Ad SpyDR Team', published_at: '2026-04-10', category: 'Comparison', read_time: 7 },
      { id: '3', title: 'Top Ad Spy Tools', slug: 'top-ad-spy-tools-2026', excerpt: 'Best tools reviewed.', content: '', cover_image: '', author: 'Ad SpyDR Team', published_at: '2026-04-05', category: 'Tools', read_time: 8 },
    ]);
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="loading-container"><div className="loading">Loading...</div></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page">
        <div className="loading-container"><div className="loading">Post not found</div></div>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
      if (line.startsWith('- ')) return <li key={i}>{line.replace('- ', '')}</li>;
      if (line.trim()) return <p key={i}>{line}</p>;
      return <br key={i} />;
    });
  };

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

      {/* Article */}
      <article className="article">
        <div className="article-header">
          <Link href="/blog" className="back-link">← Back to Blog</Link>
          <div className="article-meta">
            <span className="article-category">{post.category}</span>
            <span>{post.published_at}</span> • <span>{post.read_time} min read</span>
          </div>
          <h1>{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>
          <div className="article-author">By {post.author}</div>
        </div>

        <div className="article-content">
          {renderContent(post.content)}
        </div>

        {/* Share */}
        <div className="article-share">
          <p>Share this article:</p>
          <div className="share-buttons">
            <button>Twitter</button>
            <button>LinkedIn</button>
            <button>Copy Link</button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="related-section">
        <div className="section-container">
          <h2>Related Articles</h2>
          <div className="related-grid">
            {relatedPosts.map(rp => (
              <Link key={rp.id} href={`/blog/${rp.slug}`} className="related-card">
                <span className="related-category">{rp.category}</span>
                <h3>{rp.title}</h3>
                <p>{rp.excerpt}</p>
              </Link>
            ))}
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