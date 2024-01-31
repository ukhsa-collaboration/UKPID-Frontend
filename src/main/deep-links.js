import { app, dialog } from "electron";
import { callback } from "./auth";
import path from "node:path";

export const registerDeepLinkHandler = () => {
  // Register the app as the handler for ukpid:// links
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient("ukpid", process.execPath, [
        path.resolve(process.argv[1]),
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient("ukpid");
  }

  // Handle the deep link protocol - macOS
  app.on("open-url", (event, url) => {
    handleDeepLink(url);
  });
};

export const handleDeepLink = (url) => {
  const path = url.replace("ukpid://", "/");

  if (path.startsWith("/oauth/callback")) {
    callback(url).then((r) => {});
  } else {
    dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
  }
};
