import React from 'react';

const Button = React.forwardRef(({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  iconRight,
  loading = false,
  disabled = false,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-tight rounded-sm transition-all duration-200 whitespace-nowrap relative overflow-hidden border disabled:opacity-35 disabled:cursor-not-allowed active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-text-primary text-bg-primary border-text-primary hover:bg-white/85 hover:border-white/85',
    secondary: 'bg-transparent text-text-primary border-border-hover hover:bg-bg-hover hover:border-border-strong',
    ghost: 'bg-transparent text-text-secondary border-transparent hover:text-text-primary hover:bg-bg-hover'
  };

  const sizes = {
    sm: 'px-3.5 h-8 text-sm',
    md: 'px-5 h-10 text-sm',
    lg: 'px-7 h-12 text-base rounded-md'
  };

  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
          <span className="leading-none">{children}</span>
          {iconRight && <span className="inline-flex items-center shrink-0">{iconRight}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
