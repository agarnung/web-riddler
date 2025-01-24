// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  output: 'static',
  site: 'https://web-riddler.vercel.app/',
  server: {
    // Server configuration
    headers: {
      // Cache control to prevent caching
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  },

});

