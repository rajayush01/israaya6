import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + rise on scroll into view */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Image with clip-path curtain reveal + slow hover zoom */
export function RevealImage({
  src,
  alt,
  className = "",
  delay = 0,
  zoom = true,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  zoom?: boolean;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.3, delay, ease }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${zoom ? "transition-transform duration-[1600ms] ease-out group-hover:scale-105" : ""}`}
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay, ease }}
      />
    </motion.div>
  );
}

/** Vertical parallax wrapper */
export function Parallax({
  children,
  offset = 60,
  className = "",
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/** Underlined text link with arrow that slides */
export function ArrowLink({ children, to = "/" }: { children: ReactNode; to?: string }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#2b2623]">
      <span className="relative pb-1">
        {children}
        <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#2b2623] transition-transform duration-700 group-hover:scale-x-50" />
      </span>
      <span className="relative pb-1 transition-transform duration-500 group-hover:translate-x-2">
        →
        <span className="absolute bottom-0 left-0 h-px w-full bg-[#2b2623]" />
      </span>
    </Link>
  );
}
