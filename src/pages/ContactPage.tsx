import { Link } from 'react-router-dom';
import { Globe, Mail, MessageCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { useStaggerReveal } from '../hooks/useReveal';
import { EMAIL, QR_CODE_URL, QUICK_LINKS, WEBSITE_URL, WHATSAPP_URL } from '../data/site';

export default function ContactPage() {
  const ref = useStaggerReveal<HTMLDivElement>();

  return (
    <Layout>
      <div ref={ref}>
        <section className="bg-[#050505] pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
            <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4 reveal">GET IN TOUCH</p>
            <h1 className="text-white text-[clamp(2rem,6vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-6 reveal">
              Ready to <em className="font-serif italic">fix</em> your digital
              <br />
              presence?
            </h1>
            <p className="text-[#888] text-sm sm:text-[15px] max-w-xl mx-auto mb-8 reveal">
              Let's talk about your project. Based in Faisalabad, Pakistan. Working with clients across the US and
              beyond.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="reveal inline-flex items-center gap-2 bg-[#E8734A] hover:bg-[#d56a3f] text-white text-sm font-medium rounded-full pl-6 pr-6 py-3 transition-colors duration-300"
            >
              <Mail size={16} />
              {EMAIL}
            </a>
          </div>
        </section>

        <footer className="bg-[#050505] pb-12 sm:pb-16">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="border-t border-[#1a1a1a] pt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
                <div className="reveal">
                  <h4 className="text-white text-sm font-semibold mb-5">Connect With Us</h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#888] text-sm hover:text-[#E8734A] transition-colors duration-300"
                      >
                        <MessageCircle size={14} />
                        WhatsApp
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="flex items-center gap-2 text-[#888] text-sm hover:text-[#E8734A] transition-colors duration-300"
                      >
                        <Mail size={14} />
                        {EMAIL}
                      </a>
                    </li>
                    <li>
                      <a
                        href={WEBSITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#888] text-sm hover:text-[#E8734A] transition-colors duration-300"
                      >
                        <Globe size={14} />
                        www.fixers.dev
                      </a>
                    </li>
                  </ul>
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

                <div className="reveal sm:col-span-2 lg:col-span-1">
                  <h4 className="text-white text-sm font-semibold mb-5">Scan to Chat on WhatsApp</h4>
                  <div className="w-28 h-28 bg-white rounded-lg p-2">
                    <img src={QR_CODE_URL} alt="WhatsApp QR Code" className="w-full h-full" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-[#1a1a1a]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-[#E8734A] rounded-md flex items-center justify-center text-white text-[10px] font-bold">
                    F
                  </span>
                  <span className="text-white text-sm font-semibold">Fixers</span>
                </div>
                <p className="text-[#666] text-xs text-center">
                  © 2026 Fixers. Founded by Mr. Abdul Wahab &amp; Ahmad Murtaza. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
