import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
    build: {
      // Use modern ESNext target to prevent transpiling modern syntax (e.g. async/await) and reduce bundle size
      target: 'esnext',
      // Inline small assets (< 4KB) directly into CSS to reduce HTTP requests
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          /**
           * Manual chunk splitting strategy:
           * - "vendor-react": React runtime (always cached, rarely changes)
           * - "vendor-lucide": Icon library (large, loaded after LCP)
           * - "vendor-misc": Other non-critical third-party libraries
           * This prevents non-critical vendor code from blocking the LCP chunk.
           */
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('node_modules/')) {
              return 'vendor-misc';
            }
          },
        },
      },
    },
  };
});
