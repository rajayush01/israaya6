import { CATEGORIES, CLOSER_LOOK, COLLECTIONS, IMAGES, PAGES, img } from "@/data/site";
import { sized, type Tier } from "./img";

// Held at module level so the browser keeps the decoded bitmaps around.
const held: HTMLImageElement[] = [];

function load(url: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    held.push(image);
    // decode() resolves once the bitmap is ready to paint, so first view has no decode hitch
    image.decode().then(() => resolve(), () => resolve());
  });
}

/** Resolves when the hero is decoded (or after a safety timeout). */
export function preloadCritical(timeoutMs = 6000): Promise<void> {
  return Promise.race([
    load(sized(IMAGES.hero, "hero")),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}

// [photo, tier] — tiers must match the components so the preloaded URL is identical (one download).
const list: [string, Tier][] = [
  ...CATEGORIES.map((c): [string, Tier] => [c.src, "card"]),
  [IMAGES.craft, "half"],
  [IMAGES.summerLeft, "card"],
  [IMAGES.summerRight, "card"],
  ...CLOSER_LOOK.map((s): [string, Tier] => [s, "thumb"]),
  ...COLLECTIONS.map((c): [string, Tier] => [c.src, "half"]),
  [img(7963), "half"],
  ...Object.values(PAGES).flatMap((p) => p.images.map((s): [string, Tier] => [s, "card"])),
];

/** Warms every other photo in the background, two at a time, so scrolling never waits on a download. */
export function preloadRest(concurrency = 2) {
  const queue = [...new Set(list.map(([url, tier]) => sized(url, tier)))];
  const worker = async () => {
    while (queue.length) {
      const next = queue.shift();
      if (next) await load(next);
    }
  };
  for (let i = 0; i < concurrency; i++) void worker();
}
