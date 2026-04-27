import React from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '../../hooks/useScrollAnimation';
import { Lightbulb, Rocket, Zap, Search, ShieldCheck } from 'lucide-react';

const stages = [
  {
    id: 1,
    icon: Lightbulb,
    title: 'Ideation',
    description: 'Scanning the horizon for breakthrough concepts and unmet needs.',
    status: 'completed'
  },
  {
    id: 2,
    icon: Search,
    title: 'Research',
    description: 'Deep-diving into technical feasibility and market fit.',
    status: 'completed'
  },
  {
    id: 3,
    icon: Zap,
    title: 'Prototyping',
    description: 'Building high-fidelity MVPs to validate core hypotheses.',
    status: 'active'
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: 'Validation',
    description: 'Rigorous testing with users and stakeholders.',
    status: 'upcoming'
  },
  {
    id: 5,
    icon: Rocket,
    title: 'Scale',
    description: 'Handing off to dedicated teams for full-scale growth.',
    status: 'upcoming'
  }
];

export default function Pipeline() {
  const revealRef = useReveal();

  return (
    <div className="overflow-hidden" id="pipeline">
      <div className="mb-12 lg:mb-16 opacity-0 translate-y-5 transition-all duration-700 ease-out" ref={revealRef}>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-tertiary mb-3 block text-center lg:text-left">Process</span>
        <h2 className="text-2xl sm:text-5xl font-black tracking-tight mb-4 text-text-primary text-center lg:text-left">The Incubation Pipeline</h2>
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
          How we take raw ideas and transform them into world-class technology.
        </p>
      </div>

      <div className="relative">
        {/* Main Track Line - Desktop */}
        <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-border-primary z-0" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 relative z-10">
          {stages.map((stage, index) => (
            <motion.div 
              key={stage.id} 
              className="flex flex-col items-center lg:items-start text-center lg:text-left group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className="relative mb-6 sm:mb-8">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 z-10 shrink-0 ${
                  stage.status === 'completed' ? 'text-text-primary border-text-primary bg-white/5' :
                  stage.status === 'active' ? 'text-text-primary border-white bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-110' :
                  'text-text-tertiary border-border-primary bg-bg-surface'
                }`}>
                  <stage.icon size={28} className="sm:w-8 sm:h-8" />
                </div>
                
                {/* Vertical line for mobile/tablet */}
                {index < stages.length - 1 && (
                  <div className="lg:hidden absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 w-px h-10 sm:h-12 bg-border-primary" />
                )}
              </div>
              
              <div className="flex flex-col">
                <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-colors ${stage.status === 'upcoming' ? 'text-text-tertiary' : 'text-text-primary'}`}>
                  {stage.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-[280px] lg:max-w-none">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
