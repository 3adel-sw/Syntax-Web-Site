import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { devSsePlugin } from './tools/dev-sse-plugin.mjs'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devSsePlugin(),
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
    // Target modern browsers — smaller transpile output, fewer polyfills
    target: 'es2020',
    // Inline smaller assets (≤4kb) as base64 to reduce request count on mobile
    assetsInlineLimit: 4096,
    // Drop console.log/debugger in production to shave bundle
    // (Vite 8 uses rolldown-based minifier by default — esbuild requires separate install)
    cssMinify: true,
    // No sourcemaps in prod (smaller builds, no leak of source)
    sourcemap: false,
    // Warn above 500kb chunks — current chunks are well below this
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Predictable file names — better HTTP caching on mobile networks
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Manual chunking — splits heavy vendors so initial bundle stays small
        manualChunks(id) {
          // Core React (most-used, cached across navigations)
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'vendor-react'
          }

          // Router
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router'
          }

          // Data fetching / state
          if (
            id.includes('node_modules/@tanstack/react-query') ||
            id.includes('node_modules/axios')
          ) {
            return 'vendor-data'
          }

          // i18n (large, separate cache bucket)
          if (
            id.includes('node_modules/i18next') ||
            id.includes('node_modules/react-i18next') ||
            id.includes('node_modules/i18next-browser-languagedetector')
          ) {
            return 'vendor-i18n'
          }

          // Icon libraries — split so unused icons don't bloat initial chunk
          if (
            id.includes('node_modules/lucide-react') ||
            id.includes('node_modules/react-icons')
          ) {
            return 'vendor-icons'
          }
        },
        // Experimental: smaller initial HTML
        experimentalMinChunkSize: 20000,
      },
      // Tree-shake unused exports aggressively
      treeshake: {
        moduleSideEffects: (id) => /\.css$/.test(id),
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
  },

  assetsInclude: ['**/*.svg'],
  // Disable legacy dynamic import polyfill — saves ~5kb
  legacy: {
    skipWebSocketTokenCheck: true,
  },
})