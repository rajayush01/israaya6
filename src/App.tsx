import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { BagDrawer, SearchOverlay } from "@/components/Overlays";
import { AccountPage, CollectionsPage, PhilosophyPage, ShopPage } from "@/components/Pages";
import { Categories, CloserLook, Craft, Hero, Promises, SummerEdit } from "@/components/Sections";
import useSmoothScroll from "@/hooks/useSmoothScroll";
import { preloadCritical, preloadRest } from "@/lib/preload";
import logo from "./assets/ISRAAYA LOGO.svg";
import motif from "./assets/israaya-motif.webp";

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
  const lenis = useSmoothScroll();
  const location = useLocation();

  // Loader lifts once (a) 1.4s have passed and (b) the hero photo is decoded — so the first screen never
  // pops in. Then every other photo warms up quietly in the background.
  useEffect(() => {
    const minTime = new Promise<void>((resolve) => setTimeout(resolve, 1400));
    Promise.all([minTime, preloadCritical()]).then(() => {
      setLoading(false);
      preloadRest();
    });
  }, []);

  useEffect(() => {
    const locked = search || bag;
    if (locked) lenis.current?.stop();
    else lenis.current?.start();
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, [search, bag, lenis]);

  const toTop = () => {
    lenis.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <m.div
            key="loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f3f0ed]"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <m.span
              className="flex flex-col justify-center items-center tracking-[0.5em] text-[#2b2623]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <img src={motif} alt="Israaya Motif" className="h-20" />
              <img src={logo} alt="Israaya" className="h-20" />
            </m.span>
          </m.div>
        )}
      </AnimatePresence>

      <Navbar onSearch={() => setSearch(true)} onBag={() => setBag(true)} bagCount={0} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
      <BagDrawer open={bag} onClose={() => setBag(false)} />

      {/* Opacity-only page transition: fading is cheap, translating a whole page forces a huge repaint.
          Scroll resets only after the old page has gone, so there is no visible jump. */}
      <AnimatePresence mode="wait" onExitComplete={toTop}>
        <m.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/philosophy" element={<PhilosophyPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/:slug" element={<ShopPage />} />
          </Routes>
        </m.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
