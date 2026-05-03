import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionLabel from './ui/SectionLabel';

const projects = [
  {
    name:    'Spice Route Restaurant',
    type:    'Restaurant Website',
    tag:     'Web + SEO',
    desc:    'Online menu, table booking & Google ranking in 7 days',
    gradient:'from-orange-600/30 via-red-500/20 to-pink-600/30',
    accent:  '#f97316',
    emoji:   '🍛',
  },
  {
    name:    'Bloom Boutique',
    type:    'Fashion Store',
    tag:     'Web + Reels',
    desc:    '5× Instagram reach growth in 60 days',
    gradient:'from-pink-600/30 via-purple-500/20 to-indigo-600/30',
    accent:  '#ec4899',
    emoji:   '👗',
  },
  {
    name:    'Sunrise Academy',
    type:    'School / Ed-Tech',
    tag:     'Web + Branding',
    desc:    'Admissions portal with live enquiry tracking',
    gradient:'from-blue-600/30 via-cyan-500/20 to-teal-600/30',
    accent:  '#06b6d4',
    emoji:   '🎓',
  },
  {
    name:    'QuickFix Auto',
    type:    'Automotive Service',
    tag:     'SEO + Maps',
    desc:    '#1 on Google Maps for "car service near me"',
    gradient:'from-slate-600/30 via-zinc-500/20 to-gray-600/30',
    accent:  '#94a3b8',
    emoji:   '🔧',
  },
  {
    name:    'Organic Roots',
    type:    'Health & Grocery',
    tag:     'E-commerce',
    desc:    'Launched online store with 200+ SKUs in 10 days',
    gradient:'from-green-600/30 via-emerald-500/20 to-teal-600/30',
    accent:  '#22c55e',
    emoji:   '🌿',
  },
  {
    name:    'CraftBrew Co.',
    type:    'Café & Brewery',
    tag:     'Web + Reels',
    desc:    'Viral reel series — 2M views in first month',
    gradient:'from-amber-600/30 via-yellow-500/20 to-orange-600/30',
    accent:  '#f59e0b',
    emoji:   '☕',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="portfolio"
      className="relative grid-bg overflow-hidden py-28"
      style={{ background: '#020617' }}
    >
      {/* Blobs */}
      <div className="blob-green pointer-events-none absolute right-0 top-1/4 h-[500px] w-[400px] opacity-10 translate-x-1/3" />
      <div className="blob-orange pointer-events-none absolute left-0 bottom-1/4 h-[300px] w-[300px] opacity-10 -translate-x-1/3" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <SectionLabel>Our Work</SectionLabel>
          <h2 className="font-sora max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Websites we've{' '}
            <span className="text-gradient-green">shipped</span>
          </h2>
          <p className="max-w-lg text-lg text-slate-400">
            Real businesses, real results — delivered in days, not months.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] cursor-pointer"
            >
              {/* Gradient background */}
              <div className={`relative h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                {/* Grid pattern inside card */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />

                {/* Emoji icon */}
                <span className="relative z-10 text-6xl select-none" style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }}>
                  {project.emoji}
                </span>

                {/* Type tag */}
                <div className="absolute left-3 top-3 rounded-full border border-white/[0.15] bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {project.tag}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-2 rounded-full border border-green-500/50 bg-green-500/20 px-5 py-2.5 text-sm font-semibold text-green-300">
                    View Project <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-sora text-base font-bold text-white">{project.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{project.type}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 mt-0.5 text-slate-600 transition-colors group-hover:text-green-400"
                  />
                </div>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{project.desc}</p>

                {/* Bottom accent */}
                <div
                  className="mt-4 h-0.5 w-12 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ background: project.accent, opacity: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://wa.me/917976139428?text=Hi%20NextDukaan%2C%20I%20would%20like%20to%20see%20more%20of%20your%20portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:border-green-500/30 hover:text-white"
          >
            See all projects <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
