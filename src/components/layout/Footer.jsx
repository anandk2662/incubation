import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Send, Briefcase } from 'lucide-react';

const footerNav = [
  {
    heading: 'Work',
    links: [
      { label: 'Projects', to: '/projects' },
      { label: 'Demo Lab', to: '/demo-lab' },
    ],
  },
  {
    heading: 'Team',
    links: [
      { label: 'People', to: '/team' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', to: '#' },
      { label: 'Terms', to: '#' },
    ],
  },
];

const socials = [
  { icon: Globe, label: 'GitHub', href: '#' },
  { icon: Send, label: 'Twitter', href: '#' },
  { icon: Briefcase, label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-primary py-10 sm:py-12 mt-auto bg-bg-primary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 mb-10">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-2.5 text-sm font-semibold text-text-primary no-underline mb-4 group">
              <svg className="w-5 h-5 text-text-primary shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
                <rect x="13" y="2" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
                <rect x="2" y="13" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
                <rect x="13" y="13" width="9" height="9" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
              </svg>
              <span>Incubation</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-6 opacity-80">
              Building tomorrow's technology,<br className="hidden sm:block" />one project at a time.
            </p>
            <div className="flex gap-1">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 rounded-sm text-text-tertiary hover:text-text-primary hover:bg-bg-hover transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-16">
            {footerNav.map((col) => (
              <div key={col.heading} className="min-w-[100px]">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-4">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-2 list-none p-0">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-text-secondary hover:text-text-primary no-underline transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-border-primary gap-4 text-center sm:text-left">
          <span className="text-[10px] text-text-tertiary uppercase tracking-widest font-medium">
            © {new Date().getFullYear()} Incubation Team. All rights reserved.
          </span>
          <span className="text-[10px] text-text-tertiary uppercase tracking-widest font-medium">
            Built with care in 2026.
          </span>
        </div>
      </div>
    </footer>
  );
}
