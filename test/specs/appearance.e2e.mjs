import { browser } from "@wdio/globals";
import i18n from "../../src/renderer/modules/i18n.mjs";
import {
  logIntoTheApplication,
  screenshot,
  switchToWindowByUrlPart,
} from "../helpers.mjs";
import AppearancePage from "../pages/settings/AppearancePage.mjs";

const { t } = i18n.global;

describe("Appearance Settings", () => {
  before(logIntoTheApplication);

  it("should navigate to the appearance settings page", async () => {
    // Wait for main window to open
    await browser.waitUntil(
      async () => await switchToWindowByUrlPart("/main_window/index.html"),
      {
        timeout: 5000,
        interval: 500,
        timeoutMsg: "Expected the main window to open",
      },
    );

    await AppearancePage.navigateTo();

    await screenshot("appearance_settings");
  });

  it("should switch app theme", async () => {
    let appBg;

    const appThemeSelect = await AppearancePage.appThemeSelect;
    await appThemeSelect.waitForClickable();
    await appThemeSelect.click();

    await screenshot("app_theme_select");

    // Select dark theme
    const darkOption = await appThemeSelect.$(
      `>>>fluent-option[data-test="dark"]`,
    );
    await darkOption.waitForClickable();
    await darkOption.click();

    const appEl = await AppearancePage.appElement;

    await browser.waitUntil(
      async () =>
        (await appEl.getCSSProperty("background-color")).value ===
        "rgba(26,26,26,1)",
      {
        timeout: 1000,
        timeoutMsg: "Expected the app background to be dark",
      },
    );

    await screenshot("app_theme_dark");

    // Select light theme
    await appThemeSelect.click();
    const lightOption = await appThemeSelect.$(
      `>>>fluent-option[data-test="light"]`,
    );
    await lightOption.waitForClickable();
    await lightOption.click();

    await browser.waitUntil(
      async () =>
        (await appEl.getCSSProperty("background-color")).value ===
        "rgba(243,243,243,1)",
      {
        timeout: 1000,
        timeoutMsg: "Expected the app background to be light",
      },
    );

    await screenshot("app_theme_light");
  });

  // it("should match the system theme", async () => {
  //// This isn't something we can currently test. The BiDi functionality required for WDIO
  //// emulation breaks Electron tests. Emulation is the only way to change the preferred colour
  //// scheme. Even if it did work, ultimately this would be employing the same method as the
  //// app theme feature uses in the application - i.e. change the colour scheme of the chromium instance.
  // });

  it("should change the text size", async () => {
    const textSizeSlider = await AppearancePage.textSizeSlider;

    const textSizeLabel = await AppearancePage.textSizeLabel;
    const initialLabelSize = await textSizeLabel.getCSSProperty("font-size");

    const thumb = await AppearancePage.textSizeSliderThumb;
    let startPosition = await thumb.getLocation();

    // Move the slider to the maximum
    await browser.performActions([
      {
        type: "pointer",
        id: "textSizeMax",
        parameters: { pointerType: "mouse" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: Math.ceil(startPosition.x),
            y: Math.ceil(startPosition.y),
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          {
            type: "pointerMove",
            duration: 500,
            origin: "pointer",
            x: Math.ceil(await textSizeSlider.getSize("width")) + 50, // Add a bit to be safe
            y: 0,
          },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    await AppearancePage.textSizeApply.click();

    let labelSize = await textSizeLabel.getCSSProperty("font-size");

    await expect(labelSize.parsed.value.toString()).toMatch(
      (initialLabelSize.parsed.value * 2).toString(),
    );

    await screenshot("text_size_200");

    startPosition = await thumb.getLocation();

    // Move the slider to the minimum
    await browser.performActions([
      {
        type: "pointer",
        id: "textSizeMin",
        parameters: { pointerType: "mouse" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: Math.ceil(startPosition.x),
            y: Math.ceil(startPosition.y),
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          {
            type: "pointerMove",
            duration: 500,
            origin: "pointer",
            x: -1 * Math.ceil(await textSizeSlider.getSize("width")) - 50, // Add a bit to be safe
            y: 0,
          },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    await AppearancePage.textSizeApply.click();

    labelSize = await textSizeLabel.getCSSProperty("font-size");

    await expect(labelSize.parsed.value.toString()).toMatch(
      initialLabelSize.parsed.value.toString(),
    );

    await screenshot("text_size_100");
  });
});
