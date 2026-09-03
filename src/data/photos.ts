import type { ImageMetadata } from 'astro';
import trenchSite from '../assets/photos/scott-trench-site.jpg';
import trafficControl from '../assets/photos/traffic-control-stop.jpg';
import excavatorSunset from '../assets/photos/excavator-sunset.jpg';
import coastalUte from '../assets/photos/scott-coastal-ute.jpg';

/**
 * Supplied RobustWorx photography.
 *
 * These four images were supplied by RobustWorx and show RobustWorx people,
 * plant and vehicles. Alt text and captions describe only what is visible in
 * the frame — no location, client, date or outcome is attached to any of them
 * because none has been verified. See CONTENT_VERIFICATION.md.
 */
export interface Photo {
  src: ImageMetadata;
  alt: string;
  /** Short, factual caption used where the photo is shown as a record. */
  caption: string;
  /** Service id from src/data/services.ts that the photo best illustrates. */
  service: string;
  serviceLabel: string;
  /** CSS object-position that keeps the subject in frame on tight crops. */
  focus: string;
}

export const photos = {
  trenchSite: {
    src: trenchSite,
    alt: 'Scott Mumford in RobustWorx hi-vis holding job paperwork on a trenching site, with an excavator loading spoil into a tipper truck and workers behind him.',
    caption: 'Scott on site with the job paperwork while an excavator loads spoil into a tipper.',
    service: 'site-supervision-field-support',
    serviceLabel: 'Site supervision & field support',
    focus: '40% 14%',
  },
  trafficControl: {
    src: trafficControl,
    alt: 'A traffic controller in a RobustWorx shirt and helmet holding a stop/slow bat beside cones on a sealed road.',
    caption: 'Stop/slow control at a coned work area on a sealed road.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    focus: '50% 30%',
  },
  excavatorSunset: {
    src: excavatorSunset,
    alt: 'A RobustWorx-branded excavator loading a RobustWorx tipper truck at sunset.',
    caption: 'RobustWorx excavator loading a RobustWorx tipper at the end of the day.',
    service: 'plant-operation',
    serviceLabel: 'Plant operation',
    focus: '50% 55%',
  },
  coastalUte: {
    src: coastalUte,
    alt: 'Scott Mumford standing with arms crossed on a coastal road beside a RobustWorx ute, a variable message sign and traffic cones.',
    caption:
      'Scott with the RobustWorx ute, a variable message sign and cones set out on a coastal road.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    focus: '62% 45%',
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
