import MainWindowPage from "../MainWindowPage.mjs";

export default class SettingsPage extends MainWindowPage {
  get generalButton() {
    return $(`a=${this.t("routes.settings.general")}`);
  }
  get accountButton() {
    return $(`a=${this.t("routes.settings.account")}`);
  }
  get notificationsButton() {
    return $(`a=${this.t("routes.settings.notifications")}`);
  }
  get appearanceButton() {
    return $(`a=${this.t("routes.settings.appearance")}`);
  }
  get aboutButton() {
    return $(`a=${this.t("routes.settings.about")}`);
  }
}
