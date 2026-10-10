import { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  CodeXml,
  Globe,
  Search,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react';
import Layout from '../components/Layout';
import { useStaggerReveal } from '../hooks/useReveal';
import { WHATSAPP_URL } from '../data/site';

const services = [
  {
    icon: <Globe size={22} />,
    title: 'Website Development',
    short: 'Custom platforms with React, Vue, Laravel',
    detail:
      'Your website is your digital storefront. We build custom websites using React, Vue, and Laravel — hand-coded for your specific business needs. No templates, no bloat. Every line of code serves a purpose: faster load times, better SEO rankings, and higher conversion rates.',
  },
  {
    icon: <ShoppingCart size={22} />,
    title: 'E-commerce Solutions',
    short: 'Shopify & WooCommerce with CRO',
    detail:
      'Selling online requires more than just a product catalog. We specialize in Shopify and WooCommerce development with conversion rate optimization (CRO) built in. From seamless checkout flows to strategic product page layouts, we design every touchpoint to maximize sales.',
  },
  {
    icon: <Smartphone size={22} />,
    title: 'Responsive Design',
    short: 'Mobile-first, cross-device compatible',
    detail:
      "Over 60% of web traffic comes from mobile devices. We design mobile-first, ensuring your site looks stunning and functions perfectly on every screen size — from iPhones to 4K monitors. Cross-device compatibility isn't an afterthought; it's baked into every design decision we make.",
  },
  {
    icon: <CodeXml size={22} />,
    title: 'Custom Web Applications',
    short: 'SaaS platforms, CRM integration',
    detail:
      'Need something beyond a standard website? We build custom web applications — SaaS platforms, CRM integrations, dashboards, and internal tools. Using React, TypeScript, and Node.js, we create powerful software that automates your workflows and scales with your business.',
  },
  {
    icon: <Wrench size={22} />,
    title: 'Website Maintenance',
    short: 'Speed tuning, security patches',
    detail:
      "A website isn't a one-time build — it needs ongoing care. Our maintenance services include speed & performance tuning, security patches, regular backups, uptime monitoring, and content updates. We keep your site fast, secure, and always up-to-date so you can focus on running your business.",
  },
  {
    icon: <Search size={22} />,
    title: 'SEO Optimization',
    short: 'Technical SEO, ranking strategy',
    detail:
      'The best website is useless if nobody finds it. Our SEO optimization services cover technical SEO (site speed, schema markup, crawlability), on-page optimization (keywords, meta tags, content structure), and ranking strategy. We help US small businesses rank higher on Google and attract organic traffic that converts.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Social Media Marketing',
    short: 'Data-driven brand growth strategies',
    detail:
      'Social media is where your customers spend their time. We create data-driven marketing strategies that build brand awareness, drive engagement, and generate leads. From content calendars to paid ad campaigns, we manage every aspect of your social presence across Instagram, Facebook, TikTok, and LinkedIn.',
  },
  {
    icon: <Users size={22} />,
    title: 'Social Media Management',
    short: 'Content creation, posting, community',
    detail:
      'Consistent, high-quality social media presence requires time and expertise. Our full-service social media management covers content creation, graphic design, video editing, daily posting, community engagement, and analytics reporting. We become your in-house social media team at a fraction of the cost.',
  },
];

const differentiators = [
  {
    title: 'Custom Code, No Templates',
    desc: 'Every site is hand-coded for your specific needs. No cookie-cutter themes. No bloat. Just clean, fast, purpose-built code.',
  },
  {
    title: 'Fast Turnaround',
    desc: 'Projects delivered on time without compromising quality. Weekly demos keep you in the loop from day one.',
  },
  {
    title: 'Transparent Pricing',
    desc: "Clear quotes before any work starts. No hidden fees, no surprise invoices. You know exactly what you're paying for.",
  },
  {
    title: 'Ongoing Support',
    desc: "Maintenance and updates included after launch. We're not a one-and-done agency — we're with you for the long haul.",
  },
];

export default function ServicesPage() {
  const [active, setActive] = useState<number | null>(null);
  const ref = useStaggerReveal<HTMLDivElement>();

  return (
    <Layout>
      <div ref={ref}>
        <section className="bg-[#050505] pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4 reveal">WHAT WE DO</p>
            <h1 className="text-white text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-4 reveal">
              8 Core Services
            </h1>
            <p className="text-[#888] text-sm sm:text-[15px] max-w-xl reveal">
              From custom websites to social media dominance — everything your business needs to grow online.
            </p>
          </div>
        </section>

        <section className="bg-[#050505] pb-16 sm:pb-20 lg:pb-28">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service, i) => (
                <div
                  key={service.title}
                  className="reveal group border border-[#1a1a1a] rounded-xl p-5 sm:p-6 bg-[#0a0a0a] hover:border-[#333] transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(active === i ? null : i)}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#E8734A] mb-4 group-hover:bg-[#2a1a10] transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-white text-[15px] font-semibold mb-1.5">{service.title}</h3>
                  <p className="text-[#888] text-xs sm:text-sm leading-[1.6] mb-3">{service.short}</p>
                  <div
                    className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    style={{ maxHeight: active === i ? '200px' : '0px', opacity: active === i ? 1 : 0 }}
                  >
                    <p className="text-[#aaa] text-xs leading-[1.7] pt-2 border-t border-[#1a1a1a]">{service.detail}</p>
                  </div>
                  <button className="flex items-center gap-1 text-[#E8734A] text-xs font-medium mt-2 group-hover:gap-2 transition-all duration-300">
                    Why it matters
                    <ChevronDown
                      size={12}
                      className="transition-transform duration-300"
                      style={{ transform: active === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#050505] py-24 sm:py-32 lg:py-40 border-t border-[#1a1a1a]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="reveal">
                <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4">WHY FIXERS</p>
                <h2 className="text-white text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-6">
                  What makes us
                  <br />
                  <em className="font-serif italic">different</em>
                </h2>
                <p className="text-[#888] text-sm sm:text-[15px] leading-[1.7] mb-8 max-w-md">
                  We don't just build websites — we build relationships. Every project is a collaboration, not a
                  transaction.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-[#E8734A] hover:bg-[#d56a3f] text-white text-sm font-medium rounded-full pl-6 pr-2 py-3 transition-colors duration-300"
                >
                  <span>Start a Conversation</span>
                  <span className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                    <ArrowRight size={14} className="text-white" />
                  </span>
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {differentiators.map((item) => (
                  <div
                    key={item.title}
                    className="reveal border border-[#1a1a1a] rounded-xl p-5 sm:p-6 bg-[#0a0a0a] hover:border-[#333] transition-colors duration-300"
                  >
                    <h3 className="text-white text-[15px] font-semibold mb-2">{item.title}</h3>
                    <p className="text-[#888] text-xs sm:text-sm leading-[1.7]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
