import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    port: '3000',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001/api',
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
