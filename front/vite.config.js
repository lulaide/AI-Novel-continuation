import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 把 /api 下的请求都转发到 http://localhost:5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // 可选：如果后台路径和前端路径一致，可以留空；
//         rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
