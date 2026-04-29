import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import { ArrowRight, Globe, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../../context/SiteContentContext';

export default function ProjectsGrid({ featuredOnly = true, projects: propProjects, title = "Featured Projects", showHeader = true }) {
  const { projects } = useSiteContent();
  const displayProjects = propProjects || (featuredOnly ? projects.filter((project) => project.featured) : projects);

  return (
    <div className="w-full" id="projects">
      {showHeader && (
        <div className="mb-6 sm:mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-tertiary mb-2 block">Portfolio</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 text-text-primary">{title}</h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <p className="text-sm sm:text-lg text-text-secondary max-w-xl leading-relaxed">
              A curated selection of our most impactful technical explorations.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayProjects.map((project, index) => (
          <motion.div
            key={project._id}
            className="group relative bg-bg-surface border border-border-primary rounded-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:border-border-hover hover:shadow-2xl flex flex-col h-full w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-5">
              <Badge variant={project.status.toLowerCase()}>{project.status}</Badge>
              <div className="flex gap-3">
                <a href={project.githubUrl} className="text-text-tertiary hover:text-text-primary transition-colors p-1" aria-label="GitHub">
                  <Globe size={18} />
                </a>
                <a href={project.demoUrl} className="text-text-tertiary hover:text-text-primary transition-colors p-1" aria-label="Live Demo">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1.5 transition-colors">{project.title}</h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-3">{project.subtitle}</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3 group-hover:text-text-primary transition-colors">
                {project.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border-primary flex items-center justify-between mt-auto">
              <div className="flex gap-2">
                {project.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[9px] font-bold text-text-tertiary bg-bg-elevated px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={`/projects/${project._id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-text-primary no-underline group/link">
                Details 
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
