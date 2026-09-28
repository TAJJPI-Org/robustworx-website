/**
 * Central site facts and copy constants.
 *
 * Only VERIFIED information belongs in this file. Anything unconfirmed is
 * tracked in CONTENT_VERIFICATION.md and must not appear as fact on the site.
 */

export const site = {
  name: 'RobustWorx',
  legalName: 'RobustWorx',
  contactName: 'Scott Mumford',
  /** Verified. Displayed exactly as supplied. */
  phoneDisplay: '0458 958 995',
  /** E.164 for tel: / sms: links (Australian mobile). */
  phoneLink: '+61458958995',
  /** Broad location. No street address is published — not verified. */
  region: 'Regional South Australia',
  tagline: 'Field support, plant and civil work across regional South Australia.',
  description:
    'RobustWorx supports civil, traffic, plant and maintenance work in regional South Australia. Send the job details or call Scott directly.',
} as const;

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Work', href: '/work' },
  { label: 'Capability', href: '/capability' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const legalNav = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
] as const;

/** Pre-filled SMS body used by the "text the job" actions. */
export function smsHref(body: string): string {
  // `?&body=` is the form that works on both iOS and Android.
  return `sms:${site.phoneLink}?&body=${encodeURIComponent(body)}`;
}

export function telHref(): string {
  return `tel:${site.phoneLink}`;
}

export const defaultSmsBody = `Hi Scott, I'm enquiring about a RobustWorx job.

Name:
Business:
Location:
Work required:
Timing:
Details:`;
