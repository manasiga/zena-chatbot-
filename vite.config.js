import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'zena-chatbot-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  server: {
    port: 5173,
    host: true,
  },
});
