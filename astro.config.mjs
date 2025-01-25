// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';

import dotenv from 'dotenv';
dotenv.config();

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  
  output: 'server',
  adapter: vercel(),

  server: {
    // Server configuration
    headers: {
      // Cache control to prevent caching
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  },

  vite: {
    define: {
      'process.env': process.env, // Esto asegura que las variables de entorno estén disponibles
    },
  }, 
});
