import SettingsScreen from "./SettingsScreen.mjs";

class AccountScreen extends SettingsScreen {
  async navigateTo() {
    await this.settingsButton.waitForClickable();
    await this.settingsButton.click();

    await this.accountButton.waitForClickable();
    await this.accountButton.click();
  }

  get logOutButton() {
    return $(`fluent-button=${this.t("Log out")}`);
  }

  get loggedInUser() {
    return $('span[data-testid="loggedInUser"]');
  }

  get loggedInEmail() {
    return $('span[data-testid="loggedInEmail"]');
  }
}

export default new AccountScreen();
