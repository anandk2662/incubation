import { useEffect, useMemo, useState } from 'react';
import { Layout, Info, ChevronRight, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useSiteContent } from '../context/SiteContentContext';

export default function DemoLab() {
  const { projects } = useSiteContent();
  const [activeProjectId, setActiveProjectId] = useState('');

  useEffect(() => {
    if (!activeProjectId && projects.length > 0) {
      setActiveProjectId(projects[0]._id);
    }
  }, [activeProjectId, projects]);

  const activeProject = useMemo(
    () => projects.find((project) => project._id === activeProjectId) || projects[0],
    [projects, activeProjectId],
  );

  return (
    <div className="min-h-screen md:h-screen pt-32 md:overflow-hidden bg-bg-primary flex flex-col">
      <div className="flex flex-col md:grid md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_300px] flex-1 min-h-0">
        <div className="md:hidden flex overflow-x-auto p-4 gap-3 no-scrollbar border-b border-border-primary bg-bg-secondary sticky top-18 z-30">
          {projects.map((project) => (
            <button
              key={project._id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${
                activeProjectId === project._id
                  ? 'bg-text-primary text-bg-primary border-text-primary'
                  : 'bg-bg-elevated text-text-tertiary border-border-primary'
              }`}
              onClick={() => setActiveProjectId(project._id)}
            >
              <Layout size={14} />
              <span className="text-xs font-bold uppercase tracking-tight">{project.title}</span>
            </button>
          ))}
        </div>

        <aside className="hidden md:flex flex-col border-r border-border-primary overflow-y-auto">
          <div className="px-5 py-3 border-b border-border-primary">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary">Projects</h3>
          </div>
          <nav className="flex flex-col p-2 gap-1">
            {projects.map((project) => (
              <button
                key={project._id}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-sm transition-all text-left ${
                  activeProjectId === project._id
                    ? 'bg-bg-elevated'
                    : 'hover:bg-bg-hover'
                }`}
                onClick={() => setActiveProjectId(project._id)}
              >
                <div className={`shrink-0 ${activeProjectId === project._id ? 'text-text-primary' : 'text-text-tertiary'}`}>
                  <Layout size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold truncate ${activeProjectId === project._id ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {project.title}
                  </div>
                  <div className="text-[11px] text-text-tertiary truncate">{project.category}</div>
                </div>
                <ChevronRight size={14} className={`text-text-tertiary transition-opacity ${activeProjectId === project._id ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </nav>
        </aside>

        <main className="bg-bg-secondary p-3 sm:p-5 md:overflow-hidden flex flex-col min-w-0 min-h-100 md:min-h-0">
          <div className="flex-1 flex flex-col bg-bg-surface border border-border-strong rounded-xl overflow-hidden shadow-2xl">
            <div className="h-11 bg-bg-surface border-b border-border-primary flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  activeProject?.status === 'Live' ? 'bg-[#58d68d]' :
                  activeProject?.status === 'Beta' ? 'bg-[#f4d03f]' :
                  'bg-border-hover'
                }`} />
                <span>{activeProject?.status || 'No project selected'}</span>
              </div>
              <div className="text-sm font-bold text-text-primary truncate px-4">{activeProject?.title || 'Projects'}</div>
              <div className="text-text-tertiary">
                <ExternalLink size={16} />
              </div>
            </div>

            <div className="flex-1 bg-black overflow-y-auto">
              {activeProject ? (
                <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-text-secondary">
                  <div className="flex gap-3 mb-2">
                    <span className="text-text-tertiary select-none">$</span>
                    <span className="text-white">inspect {activeProject.title.toLowerCase().replace(/\s+/g, '-')}</span>
                  </div>
                  <div className="flex gap-3 mb-1 text-text-secondary">
                    <span>[INFO] Category: {activeProject.category}</span>
                  </div>
                  <div className="flex gap-3 mb-1 text-text-secondary">
                    <span>[INFO] Status: {activeProject.status}</span>
                  </div>
                  <div className="flex gap-3 mb-1 text-[#82e0aa]">
                    <span>[SUCCESS] Loaded {activeProject.team.length} team members for this project</span>
                  </div>
                  <div className="flex gap-3 mt-4 mb-2">
                    <span className="text-text-tertiary select-none">$</span>
                    <span className="text-white">show architecture</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.architecture.map((node) => (
                      <span key={node} className="rounded-sm border border-border-primary bg-white/5 px-2 py-0.5 text-text-secondary">
                        {node}
                      </span>
                    ))}
                  </div>
                  <div className="inline-block w-2 h-4 bg-white ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <Layout size={40} className="text-text-tertiary mb-4" />
                  <h3 className="text-lg font-bold text-text-primary mb-2">No projects available</h3>
                  <p className="text-sm text-text-secondary max-w-xs mb-6">Load the backend to see live project data here.</p>
                  <Button variant="primary" size="md" as={Link} to="/projects" icon={<Play size={16} />}>View Projects</Button>
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="flex flex-col border-t md:border-t-0 md:border-l border-border-primary p-5 md:overflow-y-auto bg-bg-primary md:bg-transparent">
          <div className="mb-6 md:mb-8">
            <h3 className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-widest text-text-tertiary mb-3">
              <Info size={16} />
              Information
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">{activeProject?.description || 'Live project information will appear here once the backend data is loaded.'}</p>
          </div>

          <div className="h-px bg-border-primary mb-6 md:mb-8" />

          <div className="mb-6 md:mb-8">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary mb-3">Status</h3>
            <span className={`inline-block px-2.5 py-1 rounded-sm text-[11px] font-bold uppercase tracking-tight ${
              activeProject?.status === 'Live' ? 'bg-[#58d68d]/10 text-[#58d68d]' :
              activeProject?.status === 'Beta' ? 'bg-[#f4d03f]/10 text-[#f4d03f]' :
              'bg-white/5 text-text-tertiary'
            }`}>
              {activeProject?.status || 'Unknown'}
            </span>
          </div>

          <div className="h-px bg-border-primary mb-6 md:mb-8" />

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary mb-3">Project Context</h3>
            <p className="text-sm text-text-secondary mb-4">
              Part of <strong className="text-text-primary">{activeProject?.category || 'live'}</strong> research initiative.
            </p>
            <Button variant="secondary" size="sm" className="w-full" as={Link} to={activeProject ? `/projects/${activeProject._id}` : '/projects'}>
              View Project Details
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
