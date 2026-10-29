import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const root = import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  /** GitHub Pages: /ianlgnk/; override locally with VITE_BASE_PATH=/ yarn build */
  base: process.env.VITE_BASE_PATH ?? '/',
  /** Duas páginas estáticas (`/` e `/sobre/`), sem fallback de SPA. */
  appType: 'mpa',
  server: {
    port: 2000,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(root, 'index.html'),
        sobre: path.resolve(root, 'sobre/index.html'),
      },
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(root, './src'),
    },
  },
})
