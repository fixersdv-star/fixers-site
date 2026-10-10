import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import Layout from '../components/Layout';
import { useStaggerReveal } from '../hooks/useReveal';
import { blogList } from '../data/blogPosts';

export default function BlogPage() {
  const navigate = useNavigate();
  const ref = useStaggerReveal<HTMLDivElement>();

  return (
    <Layout>
      <div ref={ref}>
        <section className="bg-[#050505] pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4 reveal">FROM THE BLOG</p>
            <h1 className="text-white text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-4 reveal">
              Insights &amp; Ideas
            </h1>
            <p className="text-[#888] text-sm sm:text-[15px] reveal">
              Thoughts on web development, SEO, social media, and growing your business online.
            </p>
          </div>
        </section>

        <section className="bg-[#050505] pb-24 sm:pb-32 lg:pb-40">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogList.map((post) => (
                <article
                  key={post.slug}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="reveal group border border-[#1a1a1a] rounded-xl p-5 sm:p-6 bg-[#0a0a0a] hover:border-[#333] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[11px] font-medium text-[#E8734A] bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-[#666]">{post.readTime}</span>
                  </div>
                  <h3 className="text-white text-[15px] font-semibold mb-2 leading-[1.4] group-hover:text-[#E8734A] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-[#888] text-xs sm:text-sm leading-[1.7] mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-[#666] text-xs">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
