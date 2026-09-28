/**
 * Field situation briefs for the Work page.
 *
 * These describe the KINDS of field situation RobustWorx is set up for.
 * They are written in prospective language on purpose — they are not claims
 * about completed projects, clients or outcomes. Verified job records with
 * photos live in src/content/work/ and render above these on the Work page.
 */
export interface FieldSituation {
  no: string;
  title: string;
  /** Service id this maps to, for cross-linking. */
  service: string;
  serviceLabel: string;
  /** Factual description of the field context. */
  description: string;
  /** What the job actually involves on the ground. */
  onSite: string[];
}

export const fieldSituations: FieldSituation[] = [
  {
    no: '01',
    title: 'Roadside Workzone Setup & Pack-Down',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & Workzone Support',
    description:
      'Field activity involving roadside traffic equipment, signage and workzone setup alongside an active road environment, then retrieval of the gear once the work is finished.',
    onSite: [
      'Gear carried to the work area and positioned',
      'Work area adjusted as the job moves along the road reserve',
      'Support to the crew doing the works themselves',
      'Pack-down, retrieval and a clear road reserve at the end',
    ],
  },
  {
    no: '02',
    title: 'Support Alongside Live Road Works',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & Workzone Support',
    description:
      'On-site field work alongside an active road environment where a crew needs an additional vehicle, machine or operator to keep the works package moving.',
    onSite: [
      'Additional vehicle or plant on the work area for the shift',
      'Gear and materials shifted as the crew needs them',
      'Working to the site arrangements already in place',
      'Field support without adding a management layer to the job',
    ],
  },
  {
    no: '03',
    title: 'Service Trenching & Reinstatement',
    service: 'small-earthworks',
    serviceLabel: 'Small Earthworks',
    description:
      'Small excavation work for services, followed by backfill and reinstatement of the surface and surrounds once the service is in.',
    onSite: [
      'Trench excavated to the required line and depth',
      'Spoil managed on site or removed',
      'Backfill and compaction as specified',
      'Surface and surrounds reinstated',
    ],
  },
  {
    no: '04',
    title: 'Access Preparation for Following Trades',
    service: 'plant-operation',
    serviceLabel: 'Plant Operation',
    description:
      'Machine work that gets a site ready for the trades and plant coming in behind it — tracks formed, ground levelled and material shifted out of the way.',
    onSite: [
      'Access track formed or repaired',
      'Ground levelled and prepared',
      'Material moved and stockpiled',
      'Site left workable for the next crew in',
    ],
  },
  {
    no: '05',
    title: 'Regional Site & Property Upkeep',
    service: 'grounds-maintenance',
    serviceLabel: 'Grounds & Maintenance',
    description:
      'Vegetation control, general maintenance and clean-up on yards, depots, infrastructure surrounds and regional property, on a one-off or periodic basis.',
    onSite: [
      'Vegetation cut back around access, fencelines and infrastructure',
      'General maintenance tasks completed in the one visit',
      'Site cleaned up and rubbish handled',
      'Access left usable',
    ],
  },
  {
    no: '06',
    title: 'Day-to-Day Coordination on a Works Package',
    service: 'site-supervision-field-support',
    serviceLabel: 'Site Supervision & Field Support',
    description:
      'A practical presence on the ground for the duration of a works package — running the day, holding the interface between parties and handling what comes up.',
    onSite: [
      'On site for the shift, not managing it from a distance',
      'Sequencing and coordination between the parties on the ground',
      'Issues raised early rather than at the end of the week',
      'A clear account of what happened and what is outstanding',
    ],
  },
];
