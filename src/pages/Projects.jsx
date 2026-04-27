import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectsGrid from '../components/sections/ProjectsGrid';
import { Search, Filter } from 'lucide-react';
import Button from '../components/ui/Button';

const categories = ['All', 'AI', 'Web', 'Mobile', 'Research', 'Infrastructure'];

export default function Projects() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                            p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="pt-32 sm:pt-28 min-h-screen">
      <section className="pb-6 sm:pb-8">
        <div className="container">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 text-text-primary">Projects</h1>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed mb-8">
            Exploring the boundaries of technology through specialized initiatives and research projects.
          </p>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center px-4 h-11 w-full lg:max-w-[450px] bg-bg-surface border border-border-primary rounded-lg focus-within:border-border-hover transition-colors shadow-sm">
              <Search size={16} className="text-text-tertiary mr-3" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none text-text-primary flex-1 text-sm outline-none placeholder:text-text-tertiary w-full"
              />
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                    category === cat 
                      ? 'bg-text-primary text-bg-primary border-text-primary' 
                      : 'bg-bg-elevated text-text-secondary border-border-primary hover:text-text-primary hover:border-border-hover'
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="container">
          {filteredProjects.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={category + search}
            >
              <ProjectsGrid featuredOnly={false} projects={filteredProjects} showHeader={false} />
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24 text-text-secondary">
              <div className="w-16 h-16 bg-bg-surface border border-border-primary rounded-full flex items-center justify-center text-text-tertiary mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">No projects found</h3>
              <p className="text-sm max-w-[280px] mb-8 leading-relaxed">Try adjusting your search or filter to find what you're looking for.</p>
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => { setSearch(''); setCategory('All'); }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
