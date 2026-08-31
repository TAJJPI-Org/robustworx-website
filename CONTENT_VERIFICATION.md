# Content verification register — RobustWorx website

This register records what on the RobustWorx website is confirmed, and what is
not. Nothing in the **VERIFY BEFORE CLAIMING** list appears on the public site
as fact.

Keep this file current. Every time a claim is added to the site, it goes in the
verified list here first.

---

## [VERIFIED] — published on the site

| Item               | Value                                                                                                                  | Where it appears                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Business name      | RobustWorx                                                                                                             | Everywhere                                 |
| Primary contact    | Scott Mumford                                                                                                          | Header, footer, About, Contact, Capability |
| Phone              | 0458 958 995                                                                                                           | Every page (`tel:` and `sms:` links)       |
| Location           | Regional South Australia (broad region only)                                                                           | Footer, About, Capability                  |
| Service categories | Traffic & workzone support; site supervision & field support; plant operation; small earthworks; grounds & maintenance | Services, Home, Fleet, Capability          |

Source: the project brief. If any of the above is wrong, correct it in
`src/data/site.ts` — it is defined once and used everywhere.

---

## [VERIFY BEFORE CLAIMING] — deliberately absent from the site

None of the following is stated anywhere on the site. Confirm each with Scott
before it is added.

### Business and legal

- ABN / registered entity name
- Street address or depot location
- Email address
- Trading hours
- Years in operation, business history, founding date
- Number of staff or operators

### Compliance

- Insurance (public liability, plant, workers compensation)
- Licences and registrations
- Traffic management accreditation or ticketing
- White card, machine tickets, competency cards
- Industry memberships and association affiliations
- Prequalification status with any contractor or authority

### Capability and coverage

- Service radius or named service area beyond "regional South Australia"
- Response times and availability commitments
- Machine makes, models, capacities, weights, attachments, ratings
- Vehicle specifications and towing capacity
- Whether RobustWorx holds or supplies traffic management plans
- Safety record or statistics

### Commercial

- Client names and logos
- Project values, dates and volumes
- Testimonials, reviews and ratings
- Awards
- Tier 1 contractor or government contract relationships
- Rates and pricing

---

## Deliberate design decisions that follow from the above

1. **No photography.** No RobustWorx photos were supplied with this build, so
   the site uses drawn technical illustrations and typographic composition
   instead. There is no stock photography and no AI-generated imagery presented
   as RobustWorx work. Real photos drop in via `src/assets/work/` — see README.

2. **No logo file supplied.** The RobustWorx logo was not provided with this
   build. `src/components/Logo.astro` renders a neutral typographic wordmark as
   a stand-in — it is **not** a redrawing of the RobustWorx mark. Drop the real
   logo at `public/brand/robustworx-logo.svg` (or `.png` / `.webp`) and it is
   used automatically everywhere, with no code change. **Do this before the site
   goes live.**

3. **No equipment catalogue.** The fleet page describes equipment by category
   and field use. Specifications are confirmed by phone. The site says so
   explicitly rather than implying a fixed inventory.

4. **Work page describes situations, not projects.** The Work page publishes
   verified job records when they exist and otherwise describes the _kinds_ of
   field situation RobustWorx is set up for, in prospective language. It makes
   no claim about completed projects, clients or outcomes.

5. **Structured data is minimal.** The `ProfessionalService` schema in
   `src/layouts/BaseLayout.astro` carries name, description, URL, phone,
   area served (South Australia) and founder only. No address, coordinates,
   opening hours, price range, ratings or reviews.

6. **Scoping notes on services.** Traffic & workzone support and site
   supervision each carry a note directing the client to confirm
   responsibilities before engaging, so neither reads as a licensed traffic
   management or statutory supervision offering.

7. **Contact form does not send email.** No verified email address or mail
   backend exists, so the form does not fake a send. See README > Contact form
   behaviour.

---

## Also needs confirming (technical, not a public claim)

| Item                             | Current value                                     | Action                                                                                                              |
| -------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Production domain                | `https://robustworx.com.au`                       | Set `SITE_URL` at build time if the real domain differs. It drives canonical URLs, OG tags and `sitemap-index.xml`. |
| `public/robots.txt` sitemap line | `https://robustworx.com.au/sitemap-index.xml`     | Update by hand if the domain changes.                                                                               |
| Privacy and Terms pages          | Written to describe how the site actually behaves | Have Scott read both before launch; update the "Last updated" date if changed.                                      |
