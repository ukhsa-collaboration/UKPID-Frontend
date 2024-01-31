import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config
export default defineConfig({
  envPrefix: "UKPID_",
  mode: process.env.BUILD_IDENTIFIER,
  build: {
    sourcemap: true,
  },

  plugins: [
    sentryVitePlugin({
      org: "juicy-media-4r",
      project: "ukpid-desktop-app",
    }),
  ],
});
