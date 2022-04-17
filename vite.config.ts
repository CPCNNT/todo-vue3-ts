import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

process.env.BROWSER = loadEnv('development', process.cwd(), '').BROWSER

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteCompression()],
  server: {
    open: true,
  },
})
