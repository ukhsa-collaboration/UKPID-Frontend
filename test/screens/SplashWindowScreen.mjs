import i18n from "../../src/renderer/modules/i18n.mjs";
import { switchToWindowByUrlPart } from "../helpers.mjs";

class SplashWindowScreen {
  t = i18n.global.t;

  async switchToSplashWindow() {
    return await browser.waitUntil(
      async () => await switchToWindowByUrlPart("/splash_window/index.html"),
      {
        timeout: 5000,
        interval: 500,
        timeoutMsg: "Expected the splash window to open",
      },
    );
  }

  get logInButton() {
    return $(`fluent-button=${this.t("Log in")}`);
  }

  get offlineMessage() {
    return $('div[data-testid="offlineMessage"]');
  }

  get offlineContinueButton() {
    return $(
      `fluent-button=${this.t("Continue offline as {user}", { user: "Juicy Media" })}`,
    );
  }
}

export default new SplashWindowScreen();
