interface SectionLabelProps {
  children: string;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-green-400">
        {children}
      </span>
    </div>
  );
}
