import { exposeAppearanceSettings } from "./settings/appearance";
import { exposeAuditSettings } from "./settings/audit";

export const exposeSettings = () => {
  exposeAppearanceSettings();
  exposeAuditSettings();
};
