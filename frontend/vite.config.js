import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },server: {
    proxy: {
      '/api': 'http://localhost:4002', 
    },
  },
});
