import { MessageCircle, Mail, Phone, ArrowUpRight } from 'lucide-react';

// Simple SVG social icons to avoid lucide version mismatch
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const navLinks = [
  { label: 'Services',     href: '#services'     },
  { label: 'Pricing',      href: '#pricing'      },
  { label: 'Portfolio',    href: '#portfolio'    },
  { label: 'Why Us',       href: '#why-us'       },
  { label: 'Process',      href: '#process'      },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact',      href: '#contact'      },
];

const socials = [
  {
    icon:  InstagramIcon,
    label: 'Instagram',
    href:  'https://instagram.com/nextdukaan',
    color: 'hover:text-pink-400',
  },
  {
    icon:  LinkedInIcon,
    label: 'LinkedIn',
    href:  'https://linkedin.com/company/nextdukaan',
    color: 'hover:text-blue-400',
  },
  {
    icon:  MessageCircle,
    label: 'WhatsApp',
    href:  'https://wa.me/917976139428',
    color: 'hover:text-green-400',
  },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative border-t"
      style={{ background: '#020617', borderColor: 'rgba(255,255,255,0.05)' }}
    >
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <button onClick={scrollTop} className="inline-flex items-center gap-1.5 select-none bg-transparent border-0 cursor-pointer p-0 w-fit">
              <span className="font-sora text-xl font-bold tracking-tight text-white">Next</span>
              <span className="font-sora text-xl font-bold tracking-tight text-green-400">Dukaan</span>
              <span className="relative ml-0.5 h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            </button>

            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Helping Indian local businesses — shops, cafes, schools — build a powerful digital presence.
              From idea to live in days.
            </p>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1.5 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
              <span className="text-xs font-medium text-green-400">Local to Digital</span>
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-1">
              {socials.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-slate-500 transition-all duration-200 ${color} hover:border-white/[0.12]`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-600">Navigation</h4>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-500 transition-colors duration-150 hover:text-white w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-600">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@nextdukaan.in"
                className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-white group"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                  <Mail size={13} />
                </div>
                <span>hello@nextdukaan.in</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="tel:+917976139428"
                className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-white group"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                  <Phone size={13} />
                </div>
                <span>+91 99999 99999</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="https://wa.me/917976139428"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-green-400 group"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                  <MessageCircle size={13} />
                </div>
                <span>WhatsApp Chat</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Working hours */}
            <div className="mt-1 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
              <p className="text-xs font-medium text-slate-400">Business Hours</p>
              <p className="mt-1 text-xs text-slate-600">Mon – Sat: 9:00 AM – 7:00 PM IST</p>
              <p className="text-xs text-slate-600">Sunday: By appointment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-4 py-5"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-700 sm:flex-row sm:gap-0">
          <p>© {new Date().getFullYear()} NextDukaan. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-500">❤️</span> in India 🇮🇳
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
