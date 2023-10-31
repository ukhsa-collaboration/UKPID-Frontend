import {
  baseLayerLuminance,
  StandardLuminance,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
  typeRampMinus1FontSize,
  typeRampMinus1LineHeight,
  typeRampMinus2FontSize,
  typeRampMinus2LineHeight,
  typeRampPlus1FontSize,
  typeRampPlus1LineHeight,
  typeRampPlus2FontSize,
  typeRampPlus2LineHeight,
  typeRampPlus3FontSize,
  typeRampPlus3LineHeight,
  typeRampPlus4FontSize,
  typeRampPlus4LineHeight,
  typeRampPlus5FontSize,
  typeRampPlus5LineHeight,
  typeRampPlus6FontSize,
  typeRampPlus6LineHeight,
  fluentTextField,
  provideFluentDesignSystem,
  fluentButton,
  fluentCard,
  accentBaseColor,
  SwatchRGB,
  neutralBaseColor,
} from "@fluentui/web-components";

import { parseColorHexRGB } from "@microsoft/fast-colors";
import { DesignToken } from "@microsoft/fast-foundation";

provideFluentDesignSystem().register(
  fluentTextField(),
  fluentButton(),
  fluentCard(),
);

/**
 * Global App styles
 */
const app = document.getElementById("app");

typeRampMinus2FontSize.setValueFor(app, "0.625rem"); // 10px
typeRampMinus1FontSize.setValueFor(app, "0.75rem"); // 12px
typeRampBaseFontSize.setValueFor(app, "0.85rem"); // 14px
typeRampPlus1FontSize.setValueFor(app, "1rem"); // 16px
typeRampPlus2FontSize.setValueFor(app, "1.25rem"); // 20px
typeRampPlus3FontSize.setValueFor(app, "1.5rem"); // 24px
typeRampPlus4FontSize.setValueFor(app, "1.75rem"); // 28px
typeRampPlus5FontSize.setValueFor(app, "2rem"); // 32px
typeRampPlus6FontSize.setValueFor(app, "2.5rem"); // 40px

typeRampMinus2LineHeight.setValueFor(app, "0.875rem"); // 14px
typeRampMinus1LineHeight.setValueFor(app, "1rem"); // 16px
typeRampBaseLineHeight.setValueFor(app, "1.25rem"); // 20px
typeRampPlus1LineHeight.setValueFor(app, "1.375rem"); // 22px
typeRampPlus2LineHeight.setValueFor(app, "1.625rem"); // 26px
typeRampPlus3LineHeight.setValueFor(app, "2rem"); // 32px
typeRampPlus4LineHeight.setValueFor(app, "2.25rem"); // 36px
typeRampPlus5LineHeight.setValueFor(app, "2.5rem"); // 40px
typeRampPlus6LineHeight.setValueFor(app, "3.25rem"); // 52px

/**
 * Colours
 */
accentBaseColor.setValueFor(app, SwatchRGB.from(parseColorHexRGB("#0078D4")));

DesignToken.create("danger").setValueFor(app, "#c50f1f");
DesignToken.create("success").setValueFor(app, "#107c10");
DesignToken.create("warning").setValueFor(app, "#bc4b09");

const sidebarNavBackgroundHover = DesignToken.create(
  "sidebar-nav-background-hover",
);
const sidebarNavBackgroundActive = DesignToken.create(
  "sidebar-nav-background-active",
);

/**
 * Apply the dark/light theme
 * @param {boolean} isDark set the dark theme if true
 */
function setTheme(isDark) {
  if (isDark) {
    baseLayerLuminance.setValueFor(app, StandardLuminance.DarkMode);

    sidebarNavBackgroundHover.setValueFor(app, "#2D2D2D");
    sidebarNavBackgroundActive.setValueFor(app, "#292929");
  } else {
    baseLayerLuminance.setValueFor(app, StandardLuminance.LightMode);

    sidebarNavBackgroundHover.setValueFor(app, "#EAEAEA");
    sidebarNavBackgroundActive.setValueFor(app, "#EDEDED");
  }
}

/**
 * Set Dark/Light mode and watch for changes
 */
setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => setTheme(e.matches));
