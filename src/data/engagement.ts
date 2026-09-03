/**
 * The two ways a client engages RobustWorx.
 *
 * This is the procurement decision a contractor actually makes — am I hiring
 * capability into my crew, or handing over a scope? Both routes are described
 * in the same terms so the choice is obvious before anyone picks up the phone.
 */
export interface EngagementMode {
  key: 'A' | 'B';
  title: string;
  /** One-line proposition. */
  pitch: string;
  /** Jobs this route suits. */
  suits: string[];
  /** The minimum needed to get an answer. */
  send: string;
  accent: 'lime' | 'orange';
}

export const engagement: EngagementMode[] = [
  {
    key: 'A',
    title: 'Add capability to your crew',
    pitch:
      'You are running the job. RobustWorx turns up with the machine, the vehicle, the gear or the operator you are short, for as long as you need it.',
    suits: [
      'A works package short a machine or an operator',
      'Workzone setup and pack-down alongside your crew',
      'An extra vehicle and another set of hands for the shift',
      'A site that needs someone practical on it for the duration',
    ],
    send: 'Send the dates, the site and what you are short.',
    accent: 'lime',
  },
  {
    key: 'B',
    title: 'Hand over the scope',
    pitch:
      'You describe the result. RobustWorx works out what the job needs, turns up with it and reports back when the work is done.',
    suits: [
      'Service trenching, small excavation and reinstatement',
      'Access tracks, pads and site preparation',
      'Vegetation control, maintenance and site clean-up',
      'Small civil works on regional sites and property',
    ],
    send: 'Send the location and what the finished result has to be.',
    accent: 'orange',
  },
];
