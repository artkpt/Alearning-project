import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server:{
    proxy:{
      '/api':{
        target: 'http://adonisjs:3333',
        changeOrigin: true,
        // เพิ่มบรรทัดนี้: เพื่อลบ /api ออกก่อนส่งไปที่ server
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
