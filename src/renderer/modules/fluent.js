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
  accentBaseColor,
  SwatchRGB,
  provideFluentDesignSystem,
  fluentTextField,
  fluentButton,
  fluentCard,
  fluentProgressRing,
  fluentMenu,
  fluentMenuItem,
  fluentDivider,
} from "@fluentui/web-components";

import { parseColorHexRGB } from "@microsoft/fast-colors";
import { DesignToken } from "@microsoft/fast-foundation";

provideFluentDesignSystem().register(
  fluentTextField(),
  fluentButton(),
  fluentCard(),
  fluentProgressRing(),
  fluentMenu(),
  fluentMenuItem(),
  fluentDivider(),
);

/**
 * Global App styles
 */
const root = document.body;

typeRampMinus2FontSize.setValueFor(root, "0.625rem"); // 10px - Caption 2
typeRampMinus1FontSize.setValueFor(root, "0.75rem"); // 12px - Caption 1
typeRampBaseFontSize.setValueFor(root, "0.85rem"); // 14px - Body
typeRampPlus1FontSize.setValueFor(root, "1rem"); // 16px - Subtitle 2
typeRampPlus2FontSize.setValueFor(root, "1.25rem"); // 20px - Subtitle 1
typeRampPlus3FontSize.setValueFor(root, "1.5rem"); // 24px - Title 3
typeRampPlus4FontSize.setValueFor(root, "1.75rem"); // 28px - Title 2
typeRampPlus5FontSize.setValueFor(root, "2rem"); // 32px - Title 1
typeRampPlus6FontSize.setValueFor(root, "2.5rem"); // 40px - Title Large

typeRampMinus2LineHeight.setValueFor(root, "0.875rem"); // 14px - Caption 2
typeRampMinus1LineHeight.setValueFor(root, "1rem"); // 16px - Caption 1
typeRampBaseLineHeight.setValueFor(root, "1.25rem"); // 20px - Body
typeRampPlus1LineHeight.setValueFor(root, "1.375rem"); // 22px - Subtitle 2
typeRampPlus2LineHeight.setValueFor(root, "1.625rem"); // 26px - Subtitle 1
typeRampPlus3LineHeight.setValueFor(root, "2rem"); // 32px - Title 3
typeRampPlus4LineHeight.setValueFor(root, "2.25rem"); // 36px - Title 2
typeRampPlus5LineHeight.setValueFor(root, "2.5rem"); // 40px - Title 1
typeRampPlus6LineHeight.setValueFor(root, "3.25rem"); // 52px - Title Large

/**
 * Colours
 */
const sidebarNavBackgroundHover = DesignToken.create(
  "sidebar-nav-background-hover",
);
const sidebarNavBackgroundActive = DesignToken.create(
  "sidebar-nav-background-active",
);

const navViewNavItemBackgroundHover = DesignToken.create(
  "nav-view-nav-item-background-hover",
);
const navViewNavItemBackgroundActive = DesignToken.create(
  "nav-view-nav-item-background-active",
);

const colorStatusDangerForeground = DesignToken.create(
  "color-status-danger-foreground",
);
const colorStatusDangerBorder = DesignToken.create(
  "color-status-danger-border",
);
const colorStatusDangerBackground = DesignToken.create(
  "color-status-danger-background",
);

const colorStatusWarningForeground = DesignToken.create(
  "color-status-warning-foreground",
);
const colorStatusWarningBorder = DesignToken.create(
  "color-status-warning-border",
);
const colorStatusWarningBackground = DesignToken.create(
  "color-status-warning-background",
);

const colorStatusSuccessForeground = DesignToken.create(
  "color-status-success-foreground",
);
const colorStatusSuccessBorder = DesignToken.create(
  "color-status-success-border",
);
const colorStatusSuccessBackground = DesignToken.create(
  "color-status-success-background",
);

/**
 * Fonts
 */
DesignToken.create("font-weight-normal").setValueFor(root, "400");
DesignToken.create("font-weight-semibold").setValueFor(root, "600");
DesignToken.create("font-weight-bold").setValueFor(root, "700");

/**
 * Apply the theme
 * @param {HTMLElement} target the element to apply the theme to
 * @param {boolean} isDark set the dark theme if true
 */
export const setTheme = (target, isDark) => {
  accentBaseColor.setValueFor(
    target,
    SwatchRGB.from(parseColorHexRGB("#117AD1")),
  );

  if (isDark) {
    baseLayerLuminance.setValueFor(target, StandardLuminance.DarkMode);

    sidebarNavBackgroundHover.setValueFor(target, "#2D2D2D");
    sidebarNavBackgroundActive.setValueFor(target, "#292929");

    navViewNavItemBackgroundHover.setValueFor(target, "#373737");
    navViewNavItemBackgroundActive.setValueFor(target, "#333333");

    colorStatusDangerForeground.setValueFor(root, "#dc626d");
    colorStatusDangerBorder.setValueFor(root, "#c50f1f");
    colorStatusDangerBackground.setValueFor(root, "#3b0509");

    colorStatusWarningForeground.setValueFor(root, "#f98845");
    colorStatusWarningBorder.setValueFor(root, "#f7630c");
    colorStatusWarningBackground.setValueFor(root, "#4a1e04");

    colorStatusSuccessForeground.setValueFor(root, "#54b054");
    colorStatusSuccessBorder.setValueFor(root, "#107c10");
    colorStatusSuccessBackground.setValueFor(root, "#052505");
  } else {
    baseLayerLuminance.setValueFor(target, StandardLuminance.LightMode);

    sidebarNavBackgroundHover.setValueFor(target, "#EAEAEA");
    sidebarNavBackgroundActive.setValueFor(target, "#EDEDED");

    navViewNavItemBackgroundHover.setValueFor(target, "#EEEEEE");
    navViewNavItemBackgroundActive.setValueFor(target, "#F1F1F1");

    colorStatusDangerForeground.setValueFor(root, "#b10e1c");
    colorStatusDangerBorder.setValueFor(root, "#eeacb2");
    colorStatusDangerBackground.setValueFor(root, "#fdf3f4");

    colorStatusWarningForeground.setValueFor(root, "#bc4b09");
    colorStatusWarningBorder.setValueFor(root, "#fdcfb4");
    colorStatusWarningBackground.setValueFor(root, "#fff9f5");

    colorStatusSuccessForeground.setValueFor(root, "#0e700e");
    colorStatusSuccessBorder.setValueFor(root, "#9fd89f");
    colorStatusSuccessBackground.setValueFor(root, "#f1faf1");
  }
};

/**
 * Set Dark/Light mode and watch for changes
 */
setTheme(root, window.matchMedia("(prefers-color-scheme: dark)").matches);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => setTheme(root, e.matches));
