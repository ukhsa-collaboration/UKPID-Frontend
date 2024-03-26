import { nativeTheme } from "electron";

export const getWindowTheme = (hasTitleBar = true, titleBarHeight = 46) =>
  nativeTheme.shouldUseDarkColors
    ? {
        // Dark mode
        backgroundColor: "#272727",
        titleBarOverlay: !hasTitleBar
          ? false
          : {
              height: titleBarHeight,
              color: "#1a1a1a",
              symbolColor: "#ffffff",
            },
      }
    : {
        // Light mode
        backgroundColor: "#fbfbfb",
        titleBarOverlay: !hasTitleBar
          ? false
          : {
              height: titleBarHeight,
              color: "#f3f3f3",
              symbolColor: "#1a1a1a",
            },
      };

export const setTheme = (browserWindow) => {
  if (!browserWindow || browserWindow?.isDestroyed()) return;

  const theme = getWindowTheme();

  browserWindow.setBackgroundColor(theme.backgroundColor);

  if (process.platform === "win32") {
    browserWindow.setTitleBarOverlay(theme.titleBarOverlay);
  }
};
