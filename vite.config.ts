import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  appType: 'mpa',
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        main: resolve(projectRoot, 'index.html'),
        hireflux: resolve(projectRoot, 'hireflux.html'),
      },
    },
  },
})
