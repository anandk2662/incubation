import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { label: 'Projects', to: '/projects' },
  { label: 'Demo Lab', to: '/demo-lab' },
  { label: 'Team', to: '/team' },
  { label: 'About Us', to: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-200 w-[90%] max-w-4xl h-10 transition-all duration-350 border border-border-primary bg-bg-primary/70 backdrop-blur-md rounded-full flex items-center px-4 md:px-6 shadow-sm ${
          scrolled ? 'bg-bg-primary/90 border-border-strong' : ''
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
            <span className="text-sm font-bold tracking-tight text-text-primary hidden sm:block">Incubation</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-1.5 text-xs font-semibold tracking-tight rounded-full transition-all no-underline ${
                  pathname === link.to
                    ? 'text-text-primary bg-border-primary/50'
                    : 'text-text-secondary hover:text-text-primary hover:bg-border-primary/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full text-text-secondary hover:text-text-primary hover:bg-border-primary/30 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="flex md:hidden items-center justify-center w-8 h-8 rounded-full text-text-primary hover:bg-border-primary/30 transition-colors"
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
              className="fixed inset-0 bg-bg-primary/80 backdrop-blur-[2px] z-198"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-18 left-1/2 -translate-x-1/2 z-199 w-[90%] max-w-sm bg-bg-primary/95 border border-border-primary backdrop-blur-xl rounded-[24px] p-6 shadow-lg md:hidden"
            >
              <nav className="flex flex-col gap-1">
                <Link to="/" onClick={() => setMenuOpen(false)} className={`py-3 px-4 rounded-xl text-lg font-semibold tracking-tight no-underline transition-colors ${pathname === '/' ? 'text-text-primary bg-border-primary/50' : 'text-text-secondary hover:bg-border-primary/30'}`}>
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3 px-4 rounded-xl text-lg font-semibold tracking-tight no-underline transition-colors ${pathname === link.to ? 'text-text-primary bg-border-primary/50' : 'text-text-secondary hover:bg-border-primary/30'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <p className="text-[10px] text-center text-text-tertiary uppercase tracking-[0.2em] font-bold mt-6">
                © {new Date().getFullYear()} Incubation
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
