import { nativeTheme } from "electron";
import { getTheme, getTextSize } from "./settings";
import { sendToAll } from "./web-contents";

export const applyTheme = () => {
  nativeTheme.themeSource = getTheme() ?? "system";
};

export const applyTextSize = () => {
  sendToAll("settings:textSizeChanged", getTextSize());
};

export const applyAppearance = () => {
  applyTheme();
};
