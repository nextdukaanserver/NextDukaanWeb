import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./FounderScan.css";

interface Props {
  image: string;
  name: string;
  role: string;
}

export default function FounderScan({ image, name, role }: Props) {
  const [scan, setScan] = useState(0);
  const [done, setDone] = useState(false);
  
  // NEW: Component khud detect karega ki wo screen par aaya ya nahi
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    // Agar screen par nahi hai, toh timer start hi mat karo
    if (!isInView) return;

    let value = 0;
    const interval = setInterval(() => {
      value += 2;
      setScan(value);

      if (value >= 100) {
        clearInterval(interval);
        setScan(100);
        setTimeout(() => setDone(true), 600);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isInView]); // isInView par depend karega

  return (
    <div className="fs" ref={ref}>
      {!done ? (
        <div className="fs-box">
          <div className="fs-grid" />
          <div className="fs-line" />
          <div className="fs-center">
            <div className="fs-ring" />
            <p className="fs-small">SCANNING</p>
            <h3 className="fs-title">FACE ANALYSIS</h3>
            <div className="fs-bar">
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
        >
          <img src={image} alt={name} />
          <h2>{name}</h2>
          <p>{role}</p>
        </motion.div>
      )}
    </div>
  );
}