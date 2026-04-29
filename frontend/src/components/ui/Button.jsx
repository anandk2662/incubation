import React from 'react';

const Button = React.forwardRef(({
  as: Component = 'button',
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
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-tight rounded-sm transition-all duration-200 whitespace-nowrap relative overflow-hidden border disabled:opacity-35 disabled:cursor-not-allowed active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-text-primary text-bg-primary border-text-primary hover:opacity-90',
    secondary: 'bg-transparent text-text-primary border-border-hover hover:bg-bg-hover hover:border-border-strong',
    ghost: 'bg-transparent text-text-secondary border-transparent hover:text-text-primary hover:bg-bg-hover'
  };

  const sizes = {
    sm: 'px-3 h-7 text-[12px]',
    md: 'px-4 h-9 text-sm',
    lg: 'px-6 h-11 text-base rounded-md'
  };

  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;

  const componentProps = {
    ref,
    className: `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`,
    ...(Component === 'button' ? { type: props.type || 'button', disabled: disabled || loading } : {}),
    ...props,
  };

  return (
    <Component
      {...componentProps}
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
    </Component>
  );
});

Button.displayName = 'Button';
export default Button;
