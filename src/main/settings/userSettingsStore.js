import settingsStore from "../stores/settings";

import userStore from "../stores/user";

const userId = userStore.get("id");
export const userSettings = settingsStore(userId);
