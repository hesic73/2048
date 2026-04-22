import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/2048/',
  plugins: [
    react({ include: '**/*.{js,jsx}' }),
    tailwindcss(),
  ],
  server: { port: 3000, open: true },
  build: { outDir: 'build' },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
});
