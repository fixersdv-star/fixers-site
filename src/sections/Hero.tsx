import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Menu, X } from 'lucide-react';
import ShaderBackground from '../components/ShaderBackground';
import TextRoll from '../components/TextRoll';
import { useLondonTime } from '../hooks/useLondonTime';
import { LOGO_URL, NAV_LINKS, WHATSAPP_URL } from '../data/site';

/** Light full-viewport hero with the animated shader background and the white pill navbar. */
export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const time = useLondonTime();

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col bg-[#EFEFEF] overflow-hidden">
      <ShaderBackground />

      <nav className="relative z-20 w-full">
        <div className="max-w-[1440px] mx-auto p-2 sm:p-3">
          <div className="bg-white rounded-full flex items-center justify-between px-3 sm:px-4 py-2">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link to="/" className="flex items-center">
                <img src={LOGO_URL} alt="Fixers" className="h-8 sm:h-9 w-auto" />
              </Link>

              <div className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm text-gray-900 hover:text-gray-500 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <span className="hidden lg:block text-[13px] text-gray-600">Taking on projects for Q3 2026</span>
              <div className="flex items-center gap-1.5 text-[13px] text-gray-600">
                <Clock size={14} />
                <span>{time} in London</span>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-gray-900 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 hover:bg-gray-800 transition-colors duration-300"
              >
                <TextRoll text="Start a Project" />
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                  <ArrowRight size={14} className="text-gray-900" />
                </span>
              </a>
            </div>

            <button
              className="md:hidden bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setMenuOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
            <div className="bg-white rounded-2xl mx-3 mb-3 p-6">
              <div className="flex items-center gap-1.5 text-[13px] text-gray-600 mb-6">
                <Clock size={14} />
                <span>{time} in London</span>
              </div>
              <div className="flex flex-col gap-4 mb-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-[28px] sm:text-[32px] font-medium text-gray-900"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-gray-900 text-white text-[14px] font-medium rounded-full pl-5 pr-2 py-3"
                onClick={() => setMenuOpen(false)}
              >
                <TextRoll text="Start a Project" />
                <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                  <ArrowRight size={16} className="text-gray-900" />
                </span>
              </a>
            </div>
          </div>
        </>
      )}

      <div className="relative z-20 flex-1 flex flex-col justify-end">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          <p className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-5 sm:mb-8">Fixers</p>
          <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
            We build digital
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            solutions that work
          </h1>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300"
            >
              <TextRoll text="Start a Project" />
              <span className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                <ArrowRight size={16} className="text-[#F26522]" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
