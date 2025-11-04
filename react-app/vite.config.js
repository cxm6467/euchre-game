import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow LAN access
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4567',
        changeOrigin: true
      }
    }
  },
  root: 'react-app',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
