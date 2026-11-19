import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Duas páginas: index.html é a landing estática (kit em public/assets) e app.html é o app React.
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Só o app.html tem imports npm. A landing (index.html) carrega scripts estáticos de public/assets
    // com vite-ignore, que o scanner do Vite não entende: sem isto o scan falha, as dependências são
    // descobertas só no primeiro acesso e o navegador recebe "504 Outdated Optimize Dep" (tela branca até o F5).
    entries: ["app.html"],
    include: ["react", "react/jsx-runtime", "react/jsx-dev-runtime", "react-dom", "react-dom/client"],
  },
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
