import SettingsScreen from "./SettingsScreen.mjs";

class AppearanceScreen extends SettingsScreen {
  async navigateTo() {
    await this.settingsButton.waitForClickable();
    await this.settingsButton.click();

    await this.appearanceButton.waitForClickable();
    await this.appearanceButton.click();
  }

  get appThemeSelect() {
    return (async () => {
      const label = await $(`p=${this.t("Application theme")}`);
      const labelId = await label.getAttribute("id");

      return await $(`fluent-select[aria-labelledby=${labelId}]`);
    })();
  }

  get textSizeLabel() {
    return (async () => await $(`p=${this.t("Text size")}`))();
  }

  get textSizeSlider() {
    return (async () => {
      const label = await this.textSizeLabel;
      const labelId = await label.getAttribute("id");

      return await $(`fluent-slider[aria-labelledby=${labelId}]`);
    })();
  }

  get textSizeSliderThumb() {
    return (async () => (await this.textSizeSlider).$(">>>.thumb-cursor"))();
  }

  get textSizeApply() {
    return $(`fluent-button[data-testid="text-size-apply"]`);
  }
}

export default new AppearanceScreen();
