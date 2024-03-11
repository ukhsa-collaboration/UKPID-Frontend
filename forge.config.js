const {
  utils: { fromBuildIdentifier },
} = require("@electron-forge/core");
const fs = require("fs");
const { join } = require("path");

module.exports = {
  buildIdentifier: process.env.BUILD_IDENTIFIER ?? "release",
  packagerConfig: {
    asar: true,
    icon: "forge/icons/icon",
    prune: process.env.NODE_ENV !== "test",
    appBundleId: fromBuildIdentifier({
      test: "co.uk.juicymedia.test.ukpid",
      prerelease: "co.uk.juicymedia.prerelease.ukpid",
      release: "co.uk.juicymedia.ukpid",
    }),
    protocols: [
      {
        name: "UK Poisons Information Database",
        schemes: ["ukpid"],
      },
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel", // Windows
      config: {},
    },
    {
      name: "@electron-forge/maker-dmg", // Mac
      config: {
        name: "UKPID",
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-vite",
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: "src/main.js",
            config: "vite.main.config.mjs",
          },
          {
            entry: "src/preload.js",
            config: "vite.preload.config.mjs",
          },
        ],
        renderer: [
          {
            name: "main_window",
            config: "vite.renderer.main.config.mjs",
          },
          {
            name: "splash_window",
            config: "vite.renderer.splash.config.mjs",
          },
          {
            name: "loading_window",
            config: "vite.renderer.loading.config.mjs",
          },
          {
            name: "popout_window",
            config: "vite.renderer.popout.config.mjs",
          },
        ],
      },
    },
  ],
  hooks: {
    packageAfterCopy: async (forgeConfig, buildPath) => {
      const metadata = {
        buildIdentifier: forgeConfig.buildIdentifier,
        appBundleId: forgeConfig.packagerConfig.appBundleId,
      };

      fs.writeFileSync(
        join(buildPath, "ukpid.json"),
        JSON.stringify(metadata),
        { encoding: "utf8" },
      );
    },
  },
};
