import type { UserConfig } from 'vite';

import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite';
import alias from '@rollup/plugin-alias';
import path from 'path';

// https://vite.dev/config/
export default {
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '$': path.resolve(__dirname, './src'),
    }
  },
  plugins: [
    preact(), 
    tailwindcss(),
  ],
} satisfies UserConfig;
