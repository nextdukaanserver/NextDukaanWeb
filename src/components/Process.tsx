import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from './ui/SectionLabel';

const steps = [
  {
    number: '01',
    emoji:  '💬',
    title:  'You Contact Us',
    desc:   'Reach out via WhatsApp or our form. We schedule a free 30-min discovery call to understand your business and goals.',
    active: true,
  },
  {
    number: '02',
    emoji:  '🎨',
    title:  'We Design',
    desc:   'Our designers craft a custom visual identity — wireframes, colour palette, and layout — unique to your brand.',
    active: false,
  },
  {
    number: '03',
    emoji:  '🛠️',
    title:  'We Build',
    desc:   'Our engineers bring the design to life — fast, mobile-optimised, and wired up with all the tools you need.',
    active: false,
  },
  {
    number: '04',
    emoji:  '🚀',
    title:  'You Launch',
    desc:   'Go live in 5–10 days. We handle the domain, hosting, and give you a handoff walkthrough — you\'re ready to grow.',
    active: false,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="process"
      className="relative grid-bg overflow-hidden py-28"
      style={{ background: '#020617' }}
    >
      {/* Blobs */}
      <div className="blob-green pointer-events-none absolute left-1/4 top-0 h-[400px] w-[600px] opacity-[0.08]" />
      <div className="blob-blue  pointer-events-none absolute right-0 bottom-0 h-[300px] w-[400px] opacity-[0.08] translate-x-1/3" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center mb-20"
        >
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-sora max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
            From idea to live in{' '}
            <span className="text-gradient-green">4 simple steps</span>
          </h2>
          <p className="max-w-lg text-lg text-slate-400">
            A smooth, transparent process — you always know what's happening and when.
          </p>
        </motion.div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="relative"
        >
          {/* Horizontal connecting line — desktop only */}
          <div
            className="pointer-events-none absolute top-[28px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] hidden h-px lg:block"
            style={{ background: 'linear-gradient(90deg, rgba(34,197,94,0.5), rgba(34,197,94,0.15), rgba(255,255,255,0.06), rgba(255,255,255,0.06))' }}
          />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative flex flex-col items-center text-center gap-5 lg:items-center"
              >
                {/* Step circle */}
                <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-lg z-10 transition-all ${
                  step.active
                    ? 'border-green-500 bg-green-500/20 shadow-[0_0_24px_rgba(34,197,94,0.4)]'
                    : 'border-white/[0.12] bg-white/[0.04]'
                }`}>
                  <span className="text-2xl">{step.emoji}</span>

                  {/* Step number badge */}
                  <span
                    className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                      step.active ? 'bg-green-500 text-slate-950' : 'bg-white/10 text-slate-500'
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className={`font-sora text-lg font-bold ${step.active ? 'text-white' : 'text-slate-300'}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 max-w-[220px] mx-auto lg:mx-0">
                    {step.desc}
                  </p>
                </div>

                {/* Mobile vertical connector (not the last step) */}
                {i < steps.length - 1 && (
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-px h-8 lg:hidden"
                    style={{ background: 'linear-gradient(180deg, rgba(34,197,94,0.4), transparent)' }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <a
            href="https://wa.me/917976139428?text=Hi%20NextDukaan%2C%20I%20am%20ready%20to%20start!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-green-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-[0_0_32px_rgba(34,197,94,0.4)] transition-all duration-200 hover:bg-green-400 hover:shadow-[0_0_48px_rgba(34,197,94,0.6)]"
          >
            Start Your Journey →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
