'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import '@/components/layout.css';

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
  featured: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (data.posts?.length > 0) {
          setPosts(data.posts);
        }
      } catch (e) {
        console.error('Failed to fetch blogs:', e);
      }
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  const categories = ['all', 'Tips', 'Comparison', 'Tools', 'AI', 'Strategy'];
  const filteredPosts = category === 'all' ? posts : posts.filter(p => p.category === category);
  const featuredPost = posts.find(p => p.featured);

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <h1>Blog</h1>
          <p>Latest insights on ad spy tools and competitor analysis.</p>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="empty">
            <p>No blog posts yet.</p>
          </div>
        ) : (
          <>
            {featuredPost && (
              <div className="featured">
                <div className="featured-content">
                  <span className="featured-label">Featured</span>
                  <h2>{featuredPost.title}</h2>
                  <p>{featuredPost.excerpt}</p>
                  <Link href={`/blog/${featuredPost.slug}`} className="btn-read">
                    Read More →
                  </Link>
                </div>
              </div>
            )}

            <div className="category-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`tab ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="posts-grid">
              {filteredPosts.map(post => (
                <div key={post.id} className="post-card">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-meta">
                    <span>{post.read_time} min read</span>
                    <span>•</span>
                    <span>{post.category}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="btn-link">
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        .page { padding: 60px 24px; }
        .page-container { max-width: 900px; margin: 0 auto; }
        .page-header { text-align: center; margin-bottom: 40px; }
        .page-header h1 { font-size: 2.5rem; margin-bottom: 8px; }
        .page-header p { color: #6b6b6b; }
        .loading { text-align: center; padding: 60px; color: #6b6b6b; }
        .empty { text-align: center; padding: 60px; }
        .featured { background: #f5f5f5; border-radius: 12px; padding: 32px; margin-bottom: 32px; }
        .featured-label { display: inline-block; background: #0d0d0d; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; margin-bottom: 12px; }
        .featured h2 { font-size: 1.5rem; margin-bottom: 8px; }
        .featured p { color: #525252; margin-bottom: 16px; }
        .btn-read { color: #0d0d0d; font-weight: 600; text-decoration: none; }
        .category-tabs { display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; }
        .tab { background: #f5f5f5; border: none; padding: 10px 20px; border-radius: 50px; cursor: pointer; font-size: 0.9rem; }
        .tab.active { background: #0d0d0d; color: white; }
        .posts-grid { display: grid; gap: 20px; }
        .post-card { border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; background: white; }
        .post-card h3 { font-size: 1.2rem; margin-bottom: 8px; }
        .post-card p { color: #525252; font-size: 0.95rem; margin-bottom: 16px; }
        .post-meta { display: flex; gap: 8px; font-size: 0.8rem; color: #737373; margin-bottom: 16px; }
        .btn-link { color: #0d0d0d; font-weight: 500; text-decoration: none; }
      `}</style>
    </div>
  );
}