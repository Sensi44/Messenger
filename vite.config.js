// import path from 'path';

import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  plugins: [handlebars()],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //     '@/components': path.resolve(__dirname, 'src/components'),
  //     '@/helpers': path.resolve(__dirname, 'src/helpers'),
  //     '@/pages': path.resolve(__dirname, 'src/pages'),
  //   },
  // },
});
