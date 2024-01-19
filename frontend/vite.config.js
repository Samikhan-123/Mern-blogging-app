import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "https://puce-nice-chicken.cyclic.app/",
        target: "http://localhost:5000",
        changeOrigin: true,
        credentials: true
      }
    }
  },
  plugins: [preact()]
});
