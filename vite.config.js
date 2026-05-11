import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update 'base' to match your GitHub repo name exactly when deploying
export default defineConfig({
  plugins: [react()],
  base: '/trackSphereHybrid/',
})
