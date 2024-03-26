import installExtension from "electron-devtools-installer";

export const showDevTools = (mainWindow) => {
  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: "detach" });

  // Install WebdriverIO Chrome Recorder extension
  installExtension("pllimkccefnbmghgcikpjkmmcadeddfn")
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  // Install VueJS Dev Tools extension
  installExtension("nhdogjmejiglipccpnnnanhbledajbpd")
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
};
