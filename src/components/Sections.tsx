import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Leaf, HandHeart, Package, RotateCcw } from "lucide-react";
import { ArrowLink, Parallax, Reveal, RevealImage } from "./Motion";
import { CATEGORIES, CLOSER_LOOK, IMAGES, PROMISES } from "@/data/site";
import { imgProps } from "@/lib/img";

const ease = [0.22, 1, 0.36, 1] as const;
const serif = { fontFamily: "'Cormorant Garamond', serif" };

/* ───────────────────────── HERO ───────────────────────── */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#cfc7bd]">
      <m.div style={{ y: imgY, willChange: "transform" }} className="absolute inset-0 -top-[6%] h-[112%]">
        <m.img
          {...imgProps(IMAGES.hero, "hero", true)}
          alt="Timeless by Design"
          className="h-full w-full object-cover object-[65%_center]"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#d9d1c7]/60 via-transparent to-transparent" />
      </m.div>

      <m.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 flex h-full items-center px-6 md:px-[4%]"
      >
        <div className="max-w-[420px] pt-10 text-[#2b2623]">
          <h1 style={serif} className="overflow-hidden text-[clamp(3rem,6.4vw,5.6rem)] font-normal leading-[1.02]">
            {["Timeless", "by Design"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <m.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.4, delay: 0.5 + i * 0.15, ease }}
                >
                  {line}
                </m.span>
              </span>
            ))}
          </h1>
          <m.p
            className="mt-6 text-[13px] leading-relaxed text-[#4a413b]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease }}
          >
            Thoughtfully crafted silhouettes.
            <br />
            Made to be lived in.
          </m.p>
          <m.div
            className="mt-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.3, ease }}
          >
            <ArrowLink to="/new-in">Explore New In</ArrowLink>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}

/* ───────────────────── SHOP BY CATEGORY ───────────────────── */
export function Categories() {
  return (
    <section className="bg-[#f3f0ed] px-4 pb-16 pt-14 md:px-[0.8%]">
      <Reveal>
        <h2 className="mb-10 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#2b2623]">
          Shop by Category
        </h2>
      </Reveal>
      <div className="flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-5 md:gap-4 md:overflow-visible [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((c, i) => (
          <Link key={c.label} to={c.to} className="group block min-w-[62%] snap-start sm:min-w-[40%] md:min-w-0">
            <RevealImage src={c.src} alt={c.label} delay={i * 0.12} className="aspect-[3/4] bg-[#e4ded8]" />
            <Reveal delay={0.4 + i * 0.1} y={10}>
              <p className="mt-5 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-[#4a413b] transition-opacity group-hover:opacity-60">
                {c.label}
              </p>
            </Reveal>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────── ROOTED IN CRAFT ───────────────────── */
export function Craft() {
  return (
    <section className="grid bg-[#e9e4e0] md:grid-cols-2">
      <div className="group relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[560px]">
  <Parallax
    offset={30}
    className="absolute inset-0 h-full"
  >
    <RevealImage
      src={IMAGES.craft}
      tier="half"
      alt="Craftsmanship detail"
      className="h-full w-full"
    />
  </Parallax>
</div>
      <div className="flex items-center px-8 py-16 md:px-[12%]">
        <div>
          <Reveal>
            <h2 style={serif} className="text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.1] text-[#2b2623]">
              Rooted in Craft,
              <br />
              Made for Today
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[260px] text-[12px] leading-[2] text-[#4a413b]">
              We celebrate craftsmanship, natural fabrics and thoughtful details. Pieces that are subtle, elegant and
              forever relevant.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8">
              <ArrowLink to="/philosophy">Our Philosophy</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── THE SUMMER EDIT ───────────────────── */
export function SummerEdit() {
  return (
    <section className="grid grid-cols-1 items-center gap-8 bg-[#f3f0ed] px-4 py-10 md:grid-cols-[30%_1fr_30%] md:px-[0.8%]">
      <Parallax offset={30}>
        <RevealImage src={IMAGES.summerLeft} alt="The Summer Edit" className="aspect-[4/5] md:aspect-[9/11]" />
      </Parallax>
      <div className="order-first text-center md:order-none">
        <Reveal>
          <h3 className="text-[15px] font-medium uppercase tracking-[0.2em] text-[#2b2623]">The Summer Edit</h3>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-[11px] text-[#4a413b]">Light. Effortless. Refined.</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9">
            <ArrowLink to="/collections">Explore Collection</ArrowLink>
          </div>
        </Reveal>
      </div>
      <Parallax offset={-30}>
        <RevealImage
          src={IMAGES.summerRight}
          alt="The Summer Edit"
          delay={0.2}
          className="aspect-[4/5] md:aspect-[9/11]"
        />
      </Parallax>
    </section>
  );
}

/* ───────────────────── PROMISES STRIP ───────────────────── */
const icons = { leaf: Leaf, care: HandHeart, box: Package, return: RotateCcw };

export function Promises() {
  return (
    <section className="bg-[#ebe6e2] px-6 py-9 md:px-[4%]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 md:grid-cols-4">
        {PROMISES.map((p, i) => {
          const Icon = icons[p.icon];
          return (
            <Reveal key={p.title} delay={i * 0.1} y={14}>
              <div className="flex items-start gap-4 md:justify-center">
                <Icon strokeWidth={1} className="h-7 w-7 shrink-0 text-[#5a4f48]" />
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#2b2623]">{p.title}</p>
                  <p className="mt-1 max-w-[120px] text-[8.5px] leading-[1.6] text-[#5a4f48]">{p.text}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────────────── A CLOSER LOOK ───────────────────── */
export function CloserLook() {
  const row = [...CLOSER_LOOK, ...CLOSER_LOOK];
  return (
    <section className="overflow-hidden bg-[#f3f0ed] pb-24 pt-14">
      <Reveal>
        <h2 className="mb-10 text-center text-[13px] font-medium uppercase tracking-[0.2em] text-[#2b2623]">
          A Closer Look
        </h2>
      </Reveal>
      {/* pure-CSS marquee: runs on the compositor, pauses on hover */}
      <div className="closer-track flex w-max gap-3 px-3">
        {row.map((src, i) => (
          <div key={i} className="group aspect-[3/4] w-[46vw] overflow-hidden sm:w-[24vw] lg:w-[16.2vw]">
            <img
              {...imgProps(src, "thumb")}
              alt="A closer look"
              className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
