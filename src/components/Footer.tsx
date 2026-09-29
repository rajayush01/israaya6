import { useState } from "react";
import { Link } from "react-router-dom";
import { FOOTER } from "@/data/site";
import { Reveal } from "./Motion";

const head = "mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2b2623]";
const item = "text-[12px] text-[#5a4f48] transition-colors hover:text-[#2b2623]";

export default function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <footer className="overflow-hidden bg-[#ebe6e2] text-[#2b2623]">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 pb-14 pt-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10">
        <Reveal>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl leading-tight">
            Join the Israaya circle
          </h3>
          <p className="mt-3 max-w-[280px] text-[12px] leading-relaxed text-[#5a4f48]">
            New chapters, quiet launches and stories from the atelier.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="mt-7 flex max-w-[320px] items-center border-b border-[#2b2623]/40 pb-2 transition-colors focus-within:border-[#2b2623]"
          >
            <input required type="email" placeholder="Your email address" className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#8a7f77]" />
            <button className="text-[10px] font-medium uppercase tracking-[0.16em] transition-transform hover:translate-x-1">
              {sent ? "Thank you" : "Subscribe →"}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <h4 className={head}>Shop</h4>
          <ul className="space-y-3">{FOOTER.shop.map((l) => <li key={l.to}><Link to={l.to} className={item}>{l.label}</Link></li>)}</ul>
        </Reveal>
        <Reveal delay={0.2}>
          <h4 className={head}>The House</h4>
          <ul className="space-y-3">
            {FOOTER.house.map((l) => <li key={l.to}><Link to={l.to} className={item}>{l.label}</Link></li>)}
            <li><a href={FOOTER.instagram} target="_blank" rel="noreferrer" className={item}>Instagram</a></li>
          </ul>
        </Reveal>
        <Reveal delay={0.3}>
          <h4 className={head}>Care</h4>
          <ul className="space-y-3">{FOOTER.care.map((t) => <li key={t} className="text-[12px] text-[#5a4f48]">{t}</li>)}</ul>
        </Reveal>
      </div>

      <Reveal y={60}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="select-none text-center text-[22vw] font-light leading-[0.8] tracking-[0.06em] text-[#2b2623]/[0.06]">
          ISRAAYA
        </p>
      </Reveal>

      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 border-t border-[#2b2623]/10 px-6 py-6 text-[10px] uppercase tracking-[0.14em] text-[#7a6f67] md:flex-row md:px-10">
        <span>© {new Date().getFullYear()} Israaya. All rights reserved.</span>
        <span>Timeless by Design</span>
      </div>
    </footer>
  );
}
