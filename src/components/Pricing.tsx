import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, Zap } from 'lucide-react';
import SectionLabel from './ui/SectionLabel';
import GlowButton from './ui/GlowButton';

const WA_BASE = 'https://wa.me/917976139428?text=Hi%20NextDukaan%2C%20I%20am%20interested%20in%20the%20';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name:     string;
  price:    string;
  subtitle: string;
  for:      string;
  features: PlanFeature[];
  popular:  boolean;
  cta:      string;
  waMsg:    string;
}

const plans: Plan[] = [
  {
    name:     'Starter',
    price:    '₹4,999',
    subtitle: 'Perfect to launch fast',
    for:      'New businesses going online',
    popular:  false,
    cta:      'Get Starter Plan',
    waMsg:    'Starter%20plan',
    features: [
      { text: '5-page responsive website',          included: true  },
      { text: 'Mobile-first design',                included: true  },
      { text: 'Contact form + WhatsApp button',     included: true  },
      { text: 'Google Business setup',              included: true  },
      { text: '3 months free support',              included: true  },
      { text: 'Custom domain + hosting guidance',   included: true  },
      { text: 'Social media reels (monthly)',       included: false },
      { text: 'SEO keyword strategy',               included: false },
      { text: 'E-commerce / booking system',        included: false },
      { text: 'Priority support',                   included: false },
    ],
  },
  {
    name:     'Growth',
    price:    '₹9,999',
    subtitle: 'For serious digital presence',
    for:      'Established shops wanting strong digital presence',
    popular:  true,
    cta:      'Get Growth Plan',
    waMsg:    'Growth%20plan',
    features: [
      { text: '10-page responsive website',         included: true  },
      { text: 'Mobile-first design',                included: true  },
      { text: 'Contact form + WhatsApp button',     included: true  },
      { text: 'Google Business optimisation',       included: true  },
      { text: '6 months free support',              included: true  },
      { text: 'Custom domain + hosting setup',      included: true  },
      { text: '4 social media reels/month',         included: true  },
      { text: 'Local SEO keyword strategy',         included: true  },
      { text: 'E-commerce / booking system',        included: false },
      { text: 'Priority support',                   included: false },
    ],
  },
  {
    name:     'Scale',
    price:    '₹24,999+',
    subtitle: 'Full-stack digital growth',
    for:      'Multi-location or high-traffic businesses',
    popular:  false,
    cta:      'Get Scale Plan',
    waMsg:    'Scale%20plan',
    features: [
      { text: 'Unlimited pages + custom design',    included: true  },
      { text: 'Mobile-first design',                included: true  },
      { text: 'Advanced forms & integrations',      included: true  },
      { text: 'Google Business + Ads setup',        included: true  },
      { text: '12 months priority support',         included: true  },
      { text: 'Managed hosting & domain',           included: true  },
      { text: '8+ social media reels/month',        included: true  },
      { text: 'Full SEO + ranking reports',         included: true  },
      { text: 'E-commerce / booking system',        included: true  },
      { text: 'Dedicated account manager',          included: true  },
    ],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative grid-bg overflow-hidden py-28"
      style={{ background: '#0a0f1e' }}
    >
      {/* Blobs */}
      <div className="blob-green pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] opacity-10" />
      <div className="blob-orange pointer-events-none absolute bottom-0 right-0 h-[350px] w-[350px] opacity-15 translate-x-1/4" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <SectionLabel>Transparent Pricing</SectionLabel>
          <h2 className="font-sora max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Simple pricing,{' '}
            <span className="text-gradient-green">serious results</span>
          </h2>
          <p className="max-w-lg text-lg text-slate-400">
            No hidden fees. No surprise invoices. Just clear deliverables and real growth.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-16 grid gap-6 md:grid-cols-3 items-stretch"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? 'pricing-popular border-green-500/40 bg-[#0f1f12] md:scale-[1.05] md:-mt-2'
                  : 'border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12]'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500 px-4 py-1 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                    <Zap size={11} /> Most Popular
                  </span>
                </div>
              )}

              <div className="flex flex-col flex-1 p-7 gap-6">
                {/* Plan header */}
                <div className="flex flex-col gap-1">
                  <span className={`text-sm font-semibold uppercase tracking-widest ${plan.popular ? 'text-green-400' : 'text-slate-500'}`}>
                    {plan.name}
                  </span>
                  <div className="font-sora text-2xl font-black text-white">{plan.price}</div>
                  <p className="text-sm text-slate-400">{plan.subtitle}</p>
                </div>

                {/* For */}
                <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2">
                  <p className="text-xs text-slate-500">Best for: <span className="text-slate-300">{plan.for}</span></p>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.05]" />

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map(({ text, included }) => (
                    <li key={text} className={`flex items-start gap-2.5 text-sm ${included ? 'text-slate-300' : 'text-slate-600'}`}>
                      {included
                        ? <Check size={15} className="mt-0.5 shrink-0 text-green-400" />
                        : <X     size={15} className="mt-0.5 shrink-0 text-slate-700" />}
                      {text}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <GlowButton
                  href={`${WA_BASE}${plan.waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={plan.popular ? 'primary' : 'ghost'}
                  className="w-full justify-center mt-2"
                >
                  {plan.cta} →
                </GlowButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center text-sm text-slate-600"
        >
          All plans include free consultation · Prices vary based on scope ·{' '}
          <a href="#contact" className="text-green-500 hover:text-green-400 transition-colors">Need a custom quote?</a>
        </motion.p>
      </div>
    </section>
  );
}
