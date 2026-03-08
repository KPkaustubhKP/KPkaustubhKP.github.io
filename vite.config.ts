import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // USER pages (username.github.io) → base is '/'
  // PROJECT pages (username.github.io/repo) → change to '/repo/'
  base: '/',

  assetsInclude: ['**/*.pdf'],

  build: {
    outDir: 'dist',
    emptyOutDir: true,        // wipe dist/ before every build
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
