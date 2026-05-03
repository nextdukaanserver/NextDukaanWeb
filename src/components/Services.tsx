import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Video, TrendingUp, ArrowRight } from 'lucide-react';
import SectionLabel from './ui/SectionLabel';
import GlassCard from './ui/GlassCard';

const services = [
  {
    icon:        Globe,
    title:       'Web Development',
    description: 'Custom websites engineered for speed, mobile-first UX, and real conversions. From landing pages to full e-commerce — we ship fast.',
    color:       'text-green-400',
    glow:        'rgba(34,197,94,0.15)',
    features:    ['Mobile-first responsive design', 'SEO-optimised codebase', 'Fast 3s load time', 'CMS integration'],
  },
  {
    icon:        Video,
    title:       'Reels & Media',
    description: 'Scroll-stopping short-form content that grows your social reach and turns followers into customers walking through your door.',
    color:       'text-orange-400',
    glow:        'rgba(249,115,22,0.15)',
    features:    ['Reels & Shorts production', 'On-brand visual storytelling', 'Caption & hashtag strategy', 'Monthly content calendar'],
  },
  {
    icon:        TrendingUp,
    title:       'SEO & Growth',
    description: 'Get found on Google by customers actively searching for you — local SEO, Google Business optimisation, and organic growth strategy.',
    color:       'text-blue-400',
    glow:        'rgba(99,102,241,0.15)',
    features:    ['Google Business Profile', 'Local keyword targeting', 'On-page & technical SEO', 'Monthly ranking reports'],
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="services"
      className="relative grid-bg overflow-hidden py-28"
      style={{ background: '#020617' }}
    >
      {/* Blobs */}
      <div className="blob-green pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] opacity-20" />
      <div className="blob-blue pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] opacity-15 translate-x-1/3" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="font-sora max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Everything your business needs to{' '}
            <span className="text-gradient-green">win online</span>
          </h2>
          <p className="max-w-lg text-lg text-slate-400">
            We combine design, content, and strategy — so you don't have to juggle five different agencies.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {services.map(({ icon: Icon, title, description, color, glow, features }) => (
            <motion.div key={title} variants={cardVariants} className="group h-full">
              <GlassCard hover className="relative flex h-full flex-col gap-6 p-7 overflow-hidden">
                {/* Card glow hover overlay */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(400px at 0% 0%, ${glow}, transparent 60%)` }}
                />

                {/* Icon */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04]"
                  style={{ boxShadow: `0 0 24px ${glow}` }}
                >
                  <Icon size={22} className={color} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-sora text-xl font-bold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{description}</p>
                </div>

                {/* Features */}
                <ul className="mt-auto flex flex-col gap-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-400">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-400 text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Footer link */}
                <div className="flex items-center gap-1 text-sm font-medium text-green-400 opacity-60 transition-all duration-200 group-hover:opacity-100">
                  Learn more <ArrowRight size={14} />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
