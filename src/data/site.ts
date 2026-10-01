const BASE = "https://pub-5910ba650a5b4f4ba76486d5a3630c49.r2.dev/Israyaawebp";
export const img = (n: number) => `${BASE}/IMG_${n}.webp`;

// Swap any number below (7963–7999, 8001–8007) to re-map a slot.
export const IMAGES = {
  hero: img(7963),
  craft: img(7969),
  summerLeft: img(7970),
  summerRight: img(7971),
};

export const NAV_LEFT = [
  { label: "New In", to: "/new-in" },
  { label: "Ready to Wear", to: "/ready-to-wear" },
  { label: "Occasions", to: "/occasions" },
  { label: "Collections", to: "/collections" },
];

const POOL = [...Array(37)].map((_, i) => 7963 + i).concat([8001, 8002, 8003, 8004, 8005, 8006, 8007]);
const take = (start: number, n: number) => Array.from({ length: n }, (_, i) => img(POOL[(start + i) % POOL.length]));

export const PAGES: Record<string, { title: string; eyebrow: string; blurb: string; images: string[] }> = {
  "new-in": { title: "New In", eyebrow: "Just Arrived", blurb: "The latest silhouettes, softly embroidered and made to be lived in.", images: take(0, 12) },
  "ready-to-wear": { title: "Ready to Wear", eyebrow: "Effortless Everyday", blurb: "Thoughtfully crafted pieces in natural fabrics, ready when you are.", images: take(8, 12) },
  occasions: { title: "Occasions", eyebrow: "For Moments That Matter", blurb: "Refined details and heirloom finishing for every celebration.", images: take(16, 12) },
};

export const COLLECTIONS = [
  { name: "The Summer Edit", line: "Light. Effortless. Refined.", src: img(7970), to: "/new-in" },
  { name: "Classics", line: "Timeless pieces, rich in detail.", src: img(7966), to: "/ready-to-wear" },
  { name: "Occasions", line: "Subtle, elegant and forever relevant.", src: img(7967), to: "/occasions" },
];

export const FOOTER = {
  shop: NAV_LEFT,
  house: [{ label: "Our Philosophy", to: "/philosophy" }, { label: "Account", to: "/account" }],
  care: ["Worldwide Shipping", "Easy Returns \u2014 within 7 days", "Natural Fabric Care"],
  instagram: "https://www.instagram.com/israayaindiaofficial",
};

export const CATEGORIES = [
  { label: "New In", src: img(7964), to: "/new-in" },
  { label: "Ready to Wear", src: img(7965), to: "/ready-to-wear" },
  { label: "Classics", src: img(7966), to: "/collections" },
  { label: "Occasions", src: img(7967), to: "/occasions" },
  { label: "Best Sellers", src: img(7968), to: "/new-in" },
];

export const CLOSER_LOOK = [7972, 7973, 7974, 7975, 7976, 7977, 7978, 7979].map(img);

export const PROMISES = [
  { icon: "leaf", title: "Natural Fabrics", text: "Premium fabrics, consciously sourced" },
  { icon: "care", title: "Crafted With Care", text: "Timeless pieces, rich in detail" },
  { icon: "box", title: "Worldwide Shipping", text: "Delivering to you, wherever you are" },
  { icon: "return", title: "Easy Returns", text: "Hassle-free returns within 7 days" },
] as const;
