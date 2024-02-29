import { applyTheme, applyTextSize } from "../appearance";
import { userSettings } from "./userSettingsStore";

export const getTheme = () => userSettings.get("appearance:theme");
export const setTheme = (_ev, value) => {
  try {
    userSettings.set("appearance:theme", value);
    applyTheme();
  } catch (e) {
    console.error(e);
  }
};

export const getTextSize = () => userSettings.get("appearance:textSize") ?? 1;
export const setTextSize = (_ev, value) => {
  try {
    value = Math.round(value * 100) / 100;
    userSettings.set("appearance:textSize", value);
    applyTextSize();
  } catch (e) {
    console.error(value, e);
  }
};
