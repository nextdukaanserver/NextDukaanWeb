import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionLabel from './ui/SectionLabel';
import GlowButton from './ui/GlowButton';

const EMAILJS_SERVICE_ID  = 'service_6syanuw';
const EMAILJS_TEMPLATE_ID = 'template_o6p8s2d';
const EMAILJS_PUBLIC_KEY  = 'H9ymuPA73VrV4lr4A'; // 🔑 Replace with your EmailJS Public Key

const WA_LINK = "https://wa.me/917976139428?text=Hi%20NextDukaan%2C%20I%20want%20to%20get%20started!";

interface FormData {
  name:    string;
  phone:   string;
  service: string;
  message: string;
}

const services = [
  'Web Development',
  'Reels & Social Media',
  'SEO & Google Ranking',
  'Full Growth Package',
  'Custom / Not Sure Yet',
];

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus('loading');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          phone:     data.phone,
          service:   data.service,
          message:   data.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);

      // WhatsApp fallback if email fails
      const msg = encodeURIComponent(
        `Hi NextDukaan!\nName: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}\nMessage: ${data.message}`
      );
      window.open(`https://wa.me/917976139428?text=${msg}`, '_blank');

      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputBase = [
    'w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-600',
    'transition-all duration-200 outline-none',
    'focus:border-green-500/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-green-500/30',
  ].join(' ');

  const inputNormal = `${inputBase} border-white/[0.08]`;
  const inputError  = `${inputBase} border-red-500/40 focus:border-red-500/60 focus:ring-red-500/20`;

  return (
    <section
      ref={ref}
      id="contact"
      className="relative grid-bg overflow-hidden py-28"
      style={{ background: '#020617' }}
    >
      {/* Blobs — big centre glow */}
      <div className="blob-green pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] opacity-[0.12]" />
      <div className="blob-orange pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] opacity-10 -translate-x-1/3" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col items-center gap-6 text-center"
        >
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 className="font-sora max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Ready to take your business{' '}
            <span className="text-gradient-green">online?</span>
          </h2>
          <p className="max-w-xl text-lg text-slate-400">
            Join 50+ businesses already growing with NextDukaan — fill the form or just WhatsApp us.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <GlowButton href={WA_LINK} target="_blank" rel="noopener noreferrer" size="lg">
              WhatsApp Us →
            </GlowButton>
            <GlowButton variant="ghost" size="lg" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
              <MessageCircle size={16} />
              Send a Message
            </GlowButton>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          id="contact-form"
          className="mx-auto max-w-2xl"
        >
          <div className="glass rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="font-sora text-2xl font-bold text-white">Send us a message</h3>
              <p className="mt-1 text-sm text-slate-500">
                We respond within 2 hours during business hours (Mon–Sat, 9am–7pm IST).
              </p>
            </div>

            {/* Success state */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 flex items-start gap-3 rounded-xl border border-green-500/25 bg-green-500/10 p-4"
              >
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-green-400" />
                <div>
                  <p className="text-sm font-semibold text-green-300">Message sent! 🎉</p>
                  <p className="text-xs text-slate-500 mt-0.5">We'll get back to you within 2 hours. 🎉</p>
                </div>
              </motion.div>
            )}

            {/* Error state */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 p-4"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
                <p className="text-sm text-red-300">Something went wrong. Please try WhatsApp directly.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
              {/* Name + Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400">Your Name *</label>
                  <input
                    {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name too short' } })}
                    placeholder="Rajesh Sharma"
                    className={errors.name ? inputError : inputNormal}
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400">Phone Number *</label>
                  <input
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern:  { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit number' },
                    })}
                    placeholder="9876543210"
                    type="tel"
                    className={errors.phone ? inputError : inputNormal}
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Service */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400">Service You Need *</label>
                <select
                  {...register('service', { required: 'Please select a service' })}
                  className={`${errors.service ? inputError : inputNormal} cursor-pointer`}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-slate-900">Select a service…</option>
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-slate-900">{s}</option>
                  ))}
                </select>
                {errors.service && <p className="text-xs text-red-400">{errors.service.message}</p>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400">Tell us about your business</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Briefly describe your business and what you're looking to achieve…"
                  className={`${inputNormal} resize-none`}
                />
              </div>

              {/* Submit */}
              <GlowButton
                type="submit"
                disabled={status === 'loading'}
                size="lg"
                className="w-full justify-center mt-2"
              >
                {status === 'loading' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </GlowButton>

              <p className="text-center text-xs text-slate-600">
                Or reach us directly:{' '}
                <a href="mailto:hello@nextdukaan.in" className="text-green-500 hover:text-green-400 transition-colors">
                  hello@nextdukaan.in
                </a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
