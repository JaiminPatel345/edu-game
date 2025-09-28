import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,json}"]
      },
      devOptions: {
        enabled: mode === "development",
      },
      manifest: {
        name: "Nano Chacha STEM Worlds",
        short_name: "NanoChacha",
        theme_color: "#5A4BFF",
        background_color: "#0F172A",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "/icons/icon-512.png",
            type: "image/png",
            sizes: "512x512"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@game": fileURLToPath(new URL("./src", import.meta.url)),
      "@content": fileURLToPath(new URL("./src/content", import.meta.url))
    }
  },
  server: {
    port: 4173,
  }
}));
