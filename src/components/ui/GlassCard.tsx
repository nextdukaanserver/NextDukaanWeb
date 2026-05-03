import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  hover = false,
  glow = false,
  onClick,
}: GlassCardProps) {
  const baseClasses = [
    'glass rounded-2xl',
    hover ? 'glow-card cursor-pointer' : '',
    glow ? 'glow-green-sm' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (hover) {
    return (
      <motion.div
        className={baseClasses}
        onClick={onClick}
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
}
