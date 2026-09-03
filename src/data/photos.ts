import type { ImageMetadata } from 'astro';
import trenchSite from '../assets/photos/scott-trench-site.jpg';
import trafficControl from '../assets/photos/traffic-control-stop.jpg';
import excavatorSunset from '../assets/photos/excavator-sunset.jpg';
import coastalUte from '../assets/photos/scott-coastal-ute.jpg';
import cropExcavator from '../assets/photos/crops/crop-excavator.jpg';
import cropTipper from '../assets/photos/crops/crop-tipper.jpg';
import cropUte from '../assets/photos/crops/crop-ute.jpg';
import cropVms from '../assets/photos/crops/crop-vms.jpg';
import cropConesRoad from '../assets/photos/crops/crop-cones-road.jpg';
import cropStopBat from '../assets/photos/crops/crop-stop-bat.jpg';
import cropCones from '../assets/photos/crops/crop-cones.jpg';
import cropClipboard from '../assets/photos/crops/crop-clipboard.jpg';
import cropTrench from '../assets/photos/crops/crop-trench.jpg';
import cropCrew from '../assets/photos/crops/crop-crew.jpg';
import cropRoadworks from '../assets/photos/crops/crop-roadworks.jpg';
import cropRoadworksSigns from '../assets/photos/crops/crop-roadworks-signs.jpg';
import roadPlan from '../assets/photos/crops/road-plan.png';

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

/**
 * Equipment and detail crops cut from the four supplied photos
 * (src/assets/photos/crops/, generated with sharp — see README). They give
 * every tile a real RobustWorx image without any stock or generated imagery.
 */
export const crops = {
  excavator: {
    src: cropExcavator,
    alt: 'RobustWorx-branded excavator with its boom raised at sunset.',
    caption: 'RobustWorx excavator.',
    service: 'plant-operation',
    serviceLabel: 'Plant operation',
    focus: '50% 50%',
  },
  tipper: {
    src: cropTipper,
    alt: 'A RobustWorx tipper truck being loaded with spoil by an excavator bucket.',
    caption: 'RobustWorx tipper being loaded.',
    service: 'plant-operation',
    serviceLabel: 'Plant operation',
    focus: '50% 50%',
  },
  ute: {
    src: cropUte,
    alt: 'RobustWorx tray-back ute parked on a coastal road.',
    caption: 'RobustWorx ute.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    focus: '50% 50%',
  },
  vms: {
    src: cropVms,
    alt: 'A trailer-mounted variable message sign beside the RobustWorx ute, with Scott in the foreground.',
    caption: 'Variable message sign and ute.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    focus: '50% 50%',
  },
  conesRoad: {
    src: cropConesRoad,
    alt: 'Traffic cones set out on a coastal road with the sea behind.',
    caption: 'Cones set out on a coastal road.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    focus: '50% 50%',
  },
  stopBat: {
    src: cropStopBat,
    alt: 'A traffic controller in a RobustWorx helmet holding a stop bat on a sealed road.',
    caption: 'Stop bat at a coned work area.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    focus: '50% 50%',
  },
  cones: {
    src: cropCones,
    alt: 'A traffic cone and stop/slow bat pole on a sealed road.',
    caption: 'Cone and bat pole on the road.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    focus: '50% 50%',
  },
  clipboard: {
    src: cropClipboard,
    alt: 'Scott holding a clipboard and pen on site in RobustWorx hi-vis.',
    caption: 'Job paperwork on site.',
    service: 'site-supervision-field-support',
    serviceLabel: 'Site supervision & field support',
    focus: '50% 50%',
  },
  trench: {
    src: cropTrench,
    alt: 'An open service trench with an excavator and tipper truck working behind it.',
    caption: 'Open service trench.',
    service: 'small-earthworks',
    serviceLabel: 'Small earthworks',
    focus: '50% 50%',
  },
  roadworks: {
    src: cropRoadworks,
    alt: 'A coned lane closure on a sealed road with a SLOW sign, a stop/slow bat and queued traffic.',
    caption: 'Coned lane closure with signs and queued traffic.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    focus: '50% 50%',
  },
  roadworksSigns: {
    src: cropRoadworksSigns,
    alt: 'STOP and SLOW signs, cones and a stop/slow bat at a road works setup with traffic approaching.',
    caption: 'Road works setup with cones, signs and stop/slow bat.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    focus: '50% 40%',
  },
  roadPlan: {
    src: roadPlan,
    alt: 'Plan-view drawing of a typical road works layout on a two-lane road: advance warning signs, 40 speed sign, prepare-to-stop sign, traffic controller, cone taper, buffer, coned work area with plant, end-of-works sign and message sign. Illustrative only.',
    caption:
      'Typical road works layout, plan view. Illustrative only, not a traffic guidance scheme.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & workzone support',
    focus: '50% 50%',
  },
  crew: {
    src: cropCrew,
    alt: 'A worker in hi-vis standing in a trench in front of an excavator.',
    caption: 'Crew working in the trench.',
    service: 'site-supervision-field-support',
    serviceLabel: 'Site supervision & field support',
    focus: '50% 50%',
  },
} as const satisfies Record<string, Photo>;

export type CropKey = keyof typeof crops;
