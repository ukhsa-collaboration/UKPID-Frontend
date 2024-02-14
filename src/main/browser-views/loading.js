import { BrowserView } from "electron";
import path from "node:path";

/**
 * @returns {Electron.CrossProcessExports.BrowserView}
 */
const createLoadingView = (window, width, height) => {
  const view = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  view.setBounds({ x: 0, y: 0, width, height });

  // and load the index.html of the app.
  if (LOADING_WINDOW_VITE_DEV_SERVER_URL) {
    view.webContents.loadURL(`${LOADING_WINDOW_VITE_DEV_SERVER_URL}`);
  } else {
    view.webContents.loadFile(
      path.join(
        __dirname,
        `../renderer/${LOADING_WINDOW_VITE_NAME}/index.html`,
      ),
    );
  }

  return view;
};

const setLoadingView = (window) => {
  const loadingView = createLoadingView(
    window,
    window.getBounds().width,
    window.getBounds().height,
  );

  window.setBrowserView(loadingView);

  return loadingView;
};

export const enableLoadingViewOnLoad = (window) => {
  let loadingView = setLoadingView(window);

  window.once("show", () => {
    loadingView = setLoadingView(window);
  });

  window.webContents.on("did-start-loading", () => {
    loadingView = setLoadingView(window);
  });

  window.webContents.on("did-finish-load", () => {
    if (loadingView) window.removeBrowserView(loadingView);
  });
};
