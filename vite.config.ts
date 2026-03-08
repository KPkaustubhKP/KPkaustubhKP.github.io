import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This ensures assets are loaded via relative paths
  base: './', 
  build: {
    outDir: 'dist',
    // Ensures assets are generated in a predictable structure
    assetsDir: 'assets',
  }
})
