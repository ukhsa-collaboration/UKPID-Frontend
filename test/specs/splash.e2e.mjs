import i18n from "../../src/renderer/modules/i18n.mjs";

const { t } = i18n.global;

describe("Splash Screen", () => {
  it("should display the app name", async () => {
    await expect($("h1")).toHaveText(t("UK Poisons Information Database"));
  });
});
