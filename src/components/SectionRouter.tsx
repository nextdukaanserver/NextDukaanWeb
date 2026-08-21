import { useEffect } from 'react';

/** URL path → section id on the homepage */
const ROUTES: Record<string, string> = {
  '/portfolio': 'portfolio',
  '/work': 'portfolio',
  '/our-work': 'portfolio',
  '/services': 'services',
  '/technology': 'technology',
  '/stack': 'technology',
  '/why-us': 'why-us',
  '/about': 'why-us',
  '/process': 'process',
  '/how-it-works': 'process',
  '/testimonials': 'testimonials',
  '/reviews': 'testimonials',
  '/contact': 'contact',
};

export default function SectionRouter() {
  useEffect(() => {
    const go = () => {
      const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
      const id = ROUTES[path];
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Sections framer-motion se animate hote hain — settle hone ka wait
      requestAnimationFrame(() => {
        setTimeout(() => {
          target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        }, 150);
      });
    };

    go();
    window.addEventListener('popstate', go);
    return () => window.removeEventListener('popstate', go);
  }, []);

  return null;
}