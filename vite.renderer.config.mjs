import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import svgLoader from "vite-svg-loader";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config
export default defineConfig({
  envPrefix: "UKPID_",
  mode: process.env.BUILD_IDENTIFIER,
  build: {
    sourcemap: true,
  },
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
    sentryVitePlugin({
      org: "juicy-media-4r",
      project: "ukpid-desktop-app",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/renderer/", import.meta.url)),
    },
  },
});
