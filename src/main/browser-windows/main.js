import { BrowserWindow } from "electron";
import { getWindowTheme } from "../window-theme";
import { buildingForTest } from "../util";
import path from "node:path";
import { showDevTools } from "../dev-tools";
import { addDeveloperMenu } from "../menu/developer";

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
    window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    showDevTools(window);
  } else {
    window.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  addDeveloperMenu();

  return window;
};
