import type { ImageMetadata } from 'astro';
import { photos } from './photos';

/**
 * Verified field records.
 *
 * A record is only added once the photo and the description are confirmed as
 * RobustWorx work. Nothing here is stock imagery, and nothing is described as a
 * project, client or outcome unless that has been verified.
 *
 * The four records below use the photography supplied by RobustWorx
 * (src/assets/photos/). No location, client or date is attached to any of
 * them because none has been verified.
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
  /** CSS object-position that keeps the subject in frame on tight crops. */
  focus?: string;
  /** Only include if actually known. */
  location?: string;
  /** Only include if the client has agreed to be named. */
  client?: string;
}

export const workRecords: WorkRecord[] = [
  {
    title: 'Trench excavation with truck loading',
    summary:
      'Scott on site with the job paperwork while an excavator loads spoil straight into a tipper. Cones and crew in the frame — a supervised excavation running alongside other work.',
    service: 'site-supervision-field-support',
    serviceLabel: 'Site supervision & field support',
    image: 'scott-trench-site.jpg',
    imageAlt: photos.trenchSite.alt,
    focus: photos.trenchSite.focus,
  },
  {
    title: 'Stop/slow control on a sealed road',
    summary:
      'A RobustWorx traffic controller holding a stop/slow bat at a coned work area, with the road closed to one lane behind. Workzone support alongside live traffic.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    image: 'traffic-control-stop.jpg',
    imageAlt: photos.trafficControl.alt,
    focus: photos.trafficControl.focus,
  },
  {
    title: 'Excavator loading a RobustWorx tipper',
    summary:
      'A RobustWorx-branded excavator loading a RobustWorx tipper at the end of the day. Machine and truck supplied and operated together.',
    service: 'plant-operation',
    serviceLabel: 'Plant operation',
    image: 'excavator-sunset.jpg',
    imageAlt: photos.excavatorSunset.alt,
    focus: photos.excavatorSunset.focus,
  },
  {
    title: 'Workzone vehicle and message sign on a coastal road',
    summary:
      'The RobustWorx ute with a variable message sign and cones set out on a coastal road, with Scott on site. Roadside setup for a work area.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    image: 'scott-coastal-ute.jpg',
    imageAlt: photos.coastalUte.alt,
    focus: photos.coastalUte.focus,
  },
];

/** Images available to records, resolved at build time for optimisation. */
const imported = import.meta.glob<{ default: ImageMetadata }>(
  ['../assets/work/*.{jpg,jpeg,png,webp,avif}', '../assets/photos/*.{jpg,jpeg,png,webp,avif}'],
  { eager: true },
);

const byName = new Map<string, ImageMetadata>(
  Object.entries(imported).map(([path, mod]) => [path.split('/').pop()!, mod.default]),
);

export function recordImage(name?: string): ImageMetadata | undefined {
  return name ? byName.get(name) : undefined;
}
