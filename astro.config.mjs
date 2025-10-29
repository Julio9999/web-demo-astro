// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import netfily from '@astrojs/netlify'

import solidJs from '@astrojs/solid-js';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [solidJs(), db()],
  output: 'server',
  adapter: netfily()
});