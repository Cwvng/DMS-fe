import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000
  },
  optimizeDeps: {
    exclude: ['chunk-LEWXNKAQ.js', 'chunk-XYHKVKPW.js'],
    include: ['@ant-design/icons','@react-icons/all-files']
  }
});
