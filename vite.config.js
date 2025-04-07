import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',           // ensure root is correct
  build: {
    outDir: 'dist',    // where to output the final build
    emptyOutDir: true, // clean before build
  },
  publicDir: 'public', // explicitly use the public folder
});
