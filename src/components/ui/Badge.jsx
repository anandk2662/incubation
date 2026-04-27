import React from 'react';

export default function Badge({ children, variant = 'default', size = 'sm', dot = false }) {
  const baseStyles = 'inline-flex items-center gap-1.5 font-sans font-medium tracking-wider uppercase rounded-full whitespace-nowrap border';
  
  const variants = {
    default: 'bg-white/6 text-text-secondary border-white/10',
    active: 'bg-white/8 text-[#7FFFD4] border-[#7FFFD4]/20',
    beta: 'bg-[#FFD54F]/8 text-[#FFD54F] border-[#FFD54F]/20',
    research: 'bg-[#B388FF]/8 text-[#B388FF] border-[#B388FF]/20',
    soon: 'bg-white/4 text-text-tertiary border-border-primary'
  };

  const sizes = {
    xs: 'text-[9px] px-1.5 py-0.5',
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3.5 py-1'
  };

  const variantStyles = variants[variant] || variants.default;
  const sizeStyles = sizes[size] || sizes.sm;

  return (
    <span className={`${baseStyles} ${variantStyles} ${sizeStyles}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full bg-current shrink-0 ${variant === 'active' ? 'animate-pulse' : ''}`} />
      )}
      {children}
    </span>
  );
}
