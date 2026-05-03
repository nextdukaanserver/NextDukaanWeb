import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MessageCircle, Star, Users, Clock, ThumbsUp } from 'lucide-react';
import GlowButton from './ui/GlowButton';

const WA_LINK = "https://wa.me/917976139428?text=Hi%20NextDukaan%2C%20I%20want%20to%20get%20started!";

const trustItems = [
  { icon: Star,     label: '4.9 Rating'          },
  { icon: Users,    label: '50+ Clients'          },
  { icon: Clock,    label: '5–10 Day Delivery'    },
  { icon: ThumbsUp, label: '100% Satisfaction'    },
];

/* ── Browser Mockup ──────────────────────────────────────────────── */
function BrowserMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0,  scale: 1     }}
      transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-lg"
    >
      {/* Glow behind the mockup */}
      <div className="absolute -inset-8 blob-green opacity-60 pointer-events-none" />

      {/* Browser frame */}
      <div className="relative z-10 rounded-2xl border border-white/10 bg-[#0f172a] shadow-2xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#0a0f1e] px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
          </div>

          {/* URL bar */}
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.9)]" />
            <span className="font-mono text-xs text-slate-400">
              yourshop.nextdukaan.in
              <span className="cursor-blink ml-0.5 text-green-400">|</span>
            </span>
          </div>
        </div>

        {/* Page preview */}
        <div className="p-5 space-y-3">
          {/* Nav mock */}
          <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5">
            <div className="h-2.5 w-20 rounded-full bg-green-500/60" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-2 w-12 rounded-full bg-white/10" />
              ))}
              <div className="h-6 w-16 rounded-full bg-green-500/40" />
            </div>
          </div>

          {/* Hero text mock */}
          <div className="space-y-2 px-2 pt-2">
            <div className="h-5 w-3/4 rounded-full bg-white/20" />
            <div className="h-5 w-1/2 rounded-full bg-green-500/40" />
            <div className="h-3 w-full rounded-full bg-white/10 mt-3" />
            <div className="h-3 w-5/6 rounded-full bg-white/08" />
            <div className="mt-4 flex gap-2">
              <div className="h-8 w-28 rounded-full bg-green-500/60" />
              <div className="h-8 w-28 rounded-full border border-green-500/30 bg-transparent" />
            </div>
          </div>

          {/* Cards mock */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl border border-white/[0.05] bg-white/[0.03] p-3 space-y-2">
                <div className="h-4 w-4 rounded-md bg-green-500/50" />
                <div className="h-2 w-full rounded-full bg-white/10" />
                <div className="h-2 w-3/4 rounded-full bg-white/08" />
              </div>
            ))}
          </div>

          {/* Stat bar mock */}
          <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="h-2 w-10 rounded-full bg-green-500/40" />
                <div className="h-1.5 w-8 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-4 -top-4 z-20 flex items-center gap-2 rounded-full border border-green-500/30 bg-[#0f172a] px-3 py-2 shadow-lg"
      >
        <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,1)]" />
        <span className="text-xs font-semibold text-green-400">Live & Ranking</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-4 -left-4 z-20 flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0f172a] px-3 py-2 shadow-lg"
      >
        <div className="flex -space-x-1.5">
          {['#22c55e', '#f97316', '#6366f1'].map((c, i) => (
            <div key={i} className="h-5 w-5 rounded-full border border-[#0f172a]" style={{ background: c }} />
          ))}
        </div>
        <span className="text-xs text-slate-400">+50 happy clients</span>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Hero Component ─────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const blobY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0  },
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative grid-bg min-h-screen overflow-hidden"
      style={{ background: '#020617' }}
    >
      {/* ── Glow blobs ──────────────────────────────────────────── */}
      <motion.div
        style={{ y: blobY }}
        className="blob-green pointer-events-none absolute -top-40 left-1/2 -translate-x-1/4 h-[700px] w-[700px] opacity-40"
      />
      <div className="blob-orange pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] opacity-30 translate-x-1/4 translate-y-1/4" />
      <div className="blob-blue pointer-events-none absolute top-1/2 -left-40 h-[300px] w-[300px] opacity-20" />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-36 pb-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left */}
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-6"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-300">
                <span>⚡</span>
                Trusted by 50+ Local Businesses
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              className="font-sora text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              From Local Shop
              <br />
              to{' '}
              <span className="text-gradient-green">Digital Brand.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              We build websites, shoot reels &amp; run SEO — so your business gets{' '}
              <span className="text-slate-200 font-medium">found, trusted, and chosen.</span>
            </motion.p>

            {/* CTA Row */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              <GlowButton href={WA_LINK} target="_blank" rel="noopener noreferrer" size="lg">
                Get Started <ArrowRight size={16} />
              </GlowButton>
              <GlowButton href={WA_LINK} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
                <MessageCircle size={16} />
                Chat on WhatsApp
              </GlowButton>
            </motion.div>

            {/* Trust bar */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Icon size={14} className="text-green-500/70" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Browser Mockup */}
          <div className="hidden lg:block">
            <BrowserMockup />
          </div>
        </div>

        {/* Mobile mockup */}
        <div className="mt-16 block lg:hidden">
          <BrowserMockup />
        </div>

        {/* ── Scroll indicator ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-4 w-0.5 rounded-full bg-green-500/40"
          />
        </motion.div>
      </div>
    </section>
  );
}
