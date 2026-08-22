import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

const setupFile = resolve(__dirname, 'src/tests/setup.ts')

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: fs.existsSync(setupFile) ? [setupFile] : [],
    include: ['src/tests/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
