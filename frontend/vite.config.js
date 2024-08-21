import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Ensure that dependencies like react-icons are not marked as external
      external: [],
      onwarn(warning, warn) {
        // Ignore certain Rollup warnings, such as unresolved imports
        if (warning.code === 'UNRESOLVED_IMPORT') {
          return;
        }
        warn(warning);
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
      },
    },
  },
});
