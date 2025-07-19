import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // Disable Vite's modulepreload polyfill to avoid invalid fetches on extension links
    polyfillModulePreload: false,
  },
}) 