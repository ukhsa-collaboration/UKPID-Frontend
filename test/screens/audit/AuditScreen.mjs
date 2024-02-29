import MainWindowScreen from "../MainWindowScreen.mjs";

export default class AuditScreen extends MainWindowScreen {
  get enquiriesButton() {
    return $(`a=${this.t("routes.audit.enquiries")}`);
  }
  get usersButton() {
    return $(`a=${this.t("routes.audit.users")}`);
  }

  get madeByFilterField() {
    return $(`fluent-text-field=${this.t("Made by")}`);
  }
}
