import i18n from "../../src/renderer/modules/i18n.mjs";
import { switchToWindowByUrlPart, ukpidUrl } from "../helpers.mjs";

class AuthenticationModalScreen {
  t = i18n.global.t;

  async switchToLoginWindow() {
    return await browser.waitUntil(
      async () => await switchToWindowByUrlPart(`${ukpidUrl}/login`),
      {
        timeout: 5000,
        interval: 500,
        timeoutMsg: "Expected the login window to open",
      },
    );
  }

  get emailFieldSelector() {
    return 'fluent-text-field[name="email"]';
  }

  get passwordFieldSelector() {
    return 'fluent-text-field[name="password"]';
  }

  get logInButton() {
    return $("fluent-button=Log in");
  }
}

export default new AuthenticationModalScreen();
