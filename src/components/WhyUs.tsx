import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, IndianRupee, MapPin, TrendingUp } from 'lucide-react';
import SectionLabel from './ui/SectionLabel';

const stats = [
  {
    icon:  Zap,
    stat:  '5–10 Days',
    title: 'Fast Delivery',
    desc:  'From kickoff call to live website — in under two weeks. No slow agencies, no excuses.',
    color: 'text-yellow-400',
    bg:    'bg-yellow-500/10',
    border:'border-yellow-500/20',
  },
  {
    icon:  IndianRupee,
    stat:  'Local Budgets',
    title: 'Pricing That Fits',
    desc:  'Premium design at prices built for Indian local businesses — not MNC rates.',
    color: 'text-green-400',
    bg:    'bg-green-500/10',
    border:'border-green-500/20',
  },
  {
    icon:  MapPin,
    stat:  'Local Expert',
    title: 'Local Market Know-how',
    desc:  'We understand local customer behaviour, language, and the competition you face daily.',
    color: 'text-blue-400',
    bg:    'bg-blue-500/10',
    border:'border-blue-500/20',
  },
  {
    icon:  TrendingUp,
    stat:  'Growth First',
    title: 'Growth-First Strategy',
    desc:  'Every pixel and keyword is chosen to drive real customers to your door — not just look good.',
    color: 'text-orange-400',
    bg:    'bg-orange-500/10',
    border:'border-orange-500/20',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const blockVariants = {
  hidden: { opacity: 0, scale: 0.93, y: 24 },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="why-us"
      className="relative overflow-hidden py-28"
      style={{ background: '#0a0f1e' }}
    >
      {/* Background glow — large, not centered */}
      <div className="blob-green pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 h-[800px] w-[800px] opacity-[0.08]" />
      <div className="blob-orange pointer-events-none absolute -bottom-20 right-20 h-[400px] w-[400px] opacity-10" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center mb-16"
        >
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="font-sora max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Built for India's{' '}
            <span className="text-gradient-green">local businesses</span>
          </h2>
          <p className="max-w-lg text-lg text-slate-400">
            We don't just build websites. We build confidence — that your business will be found, trusted, and chosen.
          </p>
        </motion.div>

        {/* 2×2 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid gap-5 sm:grid-cols-2"
        >
          {stats.map(({ icon: Icon, stat, title, desc, color, bg, border }) => (
            <motion.div
              key={title}
              variants={blockVariants}
              className={`group relative flex gap-5 rounded-2xl border ${border} ${bg} p-7 transition-all duration-300 hover:border-opacity-40`}
            >
              {/* Icon */}
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${border} bg-white/[0.04]`}>
                <Icon size={26} className={color} />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5">
                <span className={`text-sm font-bold uppercase tracking-widest ${color} opacity-80`}>
                  {stat}
                </span>
                <h3 className="font-sora text-xl font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>

              {/* Corner glow on hover */}
              <div className={`pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60 ${bg}`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Numbers row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-px overflow-hidden rounded-2xl border border-white/[0.06]"
        >
          {[
            { num: '50+',  label: 'Businesses Launched' },
            { num: '4.9★', label: 'Average Rating'      },
            { num: '100%', label: 'Client Satisfaction' },
            { num: '3+',   label: 'Years of Experience' },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="flex flex-1 flex-col items-center gap-1 bg-white/[0.02] px-6 py-5 min-w-[120px]"
            >
              <span className="font-sora text-3xl font-black text-white">{num}</span>
              <span className="text-xs text-slate-500 text-center">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
