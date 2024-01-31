import { defineConfig } from "vite";
import viteRendererConfig from "./vite.renderer.config.mjs";
import path from "node:path";

// https://vitejs.dev/config
export default defineConfig({
  ...viteRendererConfig,
  envDir: path.resolve(__dirname),
  root: path.resolve(__dirname, "src", "renderer", "windows", "splash"),
});
