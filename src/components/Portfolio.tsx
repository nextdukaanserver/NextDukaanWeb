'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Gauge, Search, Sparkles } from 'lucide-react';
import SectionLabel from './ui/SectionLabel';

/* ------------------------------------------------------------------ */
/*  CONFIG                                                             */
/* ------------------------------------------------------------------ */

const WHATSAPP = '917976138428';

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* ------------------------------------------------------------------ */
/*  DATA — every entry is a live, verifiable site                      */
/* ------------------------------------------------------------------ */

type Sector = 'Politician' | 'Business' | 'Food & Hospitality';

type Project = {
  name: string;
  role: string;
  sector: Sector;
  url: string;
  host: string;
  image: string;
  desc: string;
  build: string[];
  accent: string;
};

const projects: Project[] = [
  {
    name: 'Azad Singh Rathore',
    role: 'Political Leader · Barmer, Rajasthan',
    sector: 'Politician',
    url: 'https://www.azadsinghrathore.com/',
    host: 'azadsinghrathore.com',
    image: '/images/client-1.webp',
    desc:
      'Full campaign presence — leader profile, work timeline, press gallery and a supporter contact flow, indexed on his own name across Rajasthan.',
    build: ['Next.js', 'SEO + GSC', 'Hindi + English'],
    accent: '#f59e0b',
  },
  {
    name: 'Swaroop Singh Khara',
    role: 'Political Leader · Sheo Constituency',
    sector: 'Politician',
    url: 'https://www.swaroopsinghkhara.com/',
    host: 'swaroopsinghkhara.com',
    image: '/images/client-2.webp',
    desc:
      'Constituency-first site with issue pages, event coverage and structured data — built so voters searching his name land on his own words first.',
    build: ['Next.js', 'Technical SEO', 'Schema markup'],
    accent: '#f59e0b',
  },
  {
    name: 'Manpasand Enterprises',
    role: 'Trading & Supply Company',
    sector: 'Business',
    url: 'https://www.manpasandenterprises.co.in/',
    host: 'manpasandenterprises.co.in',
    image: '/images/client-3.webp',
    desc:
      'Company site with a full product catalogue, enquiry capture and Google Business integration for buyers searching by category.',
    build: ['Next.js', 'Catalogue', 'Lead capture'],
    accent: '#38bdf8',
  },
  {
    name: 'Hemant Rajpurohit',
    role: 'Panchayat Samiti Sadsya',
    sector: 'Politician',
    url: 'https://hemantrajpurohit.in/',
    host: 'hemantrajpurohit.in',
    image: '/images/client-4.webp',
    desc:
      'Local leadership site covering ward-level work, public grievance contact and a media section — mobile-first for rural 4G.',
    build: ['Next.js', 'Mobile-first', 'GSC verified'],
    accent: '#f59e0b',
  },
  {
    name: 'Jai Bajrang Bhojanalay',
    role: 'Restaurant · Barmer',
    sector: 'Food & Hospitality',
    url: 'https://www.jaibajrangbhojanalay.in/',
    host: 'jaibajrangbhojanalay.in',
    image: '/images/client-5.webp',
    desc:
      'Digital menu, timings and one-tap call and directions, tuned for “restaurant near me” searches and Google Maps discovery.',
    build: ['Next.js', 'Local SEO', 'Maps + Menu'],
    accent: '#f97316',
  },
  {
    name: 'Kishan Singh Kaludi',
    role: 'Sarpanch · Kaludi',
    sector: 'Politician',
    url: 'https://kishansinghkaludi.in/',
    host: 'kishansinghkaludi.in',
    image: '/images/client-6.webp',
    desc:
      'Village governance site — development work, schemes and direct contact, published in Hindi for the people who actually vote.',
    build: ['Next.js', 'Hindi content', 'Search Console'],
    accent: '#f59e0b',
  },
];

const FILTERS = ['All work', 'Politician', 'Business', 'Food & Hospitality'] as const;
type Filter = (typeof FILTERS)[number];

const capabilities = [
  { icon: Sparkles, label: 'Built on Next.js' },
  { icon: Gauge, label: '90+ Lighthouse scores' },
  { icon: Search, label: 'Search Console configured' },
];

/* ------------------------------------------------------------------ */
/*  STYLES — nd- prefixed so nothing in index.css collides             */
/* ------------------------------------------------------------------ */

const styles = `
@keyframes nd-type  { from { width: 0 } to { width: var(--nd-w) } }
@keyframes nd-caret { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
@keyframes nd-sheen {
  from { transform: translateX(-130%) skewX(-18deg) }
  to   { transform: translateX(240%)  skewX(-18deg) }
}
@keyframes nd-halo  { to { transform: rotate(1turn) } }

.nd-url {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: bottom;
  width: var(--nd-w);
}
.nd-card:hover .nd-url,
.nd-card:focus-within .nd-url {
  animation: nd-type 620ms steps(var(--nd-chars), end) both;
}
.nd-caret { opacity: 0; transition: opacity 200ms }
.nd-card:hover .nd-caret,
.nd-card:focus-within .nd-caret {
  opacity: 1;
  animation: nd-caret 900ms step-end infinite 620ms;
}

.nd-sheen { position: absolute; inset: 0; pointer-events: none; opacity: 0 }
.nd-card:hover .nd-sheen { opacity: 1 }
.nd-card:hover .nd-sheen::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 45%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
  animation: nd-sheen 1100ms cubic-bezier(0.4, 0, 0.2, 1) both;
}

.nd-halo {
  position: absolute;
  inset: -1px;
  border-radius: 1rem;
  padding: 1px;
  opacity: 0;
  transition: opacity 400ms;
  pointer-events: none;
  overflow: hidden;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
}
.nd-card:hover .nd-halo { opacity: 1 }
.nd-halo::before {
  content: '';
  position: absolute;
  inset: -60%;
  background: conic-gradient(from 0deg, transparent 0 62%, var(--nd-accent) 78%, transparent 92%);
  animation: nd-halo 3.4s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .nd-card:hover .nd-url,
  .nd-card:focus-within .nd-url,
  .nd-card:hover .nd-caret,
  .nd-card:focus-within .nd-caret,
  .nd-card:hover .nd-sheen::after,
  .nd-halo::before { animation: none !important }
  .nd-card:hover .nd-sheen { opacity: 0 }
}
`;

/* ------------------------------------------------------------------ */
/*  CARD                                                               */
/* ------------------------------------------------------------------ */

function ProjectCard({
  project,
  reduceMotion,
}: {
  project: Project;
  reduceMotion: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [scrollDist, setScrollDist] = useState(0);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const revealed = useInView(cardRef, { once: true, margin: '-60px' });

  /* --- 3D tilt: motion values, so no React re-render per mousemove --- */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 200, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], ['6deg', '-6deg']), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], ['-6deg', '6deg']), spring);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const r = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      px.set(nx - 0.5);
      py.set(ny - 0.5);
      e.currentTarget.style.setProperty('--nd-x', `${nx * 100}%`);
      e.currentTarget.style.setProperty('--nd-y', `${ny * 100}%`);
    },
    [px, py, reduceMotion],
  );

  /* --- Measure how far a full-page screenshot can scroll ------------- */
  const measure = useCallback(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img || !img.naturalWidth) return;
    const rendered = frame.clientWidth * (img.naturalHeight / img.naturalWidth);
    setScrollDist(Math.max(0, Math.round(rendered - frame.clientHeight)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const duration = useMemo(
    () => Math.min(4200, Math.max(1400, scrollDist * 7)),
    [scrollDist],
  );

  const shouldScroll = active && !reduceMotion && scrollDist > 24;

  return (
    <motion.article
      ref={cardRef}
      layout
      variants={cardVariants}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);
        px.set(0);
        py.set(0);
      }}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1100,
        // @ts-expect-error — CSS custom property
        '--nd-accent': project.accent,
      }}
      className="nd-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-300 hover:border-white/[0.12]"
    >
      {/* Rotating accent halo on the border */}
      <span className="nd-halo" aria-hidden />

      {/* Cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--nd-x, 50%) var(--nd-y, 0%), rgba(34,197,94,0.10), transparent 60%)',
        }}
      />

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the live ${project.name} website in a new tab`}
        className="relative block outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      >
        {/* Browser chrome — the artifact is a website, so frame it like one */}
        <div className="relative flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2">
          <span className="flex gap-1.5">
            <i className="h-2 w-2 rounded-full bg-white/15" />
            <i className="h-2 w-2 rounded-full bg-white/15" />
            <i className="h-2 w-2 rounded-full bg-white/15" />
          </span>

          {/* The URL types itself out on hover */}
          <span className="flex min-w-0 items-center rounded-md bg-black/30 px-2 py-0.5 font-mono text-[10px] tracking-tight text-slate-400 transition-colors duration-300 group-hover:text-green-300">
            <span
              className="nd-url"
              style={{
                // @ts-expect-error — CSS custom properties
                '--nd-chars': project.host.length,
                '--nd-w': `${project.host.length}ch`,
              }}
            >
              {project.host}
            </span>
            <i className="nd-caret ml-px h-2.5 w-px bg-green-400" aria-hidden />
          </span>

          <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-green-400">
            <i className="relative flex h-1.5 w-1.5">
              <i className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <i className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
            </i>
            Live
          </span>

          {/* Scroll-through progress, synced to the preview */}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-px bg-green-400/70"
            style={{
              width: shouldScroll ? '100%' : '0%',
              transitionProperty: 'width',
              transitionDuration: `${shouldScroll ? duration : 400}ms`,
              transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
            }}
          />
        </div>

        {/* Screenshot viewport */}
        <div
          ref={frameRef}
          className="relative h-56 overflow-hidden bg-slate-900 sm:h-64"
        >
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.05] to-transparent" />
          )}

          {/* Reveal wrapper — the page "paints in" from the top */}
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: 'inset(0 0 100% 0)', scale: 1.08 }}
            animate={
              revealed && loaded
                ? { clipPath: 'inset(0 0 0% 0)', scale: 1 }
                : undefined
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <img
              ref={imgRef}
              src={project.image}
              alt={`${project.name} — ${project.role} website designed and developed by NextDukaan`}
              loading="lazy"
              decoding="async"
              onLoad={() => {
                setLoaded(true);
                measure();
              }}
              className="absolute inset-x-0 top-0 w-full will-change-transform"
              style={{
                transform: `translate3d(0, ${shouldScroll ? -scrollDist : 0}px, 0)`,
                transitionProperty: 'transform',
                transitionDuration: `${shouldScroll ? duration : 700}ms`,
                transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
              }}
            />
          </motion.div>

          {/* Light sweep across the glass on hover */}
          <span className="nd-sheen" aria-hidden />

          {/* Bottom fade so the crop never looks like a mistake */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#020617] to-transparent" />

          <span className="pointer-events-none absolute bottom-3 right-3 flex translate-y-2 items-center gap-1.5 rounded-full border border-white/[0.12] bg-black/60 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Visit site
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </a>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-sora truncate text-base font-bold text-white">
              {project.name}
            </h3>
            <p className="mt-0.5 truncate text-xs text-slate-500">{project.role}</p>
          </div>
          <span
            className="mt-1 shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide transition-transform duration-300 group-hover:scale-105"
            style={{ color: project.accent, background: `${project.accent}1a` }}
          >
            {project.sector}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.desc}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.build.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 6 }}
              animate={revealed ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
              className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[11px] text-slate-400 transition-colors duration-300 group-hover:border-white/[0.14]"
            >
              {item}
            </motion.li>
          ))}
        </ul>

        <div
          className="mt-5 h-0.5 w-10 rounded-full transition-all duration-500 group-hover:w-full"
          style={{ background: project.accent, opacity: 0.55 }}
        />
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  MOTION                                                             */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44, rotateX: 10, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.97,
    transition: { duration: 0.25 },
  },
};

/* ------------------------------------------------------------------ */
/*  SECTION                                                            */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion() ?? false;
  const [filter, setFilter] = useState<Filter>('All work');

  const visible = useMemo(
    () =>
      filter === 'All work'
        ? projects
        : projects.filter((p) => p.sector === filter),
    [filter],
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NextDukaan client websites',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: p.url,
    })),
  };

  return (
    <section
      ref={ref}
      id="portfolio"
      className="relative grid-bg overflow-hidden py-28"
      style={{ background: '#020617' }}
    >
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="blob-green pointer-events-none absolute right-0 top-1/4 h-[500px] w-[400px] translate-x-1/3 opacity-10" />
      <div className="blob-orange pointer-events-none absolute bottom-1/4 left-0 h-[300px] w-[300px] -translate-x-1/3 opacity-10" />

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
            Every site here is{' '}
            <span className="text-gradient-green">live right now</span>
          </h2>
          <p className="max-w-xl text-lg text-slate-400">
            10+ premium websites built on Next.js for politicians, companies,
            hotels, cafés and shops. Hover any card to scroll the real page.
          </p>

          <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {capabilities.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-2 text-sm text-slate-500"
              >
                <Icon size={14} className="text-green-400" />
                {label}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
          role="tablist"
          aria-label="Filter work by industry"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {FILTERS.map((item) => {
            const selected = filter === item;
            return (
              <button
                key={item}
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(item)}
                className={`relative rounded-full border px-4 py-2 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] ${
                  selected
                    ? 'border-green-500/40 text-green-300'
                    : 'border-white/[0.08] text-slate-400 hover:border-white/[0.16] hover:text-white'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="nd-filter-pill"
                    className="absolute inset-0 rounded-full bg-green-500/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-10 grid gap-5 [perspective:1400px] sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard
                key={project.url}
                project={project}
                reduceMotion={reduceMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-14 flex flex-col items-center gap-3"
        >
          <a
            href={wa(
              'Hi NextDukaan, I saw your work. I want a website for my business.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-green-500 px-7 py-3.5 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
          >
            Start your project on WhatsApp
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <p className="text-sm text-slate-500">
            Usually replies within an hour · Delivery in 5–10 days
          </p>
        </motion.div>
      </div>
    </section>
  );
}