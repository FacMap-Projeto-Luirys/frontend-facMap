import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Duas páginas: index.html é a landing estática (kit em public/assets) e app.html é o app React.
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  build: {
    assetsDir: "bundle",
    rollupOptions: {
      input: {
        main: "index.html",
        app: "app.html",
      },
    },
  },
});
