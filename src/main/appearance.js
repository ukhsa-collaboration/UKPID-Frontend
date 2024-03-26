import { nativeTheme } from "electron";
import { getTheme, getTextSize } from "./settings/appearance";
import { sendToAll } from "./webContents";

export const applyTheme = () => {
  nativeTheme.themeSource = getTheme() ?? "system";
};

export const applyTextSize = () => {
  sendToAll("settings:appearance:textSizeChanged", getTextSize());
};

export const applyAppearance = () => {
  applyTheme();
};
