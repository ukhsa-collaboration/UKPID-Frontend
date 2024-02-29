import i18n from "../../src/renderer/modules/i18n.mjs";
import { logIntoTheApplication } from "../helpers.mjs";
import { MainScreen } from "../screens/MainWindowScreen.mjs";

const { t } = i18n.global;

describe("Main Window", () => {
  before(logIntoTheApplication);

  it("should open main window after login", async () => {
    await MainScreen.switchToMainWindow();

    await expect($("h1")).toHaveText(t("Dashboard"));
  });
});
