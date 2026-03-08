import { defineConfig } from 'vite' // This line must exist
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Safest for GitHub Pages relative paths
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  }
})
