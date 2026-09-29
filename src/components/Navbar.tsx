import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_LEFT } from "@/data/site";
import logo from "../assets/logonobg.png"

function Logo() {
  return (
    <img src={logo} alt="logo" className="h-20 w-20 -mt-5">
    </img>
  );
}

const linkCls =
  "relative text-[10px] font-medium uppercase tracking-[0.16em] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100";

export default function Navbar({ onSearch, onBag, bagCount }: { onSearch: () => void; onBag: () => void; bagCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const solid = scrolled || pathname !== "/";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 text-[#2b2623] transition-all duration-700 ${
          solid ? "bg-[#f3f0ed]/85 py-4 backdrop-blur-md" : "py-7"
        }`}
      >
        <nav className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10">
          <ul className="hidden gap-10 md:flex">
            {NAV_LEFT.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => `${linkCls} ${isActive ? "after:scale-x-100" : ""}`}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button onClick={() => setMenu(true)} className="justify-self-start text-[10px] uppercase tracking-[0.16em] md:hidden">
            Menu
          </button>
          <Link to="/" aria-label="Israaya" className="justify-self-center text-[#5a4f48]">
            <Logo />
          </Link>
          <ul className="flex items-center justify-end gap-6 md:gap-10">
            <li><button onClick={onSearch} className={linkCls}>Search</button></li>
            <li className="hidden sm:block"><Link to="/account" className={linkCls}>Account</Link></li>
            <li><button onClick={onBag} className={linkCls}>Bag ({bagCount})</button></li>
          </ul>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#f3f0ed] px-8 py-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <button onClick={() => setMenu(false)} className="self-end text-[10px] uppercase tracking-[0.16em]">Close</button>
            <ul className="mt-16 space-y-6">
              {[...NAV_LEFT, { label: "Our Philosophy", to: "/philosophy" }, { label: "Account", to: "/account" }].map((l, i) => (
                <motion.li key={l.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.07, duration: 0.8 }}>
                  <Link to={l.to} style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl text-[#2b2623]">{l.label}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
