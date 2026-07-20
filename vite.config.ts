import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { barberApiMiddleware } from './server/barber-dev-middleware'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'barber-api-dev',
      configureServer(server) {
        server.middlewares.use(barberApiMiddleware())
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
