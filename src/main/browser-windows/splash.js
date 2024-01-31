import { BrowserWindow } from "electron";
import { getWindowTheme } from "../window-theme";
import { buildingForTest } from "../util";
import path from "node:path";
import { showDevTools } from "../dev-tools";
import { addDeveloperMenu } from "../menu/developer";

/**
 * @returns {Electron.CrossProcessExports.BrowserWindow}
 */
export const createSplashWindow = () => {
  const window = new BrowserWindow({
    ...getWindowTheme(),
    width: 500,
    height: 440,
    resizable: false,
    titleBarStyle: "hidden",
    maximizable: false,
    show: false,
    webPreferences: {
      sandbox: !buildingForTest,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (SPLASH_WINDOW_VITE_DEV_SERVER_URL) {
    window.loadURL(`${SPLASH_WINDOW_VITE_DEV_SERVER_URL}`);
    showDevTools(window);
  } else {
    window.loadFile(
      path.join(__dirname, `../renderer/${SPLASH_WINDOW_VITE_NAME}/index.html`),
    );
  }

  addDeveloperMenu();

  window.once("ready-to-show", () => {
    window.show();
  });

  return window;
};
