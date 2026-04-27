import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Maximize2, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';

export default function DemoPreview() {
  return (
    <div id="demo-preview">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] items-center gap-8 lg:gap-12">
        <div className="max-w-[480px] lg:text-left text-center mx-auto lg:mx-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-tertiary mb-2 block">Live Experiments</span>
          <h2 className="text-2xl sm:text-5xl font-black tracking-tight mb-3 text-text-primary">Experience the innovation.</h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
            We don't just write code; we build interactive experiences. Explore our live demo lab to interact with our latest prototypes and research experiments in real-time.
          </p>
          <div className="flex lg:justify-start justify-center">
            <Button variant="primary" iconRight={<ExternalLink size={18} />}>
              Launch Demo Lab
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
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-text-tertiary font-mono">
              <Terminal size={12} />
              <span>lab-demo-instance</span>
            </div>
            <div className="text-text-tertiary">
              <Maximize2 size={12} />
            </div>
          </div>
          <div className="bg-black p-4 sm:p-6 min-h-[200px] font-mono text-xs sm:text-[13px] leading-relaxed">
            <div className="flex gap-3 mb-2">
              <span className="text-text-tertiary select-none">$</span>
              <span className="text-white">launch --project=orion --env=production</span>
            </div>
            <div className="flex gap-3 mb-1 text-text-secondary">
              <span>[INFO] Initializing Orion Core...</span>
            </div>
            <div className="flex gap-3 mb-1 text-text-secondary">
              <span>[INFO] Connecting to LLM cluster...</span>
            </div>
            <div className="flex gap-3 mb-1 text-[#82e0aa]">
              <span>[SUCCESS] Connected to GPT-4, Claude-3, Llama-3</span>
            </div>
            <div className="flex gap-3 mt-4 mb-2">
              <span className="text-text-tertiary select-none">$</span>
              <span className="text-white">run-test "Explain quantum computing"</span>
            </div>
            <div className="flex gap-3 text-text-secondary animate-pulse">
              <span>→ Generating parallel responses...</span>
            </div>
            <div className="inline-block w-2 h-4 bg-white ml-0.5 align-middle animate-[blink_1s_step-end_infinite]"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
