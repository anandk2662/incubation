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
        className={`fixed top-0 left-0 right-0 z-[200] h-16 transition-all duration-350 border-b border-transparent ${
          scrolled ? 'bg-bg-primary/80 border-border-primary backdrop-blur-xl saturate-[180%]' : ''
        }`}
      >
        <div className="container h-full flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <svg className="w-5.5 h-5.5 text-text-primary shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
              <rect x="13" y="2" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
              <rect x="2" y="13" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
              <rect x="13" y="13" width="9" height="9" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
            </svg>
            <span className="text-sm font-semibold tracking-tight text-text-primary">Incubation</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-all no-underline ${
                  pathname === link.to 
                    ? 'text-text-primary' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/projects" className="hidden md:inline-flex items-center px-4 py-1.5 text-sm font-medium bg-text-primary text-bg-primary rounded-sm transition-all hover:opacity-85 hover:-translate-y-px no-underline">
              View Projects
            </Link>
            <button
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-sm text-text-primary hover:bg-bg-hover transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-[199] bg-bg-primary p-8 pt-4 flex flex-col border-t border-border-primary md:hidden"
          >
            <nav className="flex flex-col gap-1 flex-1">
              <Link to="/" className={`py-3.5 text-2xl font-bold tracking-tight border-b border-border-primary no-underline ${pathname === '/' ? 'text-text-primary' : 'text-text-secondary'}`}>
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`py-3.5 text-2xl font-bold tracking-tight border-b border-border-primary no-underline ${pathname === link.to ? 'text-text-primary' : 'text-text-secondary'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-8">
              <Button variant="primary" size="lg" className="w-full" onClick={() => setMenuOpen(false)}>
                View Projects
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
