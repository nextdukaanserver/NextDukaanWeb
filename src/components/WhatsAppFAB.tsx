import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

const WA_LINK = "https://wa.me/917976139428?text=Hi%20NextDukaan%2C%20I%20am%20interested%20in%20growing%20my%20business%20online!";

export default function WhatsAppFAB() {
  const [tooltip, setTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1  }}
            exit={{   opacity: 0, y: 8, scale: 0.9  }}
            className="flex items-start gap-2 rounded-2xl border border-white/[0.08] bg-[#0f172a] p-3 pr-3 shadow-xl max-w-[220px]"
          >
            <div className="flex-1">
              <p className="text-xs font-semibold text-white">Chat with us!</p>
              <p className="text-[11px] text-slate-500 mt-0.5">We reply in minutes 🚀</p>
            </div>
            <button
              onClick={() => setTooltip(false)}
              className="shrink-0 mt-0.5 text-slate-600 hover:text-slate-400 transition-colors"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 1.5 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="pulse-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-[0_0_24px_rgba(34,197,94,0.5)] transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(34,197,94,0.7)]"
        onClick={() => setTooltip(false)}
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-slate-950"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        {/* Online indicator */}
        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#020617] bg-green-300 shadow-[0_0_8px_rgba(34,197,94,1)]" />
      </motion.a>
    </div>
  );
}
