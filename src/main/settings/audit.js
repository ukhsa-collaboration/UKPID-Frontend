import { userSettings } from "./userSettingsStore";

export const getSplit = () => userSettings.get("audit:split");
export const setSplit = (_ev, value) => {
  try {
    userSettings.set("audit:split", value);
  } catch (e) {
    console.error(e);
  }
};
