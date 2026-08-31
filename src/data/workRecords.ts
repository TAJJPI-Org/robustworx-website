import type { ImageMetadata } from 'astro';

/**
 * Verified field records.
 *
 * A record is only added once the photo and the description are confirmed as
 * RobustWorx work. Nothing here is stock imagery, and nothing is described as a
 * project, client or outcome unless that has been verified.
 *
 * To add one (see README > Adding field records):
 *   1. Drop the photo in src/assets/work/
 *   2. Add an entry below with `image: 'your-file.jpg'`
 *
 * The Work page renders correctly with this list empty.
 */
export interface WorkRecord {
  title: string;
  /** Factual description of what the photo shows. No outcome claims. */
  summary: string;
  /** Service id from src/data/services.ts */
  service: string;
  serviceLabel: string;
  /** File name inside src/assets/work/ */
  image?: string;
  /** Describe the photo for screen readers. */
  imageAlt?: string;
  /** Only include if actually known. */
  location?: string;
  /** Only include if the client has agreed to be named. */
  client?: string;
}

export const workRecords: WorkRecord[] = [];

/** Images available to records, resolved at build time for optimisation. */
const imported = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/work/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const byName = new Map<string, ImageMetadata>(
  Object.entries(imported).map(([path, mod]) => [path.split('/').pop()!, mod.default]),
);

export function recordImage(name?: string): ImageMetadata | undefined {
  return name ? byName.get(name) : undefined;
}
