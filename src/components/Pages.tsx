import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLink, Reveal, RevealImage } from "./Motion";
import { COLLECTIONS, IMAGES, PAGES, img } from "@/data/site";

const serif = { fontFamily: "'Cormorant Garamond', serif" };
const ease = [0.22, 1, 0.36, 1] as const;

function PageHeader({ eyebrow, title, blurb }: { eyebrow: string; title: string; blurb: string }) {
  return (
    <header className="px-6 pb-14 pt-40 text-center">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#7a6f67]">
        {eyebrow}
      </motion.p>
      <h1 style={serif} className="mt-4 overflow-hidden text-[clamp(2.8rem,6vw,5rem)] leading-none">
        <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.3, delay: 0.5, ease }}>{title}</motion.span>
      </h1>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }} className="mx-auto mt-6 max-w-[380px] text-[13px] leading-relaxed text-[#4a413b]">
        {blurb}
      </motion.p>
    </header>
  );
}

/* /new-in, /ready-to-wear, /occasions */
export function ShopPage() {
  const { slug = "" } = useParams();
  const page = PAGES[slug];
  if (!page) return <Navigate to="/" replace />;
  return (
    <section className="bg-[#f3f0ed] pb-24">
      <PageHeader {...page} />
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 px-3 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4 lg:px-[0.8%]">
        {page.images.map((src, i) => (
          <a key={src + i} href="#" className="group block">
            <div className="relative">
              <RevealImage src={src} alt={`${page.title} ${i + 1}`} delay={(i % 4) * 0.1} className="aspect-[3/4] bg-[#e4ded8]" />
              <span className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-[10px] uppercase tracking-[0.18em] text-white opacity-0 transition-opacity duration-700 group-hover:opacity-100">View</span>
            </div>
            <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-[#4a413b]">
              {page.title} · {String(i + 1).padStart(2, "0")}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

/* /collections */
export function CollectionsPage() {
  return (
    <section className="bg-[#f3f0ed] pb-10">
      <PageHeader eyebrow="Curated Chapters" title="Collections" blurb="Stories told in fabric, thread and light — explore each edit." />
      {COLLECTIONS.map((c, i) => (
        <div key={c.name} className={`grid items-center md:grid-cols-2 ${i % 2 ? "bg-[#e9e4e0]" : ""}`}>
          <div className={i % 2 ? "md:order-2" : ""}>
            <RevealImage src={c.src} alt={c.name} className="aspect-[4/5] md:aspect-[1/1]" />
          </div>
          <div className="px-8 py-16 text-center">
            <Reveal><h2 style={serif} className="text-[clamp(2rem,3.6vw,3.4rem)]">{c.name}</h2></Reveal>
            <Reveal delay={0.12}><p className="mt-4 text-[12px] text-[#4a413b]">{c.line}</p></Reveal>
            <Reveal delay={0.24}><div className="mt-8"><ArrowLink to={c.to}>Explore Collection</ArrowLink></div></Reveal>
          </div>
        </div>
      ))}
    </section>
  );
}

/* /philosophy */
export function PhilosophyPage() {
  const values = [
    ["Natural Fabrics", "Premium fabrics, consciously sourced."],
    ["Crafted With Care", "Timeless pieces, rich in detail."],
    ["Made to Be Lived In", "Thoughtfully crafted silhouettes."],
  ];
  return (
    <section className="bg-[#f3f0ed]">
      <PageHeader eyebrow="Our Philosophy" title="Rooted in Craft, Made for Today" blurb="We celebrate craftsmanship, natural fabrics and thoughtful details. Pieces that are subtle, elegant and forever relevant." />
      <div className="mx-auto grid max-w-[1200px] gap-4 px-4 md:grid-cols-2">
        <RevealImage src={IMAGES.craft} alt="Craft detail" className="aspect-[4/5]" />
        <RevealImage src={img(7963)} alt="Israaya" delay={0.15} className="aspect-[4/5] md:mt-24" />
      </div>
      <div className="mx-auto grid max-w-[1100px] gap-10 px-6 py-24 text-center md:grid-cols-3">
        {values.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.12}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em]">{t}</h3>
            <p className="mx-auto mt-3 max-w-[220px] text-[12px] leading-relaxed text-[#5a4f48]">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* /account */
export function AccountPage() {
  const field = "w-full border-b border-[#2b2623]/30 bg-transparent pb-3 text-[13px] outline-none transition-colors placeholder:text-[#a1968d] focus:border-[#2b2623]";
  return (
    <section className="min-h-screen bg-[#f3f0ed] px-6 pb-24">
      <PageHeader eyebrow="Welcome Back" title="Account" blurb="Sign in to view your orders and saved pieces." />
      <form onSubmit={(e) => e.preventDefault()} className="mx-auto max-w-[360px] space-y-8">
        <input type="email" required placeholder="Email address" className={field} />
        <input type="password" required placeholder="Password" className={field} />
        <button className="w-full bg-[#2b2623] py-4 text-[10px] uppercase tracking-[0.2em] text-[#f3f0ed] transition-opacity hover:opacity-85">Sign In</button>
        <p className="text-center text-[11px] text-[#5a4f48]">New to Israaya? <Link to="/account" className="border-b border-current">Create an account</Link></p>
      </form>
    </section>
  );
}
