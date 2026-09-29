import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { NAV_LEFT } from "@/data/site";

const ease = [0.76, 0, 0.24, 1] as const;

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) setTimeout(() => ref.current?.focus(), 500);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] bg-[#f3f0ed] px-6 py-8 md:px-16"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease }}
        >
          <button onClick={onClose} className="ml-auto block text-[10px] uppercase tracking-[0.16em]">Close</button>
          <div className="mx-auto mt-[12vh] max-w-[720px]">
            <input
              ref={ref}
              placeholder="Search Israaya"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="w-full border-b border-[#2b2623]/40 bg-transparent pb-4 text-4xl outline-none placeholder:text-[#b3a89f] md:text-5xl"
            />
            <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.18em]">Popular</p>
            <ul className="mt-5 space-y-3">
              {[...NAV_LEFT, { label: "Our Philosophy", to: "/philosophy" }].map((l, i) => (
                <motion.li key={l.to} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.06 }}>
                  <Link onClick={onClose} to={l.to} className="text-[13px] text-[#5a4f48] hover:text-[#2b2623]">{l.label}</Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function BagDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[70] bg-[#2b2623]/30 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            className="fixed right-0 top-0 z-[71] flex h-full w-full max-w-[420px] flex-col bg-[#f3f0ed] p-8"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">Your Bag (0)</span>
              <button onClick={onClose} className="text-[10px] uppercase tracking-[0.16em]">Close</button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl">Your bag is empty</p>
              <Link onClick={onClose} to="/new-in" className="mt-6 border-b border-[#2b2623] pb-1 text-[10px] uppercase tracking-[0.18em]">Explore New In →</Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
