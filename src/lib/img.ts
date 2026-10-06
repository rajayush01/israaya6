/**
 * Photos live on R2 as full-size originals. Decoding a multi-megapixel image just to paint it in a
 * 500px slot is the main source of scroll jank, so every photo is requested at the width its slot
 * actually needs, re-encoded as WebP by wsrv.nl (a free image CDN). If the resizer is ever
 * unreachable, the <img> silently falls back to the original R2 URL.
 *
 * Once the files on R2 are pre-resized, set USE_IMAGE_RESIZER = false to load straight from R2.
 */
export const USE_IMAGE_RESIZER = true;

export const tiers = {
  hero: 1920, // full-bleed hero
  half: 1200, // half-width features
  card: 800, // grid cards, side-by-side pairs
  thumb: 600, // small strip thumbnails
} as const;
export type Tier = keyof typeof tiers;

export function sized(url: string, tier: Tier): string {
  if (!USE_IMAGE_RESIZER) return url;
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${tiers[tier]}&output=webp&q=78&we`;
}

// React 18 doesn't know the camelCase `fetchPriority` prop, so use the lowercase HTML attribute.
const highPriority = { fetchpriority: "high" } as Record<string, string>;

/** Spread onto an <img>: eager, async-decoded, right-sized, with automatic fallback to the original. */
export function imgProps(url: string, tier: Tier, priority = false) {
  return {
    src: sized(url, tier),
    loading: "eager" as const,
    decoding: "async" as const,
    ...(priority ? highPriority : {}),
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
      const el = e.currentTarget;
      if (el.dataset.fallback) return;
      el.dataset.fallback = "1";
      el.src = url;
    },
  };
}
