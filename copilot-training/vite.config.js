import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment and set your repo name when deploying to GitHub Pages
  // base: '/copilot-training/',
})
