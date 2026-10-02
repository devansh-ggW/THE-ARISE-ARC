import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: ['3000-ivw6ne0ayen3ew20pbm7m-db55576d.sg2.manus.computer'],
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    assetsInlineLimit: 2048,
  },
});
