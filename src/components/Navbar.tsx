import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, User, ShoppingBag } from "lucide-react";
import { NAV_LEFT } from "@/data/site";
import logo from "../assets/ISRAAYA LOGO.svg";

function Logo() {
  return (
    <img
      src={logo}
      alt="Israaya"
      className="h-24 w-24 -mt-3 md:h-28 md:w-28 md:-mt-3"
    />
  );
}

const linkCls =
  "relative text-[10px] font-medium uppercase tracking-[0.16em] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100";

export default function Navbar({
  onSearch,
  onBag,
  bagCount,
}: {
  onSearch: () => void;
  onBag: () => void;
  bagCount: number;
}) {
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
  className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
    solid
      ? "bg-[#f3f0ed]/85 backdrop-blur-md text-[#2b2623]"
      : "py-5 md:py-3 text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]"
  }`}
>
  {/* Top scrim for legibility over the hero */}
  <div
    aria-hidden
    className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-black/45 via-black/15 to-transparent transition-opacity duration-700 ${
      solid ? "opacity-0" : "opacity-100"
    }`}
  />
        <nav className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10">
          
          {/* Desktop Navigation */}
          <ul className="hidden gap-10 md:flex">
            {NAV_LEFT.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `${linkCls} ${
                      isActive ? "after:scale-x-100" : ""
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenu(true)}
            className="justify-self-start text-[10px] uppercase tracking-[0.16em] md:hidden"
          >
            Menu
          </button>

          {/* Logo */}
          <Link
            to="/"
            aria-label="Israaya"
            className="justify-self-center text-[#5a4f48]"
          >
            <Logo />
          </Link>

          {/* Icons */}
          <ul className="flex items-center justify-end gap-4 md:gap-6">
            
            {/* Search */}
            <li>
              <button
                onClick={onSearch}
                aria-label="Search"
                className="group relative flex h-8 w-8 items-center justify-center"
              >
                <Search
                  size={18}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </button>
            </li>

            {/* Account */}
            <li className="hidden sm:block">
              <Link
                to="/account"
                aria-label="Account"
                className="group flex h-8 w-8 items-center justify-center"
              >
                <User
                  size={18}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
            </li>

            {/* Bag */}
            <li>
              <button
                onClick={onBag}
                aria-label={`Shopping bag (${bagCount} items)`}
                className="group relative flex h-8 w-8 items-center justify-center"
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                {bagCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2b2623] px-1 text-[8px] font-medium text-white">
                    {bagCount}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#f3f0ed] px-8 py-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <button
              onClick={() => setMenu(false)}
              className="self-end text-[10px] uppercase tracking-[0.16em]"
            >
              Close
            </button>

            <ul className="mt-16 space-y-6">
              {[
                ...NAV_LEFT,
                { label: "Our Philosophy", to: "/philosophy" },
                { label: "Account", to: "/account" },
              ].map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.35 + i * 0.07,
                    duration: 0.8,
                  }}
                >
                  <Link
                    to={l.to}
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                    className="text-4xl text-[#2b2623]"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}