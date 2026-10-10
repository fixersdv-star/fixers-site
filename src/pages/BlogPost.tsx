import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { WHATSAPP_URL } from '../data/site';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? blogPosts[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl font-medium mb-4">Post not found</h1>
          <button onClick={() => navigate('/blog')} className="text-[#E8734A] hover:underline">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const related = Object.entries(blogPosts)
    .filter(([key]) => key !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050505]">
      <nav className="w-full border-b border-[#1a1a1a] bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-[#888] hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </button>
          <span className="text-white text-sm font-semibold">Fixers Blog</span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E8734A] text-sm font-medium hover:underline"
          >
            Start a Project
          </a>
        </div>
      </nav>

      <article className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-[11px] font-medium text-[#E8734A] bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-[#666] text-xs">
            <Clock size={12} />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1 text-[#666] text-xs">
            <Calendar size={12} />
            {post.date}
          </span>
        </div>

        <h1 className="text-white text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] mb-6">
          {post.title}
        </h1>

        <p className="text-[#aaa] text-base sm:text-lg leading-[1.7] mb-10 border-b border-[#1a1a1a] pb-10">
          {post.excerpt}
        </p>

        <div className="prose prose-invert max-w-none">
          {post.content.split('\n\n').map((block, i) =>
            block.startsWith('## ') ? (
              <h2 key={i} className="text-white text-xl sm:text-2xl font-semibold mt-10 mb-4">
                {block.replace('## ', '')}
              </h2>
            ) : (
              <p key={i} className="text-[#bbb] text-sm sm:text-[15px] leading-[1.8] mb-5">
                {block}
              </p>
            ),
          )}
        </div>

        <div className="mt-16 pt-10 border-t border-[#1a1a1a] text-center">
          <p className="text-[#888] text-sm mb-4">Need help with your digital presence?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E8734A] hover:bg-[#d56a3f] text-white text-sm font-medium rounded-full px-6 py-3 transition-colors"
          >
            Let's Talk
          </a>
        </div>
      </article>

      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 pb-16">
        <h3 className="text-white text-lg font-semibold mb-6">More from the Blog</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map(([key, item]) => (
            <button
              key={key}
              onClick={() => navigate(`/blog/${key}`)}
              className="text-left border border-[#1a1a1a] rounded-xl p-5 bg-[#0a0a0a] hover:border-[#333] transition-all duration-300"
            >
              <span className="text-[11px] font-medium text-[#E8734A] bg-[#1a1a1a] px-2.5 py-1 rounded-full">
                {item.category}
              </span>
              <h4 className="text-white text-sm font-semibold mt-3 leading-[1.4] hover:text-[#E8734A] transition-colors">
                {item.title}
              </h4>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
