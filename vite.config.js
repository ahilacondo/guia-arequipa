import { defineConfig } from "vite";

// base relativa: permite publicar el build en GitHub Pages (subcarpeta) o abrirlo desde cualquier ruta.
export default defineConfig({
  base: "./",
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
});
