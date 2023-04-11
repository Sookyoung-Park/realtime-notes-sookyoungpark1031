import eslint from 'vite-plugin-eslint';
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';

import favicon from 'vite-plugin-favicon';

import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint(), favicon({
    src: './img/favicon',
  })],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
});
