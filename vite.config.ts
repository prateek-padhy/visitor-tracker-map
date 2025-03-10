import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  base: '/visitor-tracker-map/', 
  build: {
    outDir: "dist"
  },
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  optimizeDeps: {
    include: ["react-map-gl"],
  },
  resolve: {
    alias: {
      "react-map-gl": "react-map-gl/dist/esm",
    },
  },
});
