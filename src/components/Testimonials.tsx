import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import SectionLabel from './ui/SectionLabel';

const testimonials = [
  {
    quote:    "NextDukaan transformed our chai shop into a proper brand. We now get 30+ orders daily through our website. The whole thing was done in just 8 days!",
    name:     'Rajesh Sharma',
    business: 'Sharma Chai Corner, Delhi',
    type:     'Food & Beverage',
    rating:   5,
    initials: 'RS',
    color:    '#22c55e',
  },
  {
    quote:    "Our school admissions went up 40% after the website launch. Parents can now fill forms online, check fees, and contact teachers — all in one place. Brilliant work.",
    name:     'Priya Menon',
    business: 'Little Stars Academy, Bangalore',
    type:     'Education',
    rating:   5,
    initials: 'PM',
    color:    '#6366f1',
  },
  {
    quote:    "I was sceptical about spending on digital marketing, but NextDukaan's ROI was unbelievable. We're now #1 on Google for our area. Worth every rupee.",
    name:     'Aditya Kumar',
    business: 'Kumar Hardware Store, Pune',
    type:     'Retail',
    rating:   5,
    initials: 'AK',
    color:    '#f97316',
  },
  {
    quote:    "The reels they made for us went viral — we got 500+ DMs in a week. Our salon is booked out for the next month. These guys know their craft.",
    name:     'Sunita Joshi',
    business: 'Glow & Grow Salon, Mumbai',
    type:     'Beauty & Wellness',
    rating:   5,
    initials: 'SJ',
    color:    '#ec4899',
  },
  {
    quote:    "Fast delivery, fair pricing, and they actually care about results — not just deliverables. Our new website looks premium and converts visitors to walk-ins.",
    name:     'Mohammed Rafi',
    business: 'Al-Noor Bakery, Hyderabad',
    type:     'Bakery & Café',
    rating:   5,
    initials: 'MR',
    color:    '#f59e0b',
  },
  {
    quote:    "We had zero online presence. Now we have a great website, active Instagram, and customers finding us on Google. NextDukaan made it all simple and stress-free.",
    name:     'Kavita Reddy',
    business: 'Reddy Flowers & Gifts, Chennai',
    type:     'Retail & Events',
    rating:   5,
    initials: 'KR',
    color:    '#06b6d4',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative overflow-hidden py-28"
      style={{ background: '#0a0f1e' }}
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Blobs */}
      <div className="blob-green pointer-events-none absolute -top-20 right-1/4 h-[500px] w-[500px] opacity-[0.08]" />
      <div className="blob-blue  pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] opacity-[0.07] -translate-x-1/4" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center mb-16"
        >
          <SectionLabel>What Clients Say</SectionLabel>
          <h2 className="font-sora max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Businesses that{' '}
            <span className="text-gradient-green">grew with us</span>
          </h2>
          <p className="max-w-lg text-lg text-slate-400">
            Don't take our word for it — hear from the shop owners, cafe founders, and school directors we've helped.
          </p>
        </motion.div>

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="testimonial-card glass rounded-2xl p-6 flex flex-col gap-4 hover:border-green-500/20 transition-all duration-300"
              style={{ borderLeft: `2px solid ${t.color}50` }}
            >
              {/* Quote icon */}
              <Quote size={20} className="text-green-500/30" />

              {/* Stars */}
              <StarRating count={t.rating} />

              {/* Quote text */}
              <p className="flex-1 text-sm leading-relaxed text-slate-300">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="h-px bg-white/[0.05]" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-slate-950"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.business}</p>
                </div>
                <div className="ml-auto rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[10px] text-slate-500">
                  {t.type}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-slate-500">
            <span className="text-white font-semibold">4.9/5</span> average rating across 50+ client projects
          </p>
        </motion.div>
      </div>
    </section>
  );
}
