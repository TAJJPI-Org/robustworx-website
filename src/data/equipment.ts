export interface EquipmentCategory {
  id: string;
  no: string;
  title: string;
  /** Plain-language description of the category. No model numbers or specs. */
  blurb: string;
  /** What this category is used for in the field. */
  useFor: string[];
  /** Things worth confirming with Scott before planning around it. */
  confirm: string[];
  glyph: 'excavator' | 'ute' | 'signage' | 'trailer' | 'tools';
}

/**
 * Equipment is described by category and field use only.
 * Makes, models, capacities, weights, attachments and ratings are deliberately
 * NOT published — see CONTENT_VERIFICATION.md. Confirm specifics by phone.
 */
export const equipment: EquipmentCategory[] = [
  {
    id: 'compact-excavation',
    no: '01',
    title: 'Compact Excavation Plant',
    blurb:
      'Machinery suited to trenching, small excavation and site preparation where a large machine is more than the job needs, or cannot physically get in.',
    useFor: [
      'Service trenching and small excavations',
      'Pad, access and level preparation',
      'Backfill and reinstatement',
      'Work in constrained or established areas',
    ],
    confirm: [
      'Machine size available for your dates',
      'Attachments suited to your ground conditions',
      'Whether the machine is floated in or you supply plant on site',
    ],
    glyph: 'excavator',
  },
  {
    id: 'workzone-vehicles',
    no: '02',
    title: 'Workzone Support Vehicles',
    blurb:
      'Vehicles set up for getting to regional sites, carrying gear and working off the back of a ute in a roadside environment.',
    useFor: [
      'Getting equipment and people to regional work areas',
      'Carrying gear for setup and pack-down',
      'Support and running around during a shift',
      'Sites with distance between the work area and the compound',
    ],
    confirm: [
      'Vehicle setup and what it can carry for your job',
      'Site-specific vehicle requirements you need met',
      'Travel to your location',
    ],
    glyph: 'ute',
  },
  {
    id: 'traffic-roadside-equipment',
    no: '03',
    title: 'Traffic & Roadside Equipment',
    blurb:
      'Cones, signage and roadside gear handled as part of workzone setup, adjustment through the shift and pack-down at the end of it.',
    useFor: [
      'Setting up and packing down a work area',
      'Moving and repositioning gear as the work area changes',
      'Retrieving equipment at the end of a job',
      'Supporting arrangements put in place by the responsible party',
    ],
    confirm: [
      'What gear is required for your site and who supplies it',
      'The traffic management responsibilities and approvals for your job',
      'Timing of setup and pack-down',
    ],
    glyph: 'signage',
  },
  {
    id: 'transport-site-support',
    no: '04',
    title: 'Transport & Site Support Gear',
    blurb:
      'Trailers and support equipment for shifting gear, materials and machinery around a site or between sites.',
    useFor: [
      'Moving equipment and materials on and off site',
      'Shifting gear between work areas',
      'Supporting a crew already on the ground',
      'Regional jobs where a return trip is expensive',
    ],
    confirm: [
      'What needs to be moved, and its size and weight',
      'Pick-up and drop-off points',
      'Whether the movement is on-site or on-road',
    ],
    glyph: 'trailer',
  },
  {
    id: 'field-tools',
    no: '05',
    title: 'Field Tools & Support Gear',
    blurb:
      'The general field kit that makes a job workable — hand and powered tools, vegetation and maintenance gear, and the equipment carried to site as standard.',
    useFor: [
      'Maintenance and clean-up work',
      'Vegetation and grounds tasks',
      'Small tasks that come up alongside the main scope',
      'Working on sites without an established compound',
    ],
    confirm: [
      'Whether a specific tool or setup is needed on the day',
      'Site power, water and consumables',
      'Anything you need brought that is outside the standard kit',
    ],
    glyph: 'tools',
  },
];
