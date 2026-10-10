import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Clock, Menu, X } from 'lucide-react';
import TextRoll from './TextRoll';
import { useLondonTime } from '../hooks/useLondonTime';
import { NAV_LINKS, WHATSAPP_URL } from '../data/site';

interface LayoutProps {
  children: ReactNode;
}

/** Dark sticky navigation used by every inner page (Services, Work, Process, Blog, FAQ, Contact). */
export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const time = useLondonTime();
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-[#050505]">
      <nav className="sticky top-0 z-50 w-full bg-[#050505]/90 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto p-2 sm:p-3">
          <div className="flex items-center justify-between px-3 sm:px-4 py-2">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                to="/"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-[#E8734A] rounded-full flex items-center justify-center hover:bg-[#d56a3f] transition-colors"
              >
                <span className="text-white text-[10px] sm:text-[11px] font-bold tracking-tight">FX</span>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-sm transition-colors duration-300 ${
                      isActive(link.href) ? 'text-[#E8734A]' : 'text-[#aaa] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <span className="hidden lg:block text-[13px] text-[#666]">Taking on projects for Q3 2026</span>
              <div className="flex items-center gap-1.5 text-[13px] text-[#666]">
                <Clock size={14} />
                <span>{time} in London</span>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#E8734A] text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 hover:bg-[#d56a3f] transition-colors duration-300"
              >
                <TextRoll text="Start a Project" />
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                  <ArrowRight size={14} className="text-[#E8734A]" />
                </span>
              </a>
            </div>

            <button
              className="md:hidden bg-[#E8734A] rounded-full w-10 h-10 flex items-center justify-center"
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
            <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl mx-3 mb-3 p-6">
              <div className="flex items-center gap-1.5 text-[13px] text-[#666] mb-6">
                <Clock size={14} />
                <span>{time} in London</span>
              </div>
              <div className="flex flex-col gap-4 mb-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-[28px] sm:text-[32px] font-medium ${
                      isActive(link.href) ? 'text-[#E8734A]' : 'text-white'
                    }`}
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
                className="group inline-flex items-center gap-2 bg-[#E8734A] text-white text-[14px] font-medium rounded-full pl-5 pr-2 py-3"
                onClick={() => setMenuOpen(false)}
              >
                <TextRoll text="Start a Project" />
                <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                  <ArrowRight size={16} className="text-[#E8734A]" />
                </span>
              </a>
            </div>
          </div>
        </>
      )}

      {children}
    </div>
  );
}
