import settingsStore from "./stores/settings";
import userStore from "./stores/user";
import { applyTheme, applyTextSize } from "./appearance";

const userId = userStore.get("id");
const userSettings = settingsStore(userId);

export const getTheme = () => userSettings.get("theme");
export const setTheme = (_ev, value) => {
  try {
    userSettings.set("theme", value);
    applyTheme();
  } catch (e) {
    console.error(e);
  }
};

export const getTextSize = () => userSettings.get("textSize") ?? 1;
export const setTextSize = (_ev, value) => {
  try {
    value = parseFloat(value);
    userSettings.set("textSize", value);
    applyTextSize();
  } catch (e) {
    console.error(e);
  }
};
