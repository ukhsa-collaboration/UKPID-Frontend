import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  envPrefix: "UKPID_",
  mode: process.env.BUILD_IDENTIFIER,

  build: {
    sourcemap: true,
  },

  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    conditions: ["node"],
    mainFields: ["module", "jsnext:main", "jsnext"],
  },

  plugins: [
    sentryVitePlugin({
      org: "juicy-media-4r",
      project: "ukpid-desktop-app",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});
