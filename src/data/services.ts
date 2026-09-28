export interface Service {
  id: string;
  no: string;
  title: string;
  /** One-line summary for cards and nav. */
  short: string;
  /** Opening paragraph on the services page. */
  summary: string;
  /** Where this support tends to be useful. */
  context: string[];
  /** Practical activities RobustWorx can pick up. */
  activities: string[];
  /** What a client should send so the job can be assessed. */
  send: string[];
  /** Honest scoping note. Never a capability claim. */
  note?: string;
  /** Icon key, see components/Glyph.astro */
  glyph: 'workzone' | 'site' | 'plant' | 'earth' | 'grounds';
}

export const services: Service[] = [
  {
    id: 'traffic-workzone-support',
    no: '01',
    title: 'Traffic & Workzone Support',
    short:
      'Practical support around road and workzone activity — setup, gear, vehicles and pack-down.',
    summary:
      'RobustWorx can assist with practical field requirements around road and workzone activity where extra plant, a vehicle, equipment or an additional set of hands is needed on the ground.',
    context: [
      'Road reserve and roadside work areas',
      'Short-duration works needing a workzone set up and packed down',
      'Jobs where a crew is short a vehicle or extra field support',
      'Sites with staged access or changing work areas across a shift',
    ],
    activities: [
      'Workzone mobilisation and site setup support',
      'Handling and positioning cones, signs and roadside equipment',
      'Support around detour and closure arrangements as directed by the responsible party',
      'Pack-down, retrieval and reinstatement of the work area',
      'Coordination and general support around live work environments',
    ],
    send: [
      'Job location and access point',
      'Date and start time',
      'Type of work the zone is supporting',
      'Site requirements and any client procedures to follow',
      'Equipment or vehicles required',
      'Expected duration',
      'Site contact on the day',
    ],
    note: 'RobustWorx provides field support around workzone activity. Confirm the traffic management responsibilities, plans and approvals for your job directly with Scott before engaging.',
    glyph: 'workzone',
  },
  {
    id: 'site-supervision-field-support',
    no: '02',
    title: 'Site Supervision & Field Support',
    short: 'Someone on the ground to run the day, hold the site interface and keep the job moving.',
    summary:
      'Where a project needs a practical presence on site — coordinating the day, holding the interface between parties and dealing with what comes up — RobustWorx can provide that on the ground.',
    context: [
      'Regional jobs where sending a supervisor from the city is not practical',
      'Short works packages that still need someone accountable on site',
      'Subcontractor packages needing a client-side or head-contractor-side presence',
      'Jobs with several parties needing day-to-day coordination',
    ],
    activities: [
      'Site presence for the duration of the work',
      'Day-to-day job coordination and sequencing on the ground',
      'Interface between site, subcontractors and the project team',
      'Practical problem-solving as conditions change',
      'Reporting back on what happened and what is still outstanding',
    ],
    send: [
      'Project and scope of the works package',
      'Location and site access arrangements',
      'Duration and shift pattern',
      'Who else is on site and who reports to whom',
      'Site inductions or procedures that apply',
      'What you need this role to cover',
    ],
    note: 'This is practical field supervision and coordination. It is not an engineering or statutory appointment — confirm exactly what the role needs to cover before engaging.',
    glyph: 'site',
  },
  {
    id: 'plant-operation',
    no: '03',
    title: 'Plant Operation',
    short:
      'Machinery operated on your site — compact plant, material handling and site preparation.',
    summary:
      'Machine work on your site, operated by RobustWorx. Useful when a project needs another machine for a period, or a machine without carrying an operator for it.',
    context: [
      'Works packages needing an extra machine for a period',
      'Jobs where plant is available but an operator is not',
      'Regional sites where mobilising plant from the city is expensive',
      'Access-constrained areas suited to compact plant',
    ],
    activities: [
      'Compact plant operation',
      'Excavation support',
      'Material handling and shifting around site',
      'Site preparation and levelling work',
      'Small civil works under an established scope',
    ],
    send: [
      'What the machine needs to do',
      'Site location and ground conditions',
      'Access constraints — width, gradient, overhead and underground services',
      'Whether plant is supplied by you or required from RobustWorx',
      'Attachments needed, if known',
      'Start date and expected duration',
    ],
    note: 'Availability of a specific machine or setup changes. Call Scott to confirm what can be put on your job before you plan around it.',
    glyph: 'plant',
  },
  {
    id: 'small-earthworks',
    no: '04',
    title: 'Small Earthworks',
    short: 'Trenching, small excavation, access preparation and reinstatement on regional sites.',
    summary:
      'Small-scale earthworks and site preparation — the size of work that is awkward for a large earthmoving crew but still has to be done properly.',
    context: [
      'Service trenching and small excavations',
      'Preparing access for other trades or plant',
      'Reinstatement after works are complete',
      'Minor civil and site works on rural and regional property',
    ],
    activities: [
      'Trenching',
      'Small excavation and batter work',
      'Site and pad preparation',
      'Access track formation and repair',
      'Backfill and reinstatement support',
    ],
    send: [
      'What is being excavated and roughly how much',
      'Location, with a pin or address',
      'Ground type if known — soil, clay, rock, fill',
      'Whether services have been located and marked',
      'Spoil — staying on site or leaving',
      'Timing and any date the work has to be finished by',
    ],
    note: 'Service location and any approvals for the excavation need to be arranged before work starts. Raise this when you send the job so it is covered off early.',
    glyph: 'earth',
  },
  {
    id: 'grounds-maintenance',
    no: '05',
    title: 'Grounds & Maintenance',
    short: 'Vegetation, upkeep and clean-up on sites, yards and regional property.',
    summary:
      'General upkeep on sites, yards, depots and regional property — vegetation control, maintenance work and clean-up that keeps a place workable.',
    context: [
      'Site and yard upkeep between works',
      'Vegetation control around infrastructure, fencelines and access tracks',
      'Clean-up after works are complete',
      'Regional properties needing periodic maintenance rather than a landscaping fit-out',
    ],
    activities: [
      'Vegetation and grounds work',
      'General site and property maintenance',
      'Clean-up and rubbish removal support',
      'Access track and fenceline clearing',
      'Practical upkeep tasks that need a machine or a vehicle',
    ],
    send: [
      'Property or site location',
      'Rough area involved',
      'What needs to be cut back, cleared or tidied',
      'Whether this is a one-off or periodic',
      'Access, gates and any stock or site conditions to know about',
      'Preferred timing',
    ],
    glyph: 'grounds',
  },
];

export const serviceOptions = services.map((s) => s.title);
