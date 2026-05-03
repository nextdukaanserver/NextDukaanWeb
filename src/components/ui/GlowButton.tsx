import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  target,
  rel,
  type = 'button',
  disabled = false,
}: GlowButtonProps) {
  const sizeClasses = {
    sm:  'px-4 py-2 text-sm',
    md:  'px-6 py-3 text-sm',
    lg:  'px-8 py-4 text-base',
  };

  const variantClasses = {
    primary: [
      'bg-green-500 text-slate-950 font-semibold',
      'hover:bg-green-400',
      'shadow-[0_0_24px_rgba(34,197,94,0.4)]',
      'hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ].join(' '),
    ghost: [
      'bg-transparent text-green-400 font-semibold',
      'border border-green-500/50',
      'hover:border-green-400 hover:text-green-300',
      'hover:bg-green-500/5',
    ].join(' '),
    outline: [
      'bg-transparent text-slate-200 font-medium',
      'border border-white/10',
      'hover:border-white/20 hover:text-white',
      'hover:bg-white/[0.04]',
    ].join(' '),
  };

  const baseClasses = [
    'inline-flex items-center gap-2 rounded-full',
    'transition-all duration-200 cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60',
    sizeClasses[size],
    variantClasses[variant],
    className,
  ].join(' ');

  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.03 },
    whileTap:   { scale: disabled ? 1 : 0.97 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
