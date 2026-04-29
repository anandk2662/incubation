import { Mail, Phone, MapPin, Globe, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const contactItems = [
  { icon: Mail, label: 'Email', value: 'hello@incubation.studio', href: 'mailto:hello@incubation.studio' },
  { icon: Phone, label: 'Phone', value: '+1 (415) 555-0198', href: 'tel:+14155550198' },
  { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
  { icon: Globe, label: 'Website', value: 'incubation.studio', href: '#' },
];

export default function About() {
  return (
    <div className="pt-32 sm:pt-28 min-h-screen pb-16">
      <section className="container">
        <div className="max-w-4xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-tertiary mb-3 block">About Us</span>
          <h1 className="text-[clamp(40px,8vw,76px)] font-black tracking-tight leading-[0.95] mb-5 text-text-primary">
            Building focused products with research depth and production discipline.
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl mb-8">
            Incubation is a small multidisciplinary team that turns uncertain ideas into working systems. We combine product thinking, design, engineering, and experimentation to ship work that is useful on day one and scalable later.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="primary" size="lg" iconRight={<ArrowRight size={18} />} as={Link} to="/projects">
              Explore Projects
            </Button>
            <Button variant="secondary" size="lg" as={Link} to="/team">
              Meet the Team
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-bg-surface border border-border-primary rounded-[28px] p-6 sm:p-8">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary mb-3">What we do</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-text-secondary leading-relaxed">
              <div className="bg-bg-elevated border border-border-primary rounded-2xl p-4">
                <h3 className="text-text-primary font-bold mb-2">Research-to-product</h3>
                <p>We validate concepts quickly, then shape them into reliable experiences people can actually use.</p>
              </div>
              <div className="bg-bg-elevated border border-border-primary rounded-2xl p-4">
                <h3 className="text-text-primary font-bold mb-2">Systems thinking</h3>
                <p>Every interface, service, and workflow is designed to stay coherent as the product grows.</p>
              </div>
              <div className="bg-bg-elevated border border-border-primary rounded-2xl p-4">
                <h3 className="text-text-primary font-bold mb-2">Hands-on delivery</h3>
                <p>We stay close to implementation, which keeps the team fast and the output consistent.</p>
              </div>
              <div className="bg-bg-elevated border border-border-primary rounded-2xl p-4">
                <h3 className="text-text-primary font-bold mb-2">Long-term maintainability</h3>
                <p>We prefer clear primitives, durable patterns, and designs that age well.</p>
              </div>
            </div>
          </div>

          <aside className="bg-bg-surface border border-border-primary rounded-[28px] p-6 sm:p-8">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary mb-5">Contact Details</h2>
            <div className="flex flex-col gap-4">
              {contactItems.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <div className="w-10 h-10 rounded-full bg-bg-elevated border border-border-primary flex items-center justify-center text-text-primary shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-tertiary mb-1">{label}</p>
                      <p className="text-sm font-semibold text-text-primary">{value}</p>
                    </div>
                  </>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 rounded-2xl border border-border-primary bg-bg-elevated px-4 py-4 text-left no-underline hover:border-border-hover transition-colors"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label} className="flex items-center gap-4 rounded-2xl border border-border-primary bg-bg-elevated px-4 py-4">
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-border-primary bg-bg-elevated p-4 text-sm text-text-secondary leading-relaxed">
              For partnerships, hiring, or general inquiries, reach out and we’ll route the message to the right person.
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}