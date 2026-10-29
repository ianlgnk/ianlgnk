import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  /** GitHub Pages: /ianlgnk/; override locally with VITE_BASE_PATH=/ yarn build */
  base: process.env.VITE_BASE_PATH ?? '/',
  server: {
    port: 2000,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
