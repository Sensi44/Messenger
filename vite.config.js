import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-unresolved
import handlebars from 'vite-plugin-handlebars';
import path from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  plugins: [handlebars()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
});
