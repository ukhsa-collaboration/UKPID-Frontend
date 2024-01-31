import { browser } from "@wdio/globals";
import i18n from "../../src/renderer/modules/i18n.mjs";
import {
  screenshot,
  setValueOfWebComponent,
  switchToWindowByUrlPart,
  ukpidUrl,
} from "../helpers.mjs";

const { t } = i18n.global;

describe("Authentication Process", () => {
  let splashWindowHandle;
  let loginWindowHandle;

  it("should not allow sign in when offline when no user has previously logged in", async () => {
    await browser.execute(() => {
      window.network.disconnect();
    });

    const loginButton = await $(`fluent-button=${t("Log in")}`);
    await loginButton.waitForClickable();
    await loginButton.click();

    const offlineMessage = await $('div[data-testid="offlineMessage"]');
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

    const loginButton = await $(`fluent-button=${t("Log in")}`);
    await loginButton.waitForClickable();
    await screenshot("splash_login");
    await loginButton.click();

    // Switch to login modal window
    await browser.waitUntil(
      async () => await switchToWindowByUrlPart(`${ukpidUrl}/login`),
      {
        timeout: 5000,
        interval: 500,
        timeoutMsg: "Expected the login window to open",
      },
    );
  });

  it("should allow user to log in", async () => {
    loginWindowHandle = await browser.getWindowHandle();

    await expect($("h1")).toHaveText("Log in");

    await setValueOfWebComponent(
      'fluent-text-field[name="email"]',
      "admin@juicy.media",
    );

    await setValueOfWebComponent(
      'fluent-text-field[name="password"]',
      "password",
    );

    await screenshot("ukpid_login");

    await $("fluent-button=Log in").click();
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
    await browser.waitUntil(
      async () => await switchToWindowByUrlPart("/main_window/index.html"),
      {
        timeout: 5000,
        interval: 500,
        timeoutMsg: "Expected the main window to open",
      },
    );

    const settingsButton = await $(`a=${t("routes.settings._")}`);
    await settingsButton.waitForClickable();
    await settingsButton.click();

    const accountButton = await $(`a=${t("routes.settings.account")}`);
    await accountButton.waitForClickable();
    await accountButton.click();

    const logOutButton = await $(`fluent-button=${t("Log out")}`);
    await logOutButton.waitForClickable();

    await screenshot("account_logout");

    await logOutButton.click();

    // Wait for splash window to open
    await browser.waitUntil(
      async () => await switchToWindowByUrlPart("/splash_window/index.html"),
      {
        timeout: 5000,
        interval: 500,
        timeoutMsg: "Expected the splash window to open",
      },
    );
  });

  it("should allow the user to sign in as previously logged in user when offline", async () => {
    await browser.execute(() => {
      window.network.disconnect();
    });

    const loginButton = await $(`fluent-button=${t("Log in")}`);
    await loginButton.waitForClickable();
    await loginButton.click();

    const offlineMessage = await $('div[data-testid="offlineMessage"]');
    await expect(offlineMessage).toHaveText(
      expect.stringContaining(t("Unable to connect to the UKPID server.")),
    );

    await screenshot("splash_offline_login");

    const continueButton = await $(
      `fluent-button=${t("Continue offline as {user}", { user: "Juicy Media" })}`,
    );
    await continueButton.waitForClickable();
    await continueButton.click();

    // Wait for main window to open
    await browser.waitUntil(
      async () => await switchToWindowByUrlPart("/main_window/index.html"),
      {
        timeout: 5000,
        interval: 500,
        timeoutMsg: "Expected the main window to open",
      },
    );

    const settingsButton = await $(`a=${t("routes.settings._")}`);
    await settingsButton.waitForClickable();
    await settingsButton.click();

    const accountButton = await $(`a=${t("routes.settings.account")}`);
    await accountButton.waitForClickable();
    await accountButton.click();

    const loggedInUser = await $('span[data-testid="loggedInUser"]');
    await expect(loggedInUser).toHaveText("Juicy Media");

    const loggedInEmail = await $('span[data-testid="loggedInEmail"]');
    await expect(loggedInEmail).toHaveText("admin@juicy.media");
  });

  it("should show not allow the user to log out when offline", async () => {
    const logOutButton = await $(`fluent-button=${t("Log out")}`);
    logOutButton.waitForEnabled({ reverse: true });
    await expect(logOutButton).toHaveAttr("disabled");

    await screenshot("account_offline");
  });

  it("should allow the user to log out when connection restored", async () => {
    await browser.execute(() => {
      window.network.connect();
    });

    const logOutButton = await $(`fluent-button=${t("Log out")}`);
    await logOutButton.waitForClickable();
    await logOutButton.click();

    // Wait for splash window to open
    await browser.waitUntil(
      async () => await switchToWindowByUrlPart("/splash_window/index.html"),
      {
        timeout: 5000,
        interval: 500,
        timeoutMsg: "Expected the splash window to open",
      },
    );
  });
});
