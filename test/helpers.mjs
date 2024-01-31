import { browser } from "@wdio/globals";
import i18n from "../src/renderer/modules/i18n.mjs";

const { t } = i18n.global;
export const ukpidUrl = "127.0.0.1:35080"; // env var in the future?

export const getShadowRoot = (querySelector) =>
  browser.execute(
    (selector) => document.querySelector(selector).shadowRoot,
    querySelector,
  );

export const setValueOfWebComponent = async (
  querySelector,
  value,
  targetElement = "input",
) => {
  return browser.execute(
    (shadowRoot, value, targetElement) => {
      const inputElement = shadowRoot.querySelector(targetElement);
      inputElement.value = value;
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
      inputElement.dispatchEvent(new Event("change", { bubbles: true }));
    },
    await getShadowRoot(querySelector),
    value,
    targetElement,
  );
};

export const switchToWindowByUrlPart = async (part) => {
  const allWindows = await browser.getWindowHandles();

  for (let i = allWindows.length - 1; i >= 0; i--) {
    try {
      // Switch to the window
      await browser.switchToWindow(allWindows[i]);

      // Get the URL of the current window
      let currentUrl = new URL(await browser.getUrl());
      currentUrl = currentUrl.origin + currentUrl.pathname;

      if (currentUrl.endsWith(part)) return true;
    } catch (e) {
      console.error(e);
    }
  }

  return false;
};

export const logIntoTheApplication = async () => {
  const loginButton = await $(`fluent-button=${t("Log in")}`);

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
  const loginWindowHandle = await browser.getWindowHandle();

  await expect($("h1")).toHaveText("Log in");

  await setValueOfWebComponent(
    'fluent-text-field[name="email"]',
    "admin@juicy.media",
  );

  await setValueOfWebComponent(
    'fluent-text-field[name="password"]',
    "password",
  );

  await $("fluent-button=Log in").click();
  await browser.waitUntil(
    async () => !(await browser.getWindowHandles()).includes(loginWindowHandle),
    {
      timeout: 5000,
      timeoutMsg: "Expected login window to close",
    },
  );
};

export const screenshotDir = "test/screenshots";

export const screenshot = (filename) =>
  browser.saveScreenshot(`${screenshotDir}/${filename}.png`);
