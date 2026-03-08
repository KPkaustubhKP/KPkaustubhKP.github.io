import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use './' to make all paths relative. This is the most compatible setting.
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // This ensures clean builds
    emptyOutDir: true,
  }
})
