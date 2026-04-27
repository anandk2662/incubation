import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] lg:min-h-screen flex items-center pt-24 lg:pt-20 overflow-hidden" id="hero">
      {/* 
        Mobile Background Animation 
      */}
      <div className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 blur-[100px] opacity-20">
          <div className="absolute w-[250px] h-[250px] top-[-5%] left-[-10%] rounded-full bg-white animate-pulse" />
          <div className="absolute w-[200px] h-[200px] bottom-[5%] right-[-10%] rounded-full bg-white animate-pulse [animation-delay:2s]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] aspect-square opacity-10">
          <HeroSVG />
        </div>
      </div>

      {/* Main Content */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-8 lg:gap-12">
          
          {/* Text Side */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[clamp(40px,9vw,80px)] font-black leading-[0.9] tracking-tighter mb-6 text-text-primary" id="hero-title">
                Building the <span className="bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">future</span> of technology.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-[540px] mb-8 lg:mb-10 leading-relaxed" id="hero-subtitle">
                We are an incubation team dedicated to transforming moonshot ideas into reality through rapid prototyping, research, and engineering excellence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  iconRight={<ArrowRight size={18} />}
                  className="w-full sm:w-auto px-8 sm:px-10"
                  id="hero-cta-projects"
                >
                  Explore Projects
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  icon={<Play size={18} />}
                  className="w-full sm:w-auto px-8 sm:px-10"
                  id="hero-cta-demos"
                >
                  Watch Demos
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Desktop Animation Side */}
          <div className="hidden lg:flex relative justify-center items-center">
            <div className="absolute inset-0 blur-[80px] opacity-30 pointer-events-none">
              <div className="absolute w-[280px] h-[280px] top-[-5%] left-0 rounded-full bg-white animate-pulse" />
              <div className="absolute w-[220px] h-[220px] bottom-0 right-[-5%] rounded-full bg-white animate-pulse [animation-delay:2s]" />
            </div>
            <div className="relative w-full max-w-[380px] aspect-square z-10">
              <HeroSVG />
            </div>
          </div>

        </div>
      </div>

      {/* Smooth Transition to bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent z-20 pointer-events-none" />
    </section>
  );
}

function HeroSVG() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.15 }} />
          <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0.05 }} />
        </linearGradient>
      </defs>
      <motion.rect
        x="100" y="100" width="200" height="200"
        stroke="white" strokeWidth="0.75" fill="none"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 0.3 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="200" cy="200" r="120"
        stroke="white" strokeWidth="0.75" fill="none" strokeDasharray="4 4"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: -360, opacity: 0.2 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M 200 40 L 360 320 L 40 320 Z"
        stroke="white" strokeWidth="0.75" fill="none"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 0.1 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}
