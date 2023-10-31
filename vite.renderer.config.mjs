import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("fluent-"),
        },
      },
    }),
    svgLoader({
      svgo: false,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/renderer/", import.meta.url)),
    },
  },
});
