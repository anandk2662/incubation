import React, { useState } from 'react';
import { demos } from '../data/demos';
import { Terminal, Layout, Info, ChevronRight, Play, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';

export default function DemoLab() {
  const [activeDemoId, setActiveDemoId] = useState(demos[0].id);
  const activeDemo = demos.find(d => d.id === activeDemoId);

  return (
    <div className="min-h-screen md:h-screen pt-32 md:overflow-hidden bg-bg-primary flex flex-col">
      <div className="flex flex-col md:grid md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_300px] flex-1 min-h-0">
        
        {/* Mobile/Tablet Header for Demos - Only on small screens */}
        <div className="md:hidden flex overflow-x-auto p-4 gap-3 no-scrollbar border-b border-border-primary bg-bg-secondary sticky top-[72px] z-30">
          {demos.map(demo => (
            <button
              key={demo.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${
                activeDemoId === demo.id 
                  ? 'bg-text-primary text-bg-primary border-text-primary' 
                  : 'bg-bg-elevated text-text-tertiary border-border-primary'
              }`}
              onClick={() => setActiveDemoId(demo.id)}
            >
              {demo.type === 'terminal' ? <Terminal size={14} /> : <Layout size={14} />}
              <span className="text-xs font-bold uppercase tracking-tight">{demo.title}</span>
            </button>
          ))}
        </div>

        {/* Left Sidebar: Demo Navigation (Desktop) */}
        <aside className="hidden md:flex flex-col border-r border-border-primary overflow-y-auto">
          <div className="px-5 py-3 border-b border-border-primary">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary">Demos</h3>
          </div>
          <nav className="flex flex-col p-2 gap-1">
            {demos.map(demo => (
              <button
                key={demo.id}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-sm transition-all text-left ${
                  activeDemoId === demo.id 
                    ? 'bg-bg-elevated' 
                    : 'hover:bg-bg-hover'
                }`}
                onClick={() => setActiveDemoId(demo.id)}
              >
                <div className={`shrink-0 ${activeDemoId === demo.id ? 'text-text-primary' : 'text-text-tertiary'}`}>
                  {demo.type === 'terminal' ? <Terminal size={16} /> : <Layout size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold truncate ${activeDemoId === demo.id ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {demo.title}
                  </div>
                  <div className="text-[11px] text-text-tertiary truncate">{demo.project}</div>
                </div>
                <ChevronRight size={14} className={`text-text-tertiary transition-opacity ${activeDemoId === demo.id ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area: The Demo */}
        <main className="bg-bg-secondary p-3 sm:p-5 md:overflow-hidden flex flex-col min-w-0 min-h-[400px] md:min-h-0">
          <div className="flex-1 flex flex-col bg-bg-surface border border-border-strong rounded-xl overflow-hidden shadow-2xl">
            <div className="h-11 bg-bg-surface border-b border-border-primary flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  activeDemo.status === 'Live' ? 'bg-[#58d68d]' : 
                  activeDemo.status === 'Beta' ? 'bg-[#f4d03f]' : 
                  'bg-border-hover'
                }`} />
                <span>{activeDemo.status}</span>
              </div>
              <div className="text-sm font-bold text-text-primary truncate px-4">{activeDemo.title}</div>
              <div className="text-text-tertiary">
                <ExternalLink size={16} />
              </div>
            </div>

            <div className="flex-1 bg-black overflow-y-auto">
              {activeDemo.type === 'terminal' ? (
                <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-text-secondary">
                  {activeDemo.preview?.map((line, i) => (
                    <div key={i} className="flex gap-3 mb-1">
                      <span className="text-text-tertiary select-none">
                        {line.role === 'user' ? '$' : '→'}
                      </span>
                      <span className={`
                        ${line.role === 'user' ? 'text-white' : ''}
                        ${line.role === 'gpt4' ? 'text-[#85c1e9]' : ''}
                        ${line.role === 'claude' ? 'text-[#f8c471]' : ''}
                        ${line.role === 'warning' ? 'text-[#f39c12]' : ''}
                      `}>
                        {line.text}
                      </span>
                    </div>
                  ))}
                  <div className="inline-block w-2 h-4 bg-white ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <Layout size={40} className="text-text-tertiary mb-4" />
                  <h3 className="text-lg font-bold text-text-primary mb-2">{activeDemo.title} Interface</h3>
                  <p className="text-sm text-text-secondary max-w-xs mb-6">This interactive prototype is optimized for a full-screen experience.</p>
                  <Button variant="primary" size="md" icon={<Play size={16} />}>Launch Full Prototype</Button>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar / Bottom Info Panel */}
        <aside className="flex flex-col border-t md:border-t-0 md:border-l border-border-primary p-5 md:overflow-y-auto bg-bg-primary md:bg-transparent">
          <div className="mb-6 md:mb-8">
            <h3 className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-widest text-text-tertiary mb-3">
              <Info size={16} />
              Information
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">{activeDemo.description}</p>
          </div>

          <div className="h-px bg-border-primary mb-6 md:mb-8" />

          <div className="mb-6 md:mb-8">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary mb-3">Status</h3>
            <span className={`inline-block px-2.5 py-1 rounded-sm text-[11px] font-bold uppercase tracking-tight ${
              activeDemo.status === 'Live' ? 'bg-[#58d68d]/10 text-[#58d68d]' : 
              activeDemo.status === 'Beta' ? 'bg-[#f4d03f]/10 text-[#f4d03f]' : 
              'bg-white/5 text-text-tertiary'
            }`}>
              {activeDemo.status}
            </span>
          </div>

          <div className="h-px bg-border-primary mb-6 md:mb-8" />

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary mb-3">Project Context</h3>
            <p className="text-sm text-text-secondary mb-4">
              Part of <strong className="text-text-primary">{activeDemo.project}</strong> research initiative.
            </p>
            <Button variant="secondary" size="sm" className="w-full">
              View Project Details
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
