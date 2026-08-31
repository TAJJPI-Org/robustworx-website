// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL is the canonical production origin. Override with an env var at build
// time if the final domain differs (see README > Deployment).
const site = process.env.SITE_URL || 'https://robustworx.com.au';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Keep the sitemap identical to the canonical URLs the pages emit.
      serialize: (item) => ({
        ...item,
        url: item.url === site ? `${site}/` : item.url,
      }),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
