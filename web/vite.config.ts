import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: { globPatterns: ['**/*.{js,css,html,png,svg,webp}'] },
      manifest: {
        name: 'AIM Steel QR',
        short_name: 'AIM',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
      },
    }),
  ],
  server: { port: 5173 },
});
