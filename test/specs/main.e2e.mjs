import { browser } from "@wdio/globals";
import i18n from "../../src/renderer/modules/i18n.mjs";
import { logIntoTheApplication, switchToWindowByUrlPart } from "../helpers.mjs";

const { t } = i18n.global;

describe("Main Window", () => {
  before(logIntoTheApplication);

  it("should allow the user to switch app theme", async () => {
    // Wait for main window to open
    await browser.waitUntil(
      async () => await switchToWindowByUrlPart("/main_window/index.html"),
      {
        timeout: 5000,
        interval: 500,
        timeoutMsg: "Expected the main window to open",
      },
    );

    await expect($("h1")).toHaveText(t("Dashboard"));
  });
});
