import { motion } from 'framer-motion';
import { ExternalLink, Layers, Users, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useSiteContent } from '../../context/SiteContentContext';

export default function DemoPreview() {
  const { projects, team } = useSiteContent();
  const featuredProject = projects.find((project) => project.featured) || projects[0];

  return (
    <div id="demo-preview">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] items-center gap-8 lg:gap-12">
        <div className="max-w-[480px] lg:text-left text-center mx-auto lg:mx-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-tertiary mb-2 block">Live Experiments</span>
          <h2 className="text-2xl sm:text-5xl font-black tracking-tight mb-3 text-text-primary">Experience the innovation.</h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
            Explore the live portfolio of projects and the team behind them. Everything shown here is loaded from the backend.
          </p>
          <div className="flex lg:justify-start justify-center">
            <Button
              variant="primary"
              iconRight={<ExternalLink size={18} />}
              as={Link}
              to={featuredProject ? `/projects/${featuredProject._id}` : '/projects'}
            >
              View Featured Project
            </Button>
          </div>
        </div>

        <motion.div 
          className="bg-bg-elevated border border-border-strong rounded-xl shadow-2xl overflow-hidden w-full"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-9 bg-bg-elevated border-b border-border-primary flex items-center justify-between px-4">
            <div className="flex items-center gap-2 text-[10px] text-text-tertiary font-mono">
              <Layers size={12} />
              <span>backend-live-snapshot</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-text-tertiary font-mono">
              <Users size={12} />
              <span>{team.length} team members</span>
            </div>
            <div className="text-text-tertiary">
              <Box size={12} />
            </div>
          </div>
          <div className="bg-[#161616] p-4 sm:p-6 min-h-[200px] font-mono text-xs sm:text-[13px] leading-relaxed">
            {featuredProject ? (
              <>
                <div className="flex gap-3 mb-2">
                  <span className="text-text-tertiary select-none">$</span>
                  <span className="text-[#f4f4f4]">open project {featuredProject.title.toLowerCase().replace(/\s+/g, '-')}</span>
                </div>
                <div className="flex gap-3 mb-1 text-text-secondary">
                  <span>[INFO] Status: {featuredProject.status}</span>
                </div>
                <div className="flex gap-3 mb-1 text-text-secondary">
                  <span>[INFO] Category: {featuredProject.category}</span>
                </div>
                <div className="flex gap-3 mb-1 text-[#82e0aa]">
                  <span>[SUCCESS] Loaded {team.length} team members and {projects.length} projects</span>
                </div>
                <div className="flex gap-3 mt-4 mb-2">
                  <span className="text-text-tertiary select-none">$</span>
                  <span className="text-[#f4f4f4]">show architecture</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.architecture.map((node) => (
                    <span key={node} className="rounded-sm border border-border-primary bg-[#f4f4f4]/5 px-2 py-0.5 text-text-secondary">
                      {node}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-text-secondary">No project data is available yet.</div>
            )}
            <div className="inline-block w-2 h-4 bg-[#f4f4f4] ml-0.5 align-middle animate-[blink_1s_step-end_infinite]"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
