const { dialog } = require("electron");
export const handleDeepLink = (url) => {
  dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
};
