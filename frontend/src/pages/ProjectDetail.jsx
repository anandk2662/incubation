import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Globe, ExternalLink, FileText, Users, Box, Layers } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useSiteContent } from '../context/SiteContentContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects } = useSiteContent();
  const project = projects.find((p) => p._id === id);

  if (!project) {
    return (
      <div className="pt-32 min-h-screen container flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-black mb-6">Project not found</h2>
        <Button variant="primary" as={Link} to="/projects">Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="pt-32 sm:pt-28 min-h-screen pb-12">
      <div className="container">
        <Link to="/projects" className="inline-flex items-center gap-2 text-text-tertiary text-sm font-semibold mb-6 hover:text-text-primary transition-colors no-underline group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <header className="mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Badge variant={project.status.toLowerCase()} dot={true}>{project.status}</Badge>
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary">{project.category}</span>
          </div>
          <h1 className="text-[clamp(32px,8vw,64px)] font-black tracking-tight leading-[1.1] mb-4 text-text-primary">{project.title}</h1>
          <p className="text-lg sm:text-xl text-text-secondary font-medium max-w-3xl mb-8 leading-relaxed">{project.subtitle}</p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              iconRight={<ExternalLink size={18} />} 
              as="a" 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              Launch Demo
            </Button>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button 
                variant="secondary" 
                size="lg" 
                icon={<Globe size={18} />} 
                as="a" 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none"
              >
                Repository
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                icon={<FileText size={18} />} 
                as="a" 
                href={project.docsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none"
              >
                Documentation
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
          <div className="flex flex-col gap-10 sm:gap-14">
            <section>
              <h2 className="text-xl font-extrabold tracking-tight mb-4 text-text-primary uppercase text-[11px] tracking-[0.2em] opacity-40">Overview</h2>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl">{project.description}</p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold tracking-tight mb-4 text-text-primary uppercase text-[11px] tracking-[0.2em] opacity-40">The Problem</h2>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl">{project.problem}</p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold tracking-tight mb-4 text-text-primary uppercase text-[11px] tracking-[0.2em] opacity-40">The Solution</h2>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl">{project.solution}</p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold tracking-tight mb-4 text-text-primary uppercase text-[11px] tracking-[0.2em] opacity-40">Architecture</h2>
              <div className="bg-bg-surface border border-border-primary rounded-xl p-6 sm:p-8 flex justify-center overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-4 min-w-max">
                  {project.architecture.map((node, i) => (
                    <React.Fragment key={node}>
                      <div className="flex flex-col items-center gap-2 p-3 px-5 bg-bg-elevated border border-border-primary rounded-md min-w-[140px]">
                        <Box size={18} className="text-text-primary opacity-40" />
                        <span className="text-[11px] font-bold text-text-primary uppercase tracking-tight">{node}</span>
                      </div>
                      {i < project.architecture.length - 1 && (
                        <div className="text-text-tertiary font-bold px-2">→</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="bg-bg-surface border border-border-primary rounded-xl p-6 shadow-sm">
              <h3 className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-4">
                <Layers size={16} />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-2.5 py-1 bg-bg-elevated border border-border-primary rounded-md text-[10px] font-bold text-text-secondary uppercase tracking-tight">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-bg-surface border border-border-primary rounded-xl p-6 shadow-sm">
              <h3 className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-4">
                <Users size={16} />
                Core Team
              </h3>
              <div className="flex flex-col gap-4">
                {project.team.map(name => (
                  <div key={name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border-primary flex items-center justify-center text-[10px] font-bold text-text-primary">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-xs font-semibold text-text-secondary">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-bg-surface border border-border-primary rounded-xl p-6 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-4">Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-tertiary uppercase tracking-widest mb-1">Stars</span>
                  <span className="text-xl font-black text-text-primary">{project.metrics.stars}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-tertiary uppercase tracking-widest mb-1">Forks</span>
                  <span className="text-xl font-black text-text-primary">{project.metrics.forks}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
