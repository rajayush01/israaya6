import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { BagDrawer, SearchOverlay } from "@/components/Overlays";
import { AccountPage, CollectionsPage, PhilosophyPage, ShopPage } from "@/components/Pages";
import { Categories, CloserLook, Craft, Hero, Promises, SummerEdit } from "@/components/Sections";
import logo from "./assets/ISRAAYA LOGO.svg";
import logo1 from "./assets/ISRAAYA MOTIF.svg";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Craft />
      <SummerEdit />
      <Promises />
      <CloserLook />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [bag, setBag] = useState(false);
  const lenis = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const l = new Lenis({ duration: 1.3, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.current = l;
    let raf = 0;
    const loop = (t: number) => { l.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); l.destroy(); };
  }, []);

  useEffect(() => { lenis.current?.scrollTo(0, { immediate: true }); window.scrollTo(0, 0); }, [location.pathname]);
  useEffect(() => { (search || bag ? lenis.current?.stop() : lenis.current?.start()); }, [search, bag]);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1400); return () => clearTimeout(t); }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div key="loader" className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f3f0ed]" exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}>
            <motion.span className="flex flex-col justify-center items-center tracking-[0.5em] text-[#2b2623]" initial={{ opacity: 0, letterSpacing: "0.9em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 1.2 }}>
              <img src={logo1} alt="Israaya Motif" className="h-20"/>
              <img src={logo} alt="Israaya" className="h-20"/>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar onSearch={() => setSearch(true)} onBag={() => setBag(true)} bagCount={0} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
      <BagDrawer open={bag} onClose={() => setBag(false)} />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/philosophy" element={<PhilosophyPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/:slug" element={<ShopPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
