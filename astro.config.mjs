// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import vercelServerless from '@astrojs/vercel/serverless'; // https://github.com/withastro/astro/issues/4464
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  integrations: [svelte()],
  output: 'server',
  adapter: vercelServerless({
    imageService: true, 
  }),
});

