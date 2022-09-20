/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
  ],
  envDir: './src/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/') //fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [
      'node_modules',
      'examples'
    ]
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'), // fileURLToPath(new URL('src/main.ts')),
      name: 'underlog',
      fileName: (format) => `underlog.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
        },
      },
    },
  },
})
