// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  integrations: [svelte()],
  output: 'server',
  adapter: vercel({
    imageService: true, 
  }),
});

