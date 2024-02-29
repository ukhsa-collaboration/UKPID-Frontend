import SettingsScreen from "./SettingsScreen.mjs";

class AuditScreen extends SettingsScreen {
  async navigateTo() {
    await this.settingsButton.waitForClickable();
    await this.settingsButton.click();

    await this.auditButton.waitForClickable();
    await this.auditButton.click();
  }

  get appSplitSwitch() {
    return (async () => {
      const label = await $(
        `p=${this.t("Split field changes into individual rows")}`,
      );
      const labelId = await label.getAttribute("id");

      return await $(`fluent-switch[aria-labelledby=${labelId}]`);
    })();
  }
}

export default new AuditScreen();
