import { BrowserWindow } from "electron";
import { getWindowTheme } from "../windowTheme";
import { buildingForTest } from "../util";
import path from "node:path";
import { showDevTools } from "../devTools";

export const mainWindowUrl =
  MAIN_WINDOW_VITE_DEV_SERVER_URL ??
  path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`);

/**
 * @returns {Electron.CrossProcessExports.BrowserWindow}
 */
export const createMainWindow = () => {
  // Create the browser window.
  const window = new BrowserWindow({
    ...getWindowTheme(),
    width: 1280,
    height: 720,
    minHeight: 500,
    minWidth: 920,
    titleBarStyle: "hidden",
    show: false,
    webPreferences: {
      sandbox: !buildingForTest,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    window.loadURL(mainWindowUrl);
    showDevTools(window);
  } else {
    window.loadFile(mainWindowUrl);
  }

  return window;
};
