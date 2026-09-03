# RobustWorx website

Production website for **RobustWorx** — field support, plant and civil work in
regional South Australia. Contact: Scott Mumford, 0458 958 995.

---

## Stack

|            |                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------- |
| Framework  | [Astro 5](https://astro.build) — static output, zero client framework                     |
| Language   | TypeScript (strict)                                                                       |
| Styling    | Plain CSS. Design tokens in `src/styles/global.css`, everything else scoped per component |
| Fonts      | Barlow + Barlow Condensed, self-hosted via `@fontsource` (latin subset only)              |
| Images     | Astro's built-in `<Image>` — WebP, responsive `srcset`, lazy below the fold               |
| JS shipped | ~2 KB inline, hand-written: mobile nav toggle and the job intake form. No libraries.      |

Nothing is fetched from a third-party CDN at runtime, so no external request is
made when someone loads the site.

---

## Running it

```bash
npm install       # Node 18.20+ / 20.3+ / 22+
npm run dev       # http://localhost:4321
```

| Command           | Does                                                |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                          |
| `npm run build`   | Production build into `dist/`                       |
| `npm run preview` | Serve the built `dist/` locally                     |
| `npm run check`   | `astro check` — TypeScript and template diagnostics |
| `npm run lint`    | Prettier check                                      |
| `npm run format`  | Prettier write                                      |

`npm run build` and `npm run check` must both pass clean before deploying.

---

## Deployment

The site builds to static files in `dist/`. It runs on any static host.

### Vercel

`vercel.json` pins the framework, build command and output directory, so the
project deploys correctly even if the Vercel import used the "Other" preset:

```json
{ "framework": "astro", "buildCommand": "npm run build", "outputDirectory": "dist" }
```

Import the repository at [vercel.com/new](https://vercel.com/new) and deploy —
no further configuration needed. Pushes to the default branch go to production;
pull requests get their own preview URL.

### Any other host

```bash
npm ci && npm run build   # then serve dist/
```

### Setting the production domain

Canonical URLs, OpenGraph tags and `sitemap-index.xml` are all built from one
value. It defaults to `https://robustworx.com.au`. If the real domain differs,
set `SITE_URL` as a build-time environment variable:

```
SITE_URL=https://www.robustworx.com.au
```

Then update the `Sitemap:` line in `public/robots.txt` to match — that one is
a static file and is not templated.

---

## Contact form behaviour

**The form does not email from the website, and it does not pretend to.** There
is no verified RobustWorx email address or mail backend, so instead of a fake
success message the form builds a structured job summary and hands it off
through channels that are verified to work:

1. **Text the job to Scott** — submitting opens the visitor's messaging app with
   an `sms:` link, pre-filled with everything they entered. They send it.
2. **Copy job summary** — writes the same summary to the clipboard, for desktop
   visitors who would rather paste it into an email.
3. **Call Scott** — `tel:` links on every page, and the phone number is the most
   prominent element on the contact page.

Validation runs client-side on name, phone, job location and description, with
`aria-invalid`, per-field messages, a focusable error summary and a live status
region. Nothing is stored or transmitted by the site itself.

### Connecting a real backend later

The form already supports one. Set a build-time environment variable:

```
PUBLIC_FORM_ENDPOINT=https://your-endpoint.example/submit
```

When it is set, the submit button posts the form as JSON to that endpoint and
reports the real outcome — success clears the form, failure tells the visitor to
call instead. When it is unset (the default), the SMS path above is used. The
"Copy job summary" button works either way.

Any endpoint that accepts a JSON `POST` works — a Vercel Function, Formspree,
Basin, or similar. **Update `src/pages/privacy.astro` when you connect one**:
the privacy page currently states that the site stores nothing, which would no
longer be true.

---

## Where things live

### Copy and content

Site copy is data, not markup. Editing these files changes the site everywhere
they are used — no component surgery needed.

| File                      | Contains                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `src/data/site.ts`        | Business name, contact name, phone (display + `tel:`/`sms:` form), region, meta description, nav structure |
| `src/data/services.ts`    | The five service areas — summary, where each is useful, what it covers, what to send, scoping notes        |
| `src/data/equipment.ts`   | Fleet categories — description, what it is used for, what to confirm with Scott                            |
| `src/data/field.ts`       | Field situation briefs shown on the Work page                                                              |
| `src/data/workRecords.ts` | Field records shown on the Work page — the four supplied photos, described factually                       |
| `src/data/photos.ts`      | The supplied RobustWorx photography: source file, alt text, caption and crop focus for each image          |

Page-specific copy that only appears once — the About narrative, the Capability
sections, Privacy and Terms — lives in the page file itself under `src/pages/`.

**Changing the phone number:** edit `phoneDisplay` and `phoneLink` in
`src/data/site.ts`. Both the displayed number and every `tel:`/`sms:` link
across the site follow from there.

### Pages

| Route                | File                                               |
| -------------------- | -------------------------------------------------- |
| `/`                  | `src/pages/index.astro`                            |
| `/services`          | `src/pages/services.astro`                         |
| `/fleet`             | `src/pages/fleet.astro`                            |
| `/work`              | `src/pages/work.astro`                             |
| `/capability`        | `src/pages/capability.astro`                       |
| `/about`             | `src/pages/about.astro`                            |
| `/contact`           | `src/pages/contact.astro`                          |
| `/privacy`, `/terms` | `src/pages/privacy.astro`, `src/pages/terms.astro` |
| 404                  | `src/pages/404.astro`                              |

### Components

`src/components/` — `Header`, `Footer`, `Logo`, `Hero`, `PageIntro`,
`SectionHeader`, `CtaBand`, `ServiceCard`, `ContactForm`, `Glyph` (service
icons), `Silhouette` (equipment illustrations).

`src/layouts/BaseLayout.astro` handles `<head>`: title, meta description,
canonical, OpenGraph, Twitter card, favicon and the `ProfessionalService`
schema.org block.

### Design system

`src/styles/global.css` holds every design token — colour, type scale, spacing,
container widths, breakpoints, button variants, focus states — plus the shared
field motifs (hazard striping, road centre line, survey linework, the angular
corner cut). Change a token there and it propagates.

---

## Images

### The logo

**The authoritative RobustWorx logo was not supplied with this build.** Until it
is, `src/components/Logo.astro` renders a neutral typographic wordmark as a
stand-in. It is not a redrawing of the RobustWorx mark.

To install the real logo, drop the file at one of these paths:

```
public/brand/robustworx-logo.svg      (preferred)
public/brand/robustworx-logo.png
public/brand/robustworx-logo.webp
```

It is picked up automatically in the header, footer and everywhere else — no
code change. The logo renders at a fixed height with automatic width, so the
layout does not shift whatever the aspect ratio.

Also replace `public/favicon.svg`, `public/apple-touch-icon.png` (180×180) and
`public/og-robustworx.jpg` (1200×630) with brand-correct versions at that point.

### Photography

Four photographs supplied by RobustWorx live in `src/assets/photos/` and are
registered in `src/data/photos.ts` with alt text, a factual caption and a crop
focus point. Every use goes through `src/components/Photo.astro` (fixed-ratio
cover crop, responsive WebP `srcset`, optional tag and caption), or through the
`photo` prop on `PageIntro` and `CtaBand` for backdrops. Where they appear:

| Photo                      | Used on                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| `scott-trench-site.jpg`    | Home hero; Services 02 banner; Fleet and About intros; Work record 01   |
| `traffic-control-stop.jpg` | Home mosaic; Fleet 03; Capability intro; Services CTA; Work record 02   |
| `excavator-sunset.jpg`     | Home mosaic; Services 03 banner; Fleet 01; Contact hero; Work record 03 |
| `scott-coastal-ute.jpg`    | Home mosaic; Services 01 banner; Fleet 02; About owner card; Work 04    |

Ten equipment and detail crops cut from those four photos live in
`src/assets/photos/crops/` and are registered as `crops` in the same file
(excavator, tipper, ute, message sign, cones, stop bat, clipboard, trench,
crew). They give every tile a real RobustWorx image: the home service cards and
equipment tiles, the two fleet categories the full photos do not cover, the six
field situations on the Work page, and the regional panels on Home and About.
No tile on the site ships without a photograph, and nothing is stock or
generated. The crops were cut with sharp from the originals; re-cut them from
`src/assets/photos/` if a source photo is replaced.

Every section on the site also carries a low-opacity photo backdrop through
`src/components/Backdrop.astro` (the parent gets the global `has-bg` class).
Opacity is capped at 0.2 and a directional shade sits over the image so body
copy on top still clears WCAG AA; the QA pass checks this against rendered
pixels rather than declared colours. Photos rotate between neighbouring
sections so the same image is not behind two adjacent blocks.

To swap or add a photo: drop the original file in `src/assets/photos/`, add an
entry to `photos.ts` (keep the alt text and caption to what is visible in the
frame), and reference it from the page. Astro generates the compressed variants
at build time — do not pre-shrink anything.

### Adding field photos to the Work page

1. Drop the photo into `src/assets/work/`. Use the original camera file —
   Astro generates compressed, responsive WebP variants at build time. Do not
   pre-shrink or upscale anything.
2. Add an entry to the `workRecords` array in `src/data/workRecords.ts`:

```ts
export const workRecords: WorkRecord[] = [
  {
    title: 'Roadside workzone setup',
    summary:
      'Field activity involving roadside traffic equipment and signage alongside an active road environment.',
    service: 'traffic-workzone-support',
    serviceLabel: 'Traffic & Workzone Support',
    image: 'roadside-setup.jpg', // file name inside src/assets/work/
    imageAlt: 'Cones and signage positioned along a rural road shoulder.',
    location: 'Mid North SA', // only if actually known
    // client: 'Named client',        // only with their agreement
  },
];
```

Records render at the top of `/work`, above the field situation briefs, with the
first record shown as a full-width feature. The page renders correctly with the
array empty. It ships with four records drawn from the supplied photography;
none carries a location, client or date because none has been confirmed.

**Rules for what goes on this page:** genuine RobustWorx photos only — no stock
imagery. Describe what the photo shows. Do not name a client or claim an outcome
unless it is confirmed. See `CONTENT_VERIFICATION.md`.

---

## Facts that still need client verification

`CONTENT_VERIFICATION.md` is the register. In short, none of the following
appears anywhere on the site and none should be added without confirming it
with Scott first:

- ABN, street address, email address, trading hours
- Insurance, licences, traffic management accreditation, tickets, memberships
- Years in business, staff numbers, project counts or values
- Machine makes, models, capacities, attachments and ratings
- Service radius, response times, safety statistics
- Client names, logos, testimonials, reviews, awards

Two items need action before launch:

1. **Supply the logo** (see above).
2. **Confirm the production domain** and set `SITE_URL` plus `robots.txt` if it
   is not `robustworx.com.au`.

---

## Accessibility and performance notes

Built to WCAG 2.2 AA: one `<h1>` per page with no heading-level jumps, semantic
landmarks, a skip link, visible 3px focus rings on every interactive element,
labelled form fields with accessible error states, `prefers-reduced-motion`
honoured, and text contrast checked against its real background at every size.

Performance comes from what is not there: no framework runtime, no icon library,
no animation library, no analytics, no external requests. Total built output is
under 700 KB including all five self-hosted font files, and CSS is inlined per
page. Motion is limited to a single scroll-linked fade that degrades to nothing
where it is unsupported or unwanted.
