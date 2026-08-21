import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import "./founderScan.css";

interface Props {
  image: string;
  name: string;
  role: string;
}

export default function FounderScan({ image, name, role }: Props) {
  const [scan, setScan] = useState(0);
  const [done, setDone] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!isInView) return;

    // Motion band hai to scan skip karke seedha reveal
    if (reduceMotion) {
      setScan(100);
      setDone(true);
      return;
    }

    let value = 0;
    let revealTimer: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      value += 2;
      setScan(value);

      if (value >= 100) {
        clearInterval(interval);
        setScan(100);
        revealTimer = setTimeout(() => setDone(true), 600);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      clearTimeout(revealTimer);
    };
  }, [isInView, reduceMotion]);

  return (
    <div className="fs" ref={ref}>
      {!done ? (
        <div
          className="fs-box"
          role="status"
          aria-live="polite"
          aria-label={`Loading profile for ${name}`}
        >
          <div className="fs-grid" />
          <div className="fs-line" />
          <div className="fs-center">
            <div className="fs-ring" />
            <p className="fs-small">SCANNING</p>
            <h3 className="fs-title">FACE ANALYSIS</h3>
            <div
              className="fs-bar"
              role="progressbar"
              aria-valuenow={scan}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div style={{ width: `${scan}%` }} />
            </div>
            <p className="fs-num">{scan}%</p>
          </div>
        </div>
      ) : (
        <motion.div
          className="fs-reveal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={image}
            alt={`${name}, ${role} at NextDukaan`}
            width={220}
            height={220}
            loading="lazy"
            decoding="async"
          />
          <h2>{name}</h2>
          <p>{role}</p>
        </motion.div>
      )}
    </div>
  );
}