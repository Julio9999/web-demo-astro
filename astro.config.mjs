// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import netfily from '@astrojs/netlify'

import solidJs from '@astrojs/solid-js';

import db from '@astrojs/db';

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      
    ],
    optimizeDeps: {
      include: ['zod']
    }
  },

  integrations: [solidJs(), db()],
  adapter: netfily()
});