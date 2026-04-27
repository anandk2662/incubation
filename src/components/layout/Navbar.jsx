import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const navLinks = [
  { label: 'Projects', to: '/projects' },
  { label: 'Demo Lab', to: '/demo-lab' },
  { label: 'Team', to: '/team' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-4xl h-12 transition-all duration-350 border border-border-primary bg-bg-primary/70 backdrop-blur-md rounded-full flex items-center px-4 md:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
          scrolled ? 'bg-bg-primary/90 border-white/10' : ''
        }`}
      >
        <div className="flex items-center justify-between w-full gap-4 md:gap-8">
          <Link to="/" className="flex items-center gap-2 no-underline group shrink-0">
            <svg className="w-4.5 h-4.5 text-text-primary shrink-0 transition-transform group-hover:rotate-90" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="9" height="9" stroke="currentColor" strokeWidth="2" />
              <rect x="13" y="2" width="9" height="9" stroke="currentColor" strokeWidth="2" />
              <rect x="2" y="13" width="9" height="9" stroke="currentColor" strokeWidth="2" />
              <rect x="13" y="13" width="9" height="9" stroke="currentColor" strokeWidth="2" fill="currentColor" />
            </svg>
            <span className="text-[13px] font-bold tracking-tight text-text-primary hidden sm:block">Incubation</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all no-underline ${
                  pathname === link.to 
                    ? 'text-text-primary bg-white/10' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/projects" className="hidden sm:inline-flex items-center px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-text-primary text-bg-primary rounded-full transition-all hover:bg-white/90 no-underline">
              View Projects
            </Link>
            <button
              className="flex md:hidden items-center justify-center w-8 h-8 rounded-full text-text-primary hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[198]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[72px] left-1/2 -translate-x-1/2 z-[199] w-[90%] max-w-sm bg-bg-primary/95 border border-white/10 backdrop-blur-xl rounded-[24px] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.8)] md:hidden"
            >
              <nav className="flex flex-col gap-1 mb-6">
                <Link to="/" className={`py-3 px-4 rounded-xl text-lg font-bold tracking-tight no-underline transition-colors ${pathname === '/' ? 'text-text-primary bg-white/10' : 'text-text-secondary hover:bg-white/5'}`}>
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`py-3 px-4 rounded-xl text-lg font-bold tracking-tight no-underline transition-colors ${pathname === link.to ? 'text-text-primary bg-white/10' : 'text-text-secondary hover:bg-white/5'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <Button variant="primary" size="lg" className="w-full rounded-xl" onClick={() => setMenuOpen(false)}>
                  View Projects
                </Button>
                <p className="text-[10px] text-center text-text-tertiary uppercase tracking-[0.2em] font-bold mt-4">
                  © {new Date().getFullYear()} Incubation
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
