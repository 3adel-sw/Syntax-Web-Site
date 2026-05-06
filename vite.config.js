import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url))
    },
  },
    css: {
    devSourcemap: false, 
  },
 build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
       
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor'
          }
          if (id.includes('node_modules/react-router')) {
            return 'router'
          }
        }
      }
    }
  },
   content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  assetsInclude: ['**/*.svg'],
})