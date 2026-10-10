import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/fixers-site/").
// Locally it defaults to "/" so `npm run dev` keeps working at http://localhost:5173/.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
});
