import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron';
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'types': resolve(__dirname, 'types')
    }
  },
  plugins: [
    react(),
    electron({
      entry: 'app/main.ts'
    }),
  ],
  build: {
    outDir: '_dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
