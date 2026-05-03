import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GlowButton from './ui/GlowButton';

const navLinks = [
  { label: 'Services',   href: '#services'     },
  { label: 'Pricing',    href: '#pricing'      },
  { label: 'Portfolio',  href: '#portfolio'    },
  { label: 'About',      href: '#why-us'       },
  { label: 'Contact',    href: '#contact'      },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  };

  return (
    <>
      {/* ── Floating Nav ─────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,  opacity: 1  }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-4 left-0 right-0 z-50 px-4"
      >
        <div className={`mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${scrolled ? 'glass-nav-scrolled' : 'glass-nav'}`}>
          <div className="flex items-center justify-between px-6 py-3.5">
            {/* Logo */}
            <a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 select-none"
            >
              <span className="font-sora text-xl font-bold tracking-tight text-white">
                Next
              </span>
              <span className="font-sora text-xl font-bold tracking-tight text-green-400">
                Dukaan
              </span>
              <span className="relative ml-0.5 h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            </a>

            {/* Desktop Links */}
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-white cursor-pointer bg-transparent border-0"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <GlowButton
                href="https://wa.me/917976139428?text=Hi%20NextDukaan%2C%20I%20want%20to%20get%20started!"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
              >
                Get Started →
              </GlowButton>
            </div>

            {/* Mobile hamburger */}
            <button
              className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-400 transition-colors hover:text-white md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Full-screen Menu ───────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{  opacity: 0, y: -16  }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(2,6,23,0.97)', backdropFilter: 'blur(20px)' }}
          >
            {/* close area */}
            <div className="flex-1 pt-28 px-8">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0   }}
                    transition={{ delay: 0.05 * i  }}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full rounded-xl px-5 py-4 text-left text-xl font-semibold text-slate-300 transition-colors hover:bg-white/[0.04] hover:text-white cursor-pointer bg-transparent border-0"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-8">
                <GlowButton
                  href="https://wa.me/917976139428?text=Hi%20NextDukaan%2C%20I%20want%20to%20get%20started!"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="w-full justify-center"
                >
                  Get Started →
                </GlowButton>
              </div>
            </div>

            <div className="p-8 text-center text-sm text-slate-600">
              Made with ❤️ in India
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
