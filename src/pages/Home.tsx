import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  CodeXml,
  Eye,
  FileCode,
  Globe,
  HeartHandshake,
  MessageSquare,
  Rocket,
  Search,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Hero from '../sections/Hero';
import { useScrollReveal } from '../hooks/useReveal';
import { EMAIL, LOGO_URL, QR_CODE_URL, QUICK_LINKS, STATS, WEBSITE_URL, WHATSAPP_URL } from '../data/site';

const webServices = [
  {
    icon: <Globe size={22} />,
    title: 'Website Development',
    desc: 'Custom websites built with React, Vue, and Laravel. Hand-coded for your specific business needs — no templates, no bloat.',
  },
  {
    icon: <ShoppingCart size={22} />,
    title: 'E-commerce Solutions',
    desc: 'Shopify and WooCommerce development with conversion rate optimization. Seamless checkout flows that maximize sales.',
  },
  {
    icon: <Smartphone size={22} />,
    title: 'Responsive Design',
    desc: 'Mobile-first design ensuring your site looks stunning on every screen — from iPhones to 4K monitors.',
  },
  {
    icon: <CodeXml size={22} />,
    title: 'Custom Web Applications',
    desc: 'SaaS platforms, CRM integrations, dashboards, and internal tools built with React, TypeScript, and Node.js.',
  },
];

const marketingServices = [
  {
    icon: <TrendingUp size={22} />,
    title: 'Social Media Marketing',
    desc: 'Data-driven strategies that build brand awareness, drive engagement, and generate leads across Instagram, Facebook, TikTok, and LinkedIn.',
  },
  {
    icon: <Users size={22} />,
    title: 'Social Media Management',
    desc: 'Full-service management: content creation, graphic design, video editing, daily posting, community engagement, and analytics.',
  },
  {
    icon: <Search size={22} />,
    title: 'SEO Optimization',
    desc: 'Technical SEO, on-page optimization, and ranking strategy to help your business rank higher on Google.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Performance Tuning',
    desc: 'Speed optimization, Core Web Vitals improvement, and ongoing maintenance to keep your site running at peak performance.',
  },
];

const whyFixers = [
  {
    icon: <FileCode size={20} />,
    title: 'Custom Code, No Templates',
    desc: 'Every site is hand-coded from scratch. No WordPress themes. No page builders. Just clean, fast, scalable code.',
  },
  {
    icon: <Clock size={20} />,
    title: 'Fast Turnaround',
    desc: 'Projects delivered in 2-6 weeks. Weekly demos keep you in the loop from day one.',
  },
  {
    icon: <Eye size={20} />,
    title: 'Transparent Pricing',
    desc: 'Clear quotes before any work starts. No hidden fees, no surprise invoices.',
  },
  {
    icon: <HeartHandshake size={20} />,
    title: 'Ongoing Support',
    desc: "Maintenance and updates included after launch. We're with you for the long haul.",
  },
];

const ServiceCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="reveal group border border-[#1a1a1a] rounded-xl p-5 sm:p-6 bg-[#0a0a0a] hover:border-[#333] transition-all duration-300">
    <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#E8734A] mb-4 group-hover:bg-[#2a1a10] transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-white text-[15px] font-semibold mb-2">{title}</h3>
    <p className="text-[#888] text-xs sm:text-sm leading-[1.7]">{desc}</p>
  </div>
);

const ViewAllServices = () => (
  <div className="reveal mt-8 text-center">
    <Link
      to="/services"
      className="group inline-flex items-center gap-2 text-[#E8734A] text-sm font-medium hover:underline"
    >
      View all services
      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  </div>
);

export default function Home() {
  const contentRef = useScrollReveal<HTMLDivElement>();

  return (
    <div>
      <Hero />

      <div ref={contentRef} className="bg-[#050505]">
        {/* About */}
        <section className="py-24 sm:py-32 lg:py-40 border-t border-[#1a1a1a]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="reveal">
                <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4">ABOUT FIXERS</p>
                <h2 className="text-white text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-6">
                  We build digital
                  <br />
                  <em className="font-serif italic">solutions that work</em>
                </h2>
                <p className="text-[#888] text-sm sm:text-[15px] leading-[1.7] mb-6">
                  Fixers is a full-service digital agency founded by
                  <span className="text-white"> Mr. Abdul Wahab </span>
                  and
                  <span className="text-white"> Ahmad Murtaza</span>. Based in Faisalabad, Pakistan, we work with
                  businesses across the US and beyond to build custom websites, powerful web applications, and
                  data-driven social media strategies.
                </p>
                <p className="text-[#888] text-sm sm:text-[15px] leading-[1.7] mb-8">
                  Our mission is simple: fuel business growth through optimized digital ecosystems. Every line of code
                  we write, every campaign we run, every design we create serves one purpose — turning clicks into
                  customers.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <span className="w-8 h-8 rounded-full bg-[#E8734A] flex items-center justify-center text-white text-xs font-bold">
                      AW
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#555] flex items-center justify-center text-white text-xs font-bold">
                      AM
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Abdul Wahab &amp; Ahmad Murtaza</p>
                    <p className="text-[#888] text-xs">Founders, Fixers</p>
                  </div>
                </div>
              </div>
              <div className="reveal flex items-center justify-center">
                <img
                  src={LOGO_URL}
                  alt="Fixers Web Development Agency Logo"
                  className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Web Development */}
        <section className="py-24 sm:py-32 lg:py-40 border-t border-[#1a1a1a]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="reveal mb-12 lg:mb-16">
              <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4">WEB DEVELOPMENT</p>
              <h2 className="text-white text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-4">
                Code that converts
              </h2>
              <p className="text-[#888] text-sm sm:text-[15px] max-w-2xl">
                We don't use templates or page builders. Every website is hand-coded from scratch using modern
                frameworks — giving you faster load times, better SEO, and complete flexibility to scale as your
                business grows.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {webServices.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
            <ViewAllServices />
          </div>
        </section>

        {/* Digital Marketing */}
        <section className="py-24 sm:py-32 lg:py-40 border-t border-[#1a1a1a]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="reveal mb-12 lg:mb-16">
              <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4">DIGITAL MARKETING</p>
              <h2 className="text-white text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-4">
                Grow your audience
              </h2>
              <p className="text-[#888] text-sm sm:text-[15px] max-w-2xl">
                Having a great website is only half the battle. We help you drive traffic, build brand awareness, and
                convert followers into customers through strategic social media marketing and SEO.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {marketingServices.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
            <ViewAllServices />
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#E8734A] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="reveal text-center">
                  <p className="text-white text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1] mb-2">{stat.value}</p>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Fixers */}
        <section className="py-24 sm:py-32 lg:py-40 border-t border-[#1a1a1a]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="text-center mb-12 lg:mb-16 reveal">
              <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4">WHY FIXERS</p>
              <h2 className="text-white text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-4">
                Why work with us?
              </h2>
              <p className="text-[#888] text-sm sm:text-[15px] max-w-xl mx-auto">
                We're not just another agency. We're your dedicated digital partner, invested in your success.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[900px] mx-auto">
              {whyFixers.map((item) => (
                <div
                  key={item.title}
                  className="reveal border border-[#1a1a1a] rounded-xl p-5 sm:p-6 bg-[#0a0a0a] hover:border-[#333] transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#E8734A] mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-white text-[15px] font-semibold mb-2">{item.title}</h3>
                  <p className="text-[#888] text-xs sm:text-sm leading-[1.7]">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="reveal mt-12 text-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#E8734A] hover:bg-[#d56a3f] text-white text-sm font-medium rounded-full pl-6 pr-2 py-3 transition-colors duration-300"
              >
                Start a Project
                <span className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                  <ArrowRight size={14} className="text-white" />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer / CTA */}
        <footer className="py-24 sm:py-32 lg:py-40 border-t border-[#1a1a1a]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="reveal text-center mb-16 lg:mb-24">
              <h2 className="text-white text-[clamp(2rem,6vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-6">
                Ready to <em className="font-serif italic">fix</em> your digital presence?
              </h2>
              <p className="text-[#888] text-sm sm:text-[15px] max-w-xl mx-auto mb-8">
                Let's talk about your project. Based in Faisalabad, Pakistan. Working with clients across the US and
                beyond.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E8734A] hover:bg-[#d56a3f] text-white text-sm font-medium rounded-full pl-6 pr-6 py-3 transition-colors duration-300"
              >
                <MessageSquare size={16} />
                Chat on WhatsApp
              </a>
            </div>

            <div className="border-t border-[#1a1a1a] pt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
                <div className="reveal flex flex-col items-center sm:items-start">
                  <img src={LOGO_URL} alt="Fixers Logo" className="w-32 h-32 object-contain mb-4" />
                  <p className="text-[#888] text-sm leading-[1.7]">
                    Fixers is a full-service digital agency specializing in custom web development and digital
                    marketing for small businesses.
                  </p>
                </div>
                <div className="reveal">
                  <h4 className="text-white text-sm font-semibold mb-5">Quick Links</h4>
                  <ul className="space-y-3">
                    {QUICK_LINKS.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.href}
                          className="text-[#888] text-sm hover:text-[#E8734A] transition-colors duration-300"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="reveal">
                  <h4 className="text-white text-sm font-semibold mb-5">Connect</h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="text-[#888] text-sm hover:text-[#E8734A] transition-colors duration-300"
                      >
                        {EMAIL}
                      </a>
                    </li>
                    <li>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#888] text-sm hover:text-[#E8734A] transition-colors duration-300"
                      >
                        WhatsApp
                      </a>
                    </li>
                    <li>
                      <a
                        href={WEBSITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#888] text-sm hover:text-[#E8734A] transition-colors duration-300"
                      >
                        www.fixers.dev
                      </a>
                    </li>
                  </ul>
                  <div className="mt-6 w-28 h-28 bg-white rounded-lg p-2">
                    <img src={QR_CODE_URL} alt="WhatsApp QR Code" className="w-full h-full" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-[#1a1a1a]">
                <p className="text-[#666] text-xs text-center">
                  © 2026 Fixers. Founded by Mr. Abdul Wahab &amp; Ahmad Murtaza. All rights reserved.
                </p>
                <div className="flex items-center gap-2">
                  <Rocket size={12} className="text-[#666]" />
                  <span className="text-[#666] text-xs">Built with custom code</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
