import { motion } from 'framer-motion';

const businesses = [
  { name: 'Sharma Chai Corner',   emoji: '☕' },
  { name: 'Little Stars Academy', emoji: '🎓' },
  { name: 'Kumar Hardware Store',  emoji: '🔧' },
  { name: 'Glow & Grow Salon',    emoji: '💇' },
  { name: 'Al-Noor Bakery',       emoji: '🥐' },
  { name: 'Reddy Flowers & Gifts',emoji: '🌸' },
  { name: 'Spice Route Restaurant',emoji: '🍛' },
  { name: 'Bloom Boutique',       emoji: '👗' },
  { name: 'QuickFix Auto',        emoji: '🚗' },
  { name: 'Organic Roots',        emoji: '🌿' },
  { name: 'CraftBrew Co.',        emoji: '🍺' },
  { name: 'Sunrise Academy',      emoji: '📚' },
];

// Duplicate for seamless loop
const items = [...businesses, ...businesses];

export default function TrustBelt() {
  return (
    <section
      className="relative overflow-hidden py-10 border-y"
      style={{
        background: '#0a0f1e',
        borderColor: 'rgba(255,255,255,0.04)',
      }}
    >
      {/* Edge fade masks */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32"
        style={{ background: 'linear-gradient(90deg, #0a0f1e 0%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32"
        style={{ background: 'linear-gradient(270deg, #0a0f1e 0%, transparent 100%)' }}
      />

      {/* Label */}
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
          Trusted by local businesses across India
        </p>
      </div>

      {/* Marquee */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-6 shrink-0 animate-marquee"
          style={{ willChange: 'transform' }}
        >
          {items.map((biz, i) => (
            <div
              key={`${biz.name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-2.5"
            >
              <span className="text-base leading-none">{biz.emoji}</span>
              <span className="text-sm font-medium text-slate-400 whitespace-nowrap">{biz.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
