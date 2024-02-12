import { browser } from "@wdio/globals";
import i18n from "../../src/renderer/modules/i18n.mjs";
import SplashWindowScreen from "../screens/SplashWindowScreen.mjs";
import AuthenticationModalScreen from "../screens/AuthenticationModalScreen.mjs";
import AccountScreen from "../screens/settings/AccountScreen.mjs";
import { screenshot, setValueOfWebComponent } from "../helpers.mjs";

const { t } = i18n.global;

describe("Authentication Process", () => {
  let splashWindowHandle;
  let loginWindowHandle;

  it("should not allow sign in when offline when no user has previously logged in", async () => {
    await browser.execute(() => {
      window.network.disconnect();
    });

    const logInButton = await SplashWindowScreen.logInButton;
    await logInButton.waitForClickable();
    await logInButton.click();

    const offlineMessage = await SplashWindowScreen.offlineMessage;
    await expect(offlineMessage).toHaveText(
      expect.stringContaining(t("Unable to connect to the UKPID server.")),
    );

    await screenshot("splash_offline_login_fresh");

    await browser.execute(() => {
      window.network.connect();
    });
  });

  it("should display login window when login button is clicked", async () => {
    splashWindowHandle = await browser.getWindowHandle();

    const logInButton = await SplashWindowScreen.logInButton;
    await logInButton.waitForClickable();
    await screenshot("splash_login");
    await logInButton.click();

    // Switch to login modal window
    await AuthenticationModalScreen.switchToLoginWindow();
  });

  it("should allow user to log in", async () => {
    loginWindowHandle = await browser.getWindowHandle();

    await expect($("h1")).toHaveText("Log in");

    await setValueOfWebComponent(
      AuthenticationModalScreen.emailFieldSelector,
      "admin@juicy.media",
    );

    await setValueOfWebComponent(
      AuthenticationModalScreen.passwordFieldSelector,
      "password",
    );

    await screenshot("ukpid_login");

    await AuthenticationModalScreen.logInButton.click();
  });

  it("should close login window after successful login", async () => {
    // Wait for login modal window to close
    await browser.switchToWindow(splashWindowHandle);
    await browser.waitUntil(
      async () =>
        !(await browser.getWindowHandles()).includes(loginWindowHandle),
      {
        timeout: 5000,
        timeoutMsg: "Expected login window to close",
      },
    );
  });

  it("should return to the splash screen after log out", async () => {
    // Wait for main window to open
    await AccountScreen.switchToMainWindow();

    await AccountScreen.navigateTo();

    const logOutButton = await AccountScreen.logOutButton;
    await logOutButton.waitForClickable();

    await screenshot("account_logout");

    await logOutButton.click();

    // Wait for splash window to open
    await SplashWindowScreen.switchToSplashWindow();
  });

  it("should allow the user to sign in as previously logged in user when offline", async () => {
    await browser.execute(() => {
      window.network.disconnect();
    });

    const logInButton = await SplashWindowScreen.logInButton;
    await logInButton.waitForClickable();
    await logInButton.click();

    const offlineMessage = await SplashWindowScreen.offlineMessage;
    await expect(offlineMessage).toHaveText(
      expect.stringContaining(t("Unable to connect to the UKPID server.")),
    );

    await screenshot("splash_offline_login");

    const continueButton = await SplashWindowScreen.offlineContinueButton;
    await continueButton.waitForClickable();
    await continueButton.click();

    // Wait for main window to open
    await AccountScreen.switchToMainWindow();

    await AccountScreen.navigateTo();

    const loggedInUser = await AccountScreen.loggedInUser;
    await expect(loggedInUser).toHaveText("Juicy Media");

    const loggedInEmail = await AccountScreen.loggedInEmail;
    await expect(loggedInEmail).toHaveText("admin@juicy.media");
  });

  it("should not allow the user to log out when offline", async () => {
    const logOutButton = await AccountScreen.logOutButton;
    await expect(logOutButton).toHaveAttr("disabled");

    await screenshot("account_offline");
  });

  it("should allow the user to log out when connection restored", async () => {
    await browser.execute(() => {
      window.network.connect();
    });

    const logOutButton = await AccountScreen.logOutButton;
    await logOutButton.waitForClickable();
    await logOutButton.click();

    // Wait for splash window to open
    await SplashWindowScreen.switchToSplashWindow();
  });
});
