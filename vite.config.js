import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()

  ],
  server: {
    proxy: {
      // On crée un raccourci : chaque fois qu'on appelle /api-games, 
      // Vite le redirige vers le vrai site
      '/api-games': {
        target: 'https://www.freetogame.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-games/, '')
      }
    }},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})