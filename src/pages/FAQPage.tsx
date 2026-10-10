import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Layout from '../components/Layout';
import { useStaggerReveal } from '../hooks/useReveal';

const faqs = [
  {
    question: 'What services does Fixers offer?',
    answer:
      'Fixers offers 8 core services: Website Development (React, Vue, Laravel), E-commerce Solutions (Shopify & WooCommerce), Responsive Design, Custom Web Applications, Website Maintenance, SEO Optimization, Social Media Marketing, and Social Media Management.',
  },
  {
    question: 'Do you use templates or custom code?',
    answer:
      'We write custom code for every project. No WordPress themes, no page builders. Every site is hand-coded with React, Vue, or Laravel — giving you faster load times, better SEO, and complete flexibility.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Most projects are delivered in 2–6 weeks depending on scope. A landing page might take 1–2 weeks, while a full e-commerce site or custom web app can take 4–6 weeks. We provide clear timelines before starting any work.',
  },
  {
    question: 'What technologies do you work with?',
    answer:
      'Our tech stack includes React, Vue.js, Laravel, Node.js, TypeScript, Three.js, WebGL, Shopify, WooCommerce, Supabase, SQLite, WebSocket, and PeerJS. We choose the right tool for each project.',
  },
  {
    question: 'Do you work with US clients?',
    answer:
      "Yes — we specialize in working with US small businesses. We understand the US market, timezone coordination, and local SEO requirements. We're based in Faisalabad, Pakistan but serve clients globally.",
  },
  {
    question: 'How does pricing work?',
    answer:
      "We provide transparent, fixed-price quotes before any work begins. No hidden fees, no hourly surprises. Every quote includes a detailed breakdown of what's included, delivery timeline, and revision rounds.",
  },
  {
    question: 'What happens after the website launches?',
    answer:
      "We don't disappear after launch. Our ongoing support includes speed monitoring, security patches, content updates, and performance optimization. We offer monthly maintenance packages to keep your site running at peak performance.",
  },
  {
    question: 'How do I get started?',
    answer:
      "Simple — click the 'Start a Project' button or message us on WhatsApp. We'll schedule a discovery call to understand your business, goals, and requirements. From there, we provide a detailed proposal with scope, timeline, and pricing.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useStaggerReveal<HTMLDivElement>();

  return (
    <Layout>
      <div ref={ref}>
        <section className="bg-[#050505] pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12">
          <div className="max-w-[800px] mx-auto px-5 sm:px-8 lg:px-12">
            <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4 reveal">FAQ</p>
            <h1 className="text-white text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-4 reveal">
              Questions? Answered.
            </h1>
            <p className="text-[#888] text-sm sm:text-[15px] reveal">
              Everything you need to know before starting a project with us.
            </p>
          </div>
        </section>

        <section className="bg-[#050505] pb-24 sm:pb-32 lg:pb-40">
          <div className="max-w-[800px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="reveal border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                  >
                    <span className="text-white text-sm sm:text-[15px] font-medium pr-4">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className="text-[#888] flex-shrink-0 transition-transform duration-300"
                      style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    style={{ maxHeight: open === i ? '300px' : '0px', opacity: open === i ? 1 : 0 }}
                  >
                    <p className="text-[#888] text-sm leading-[1.7] px-5 pb-4">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
