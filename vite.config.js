import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // Optional, makes sure Vite starts at project root
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'public/index.html'
    }
  }
})
