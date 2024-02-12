import i18n from "../../src/renderer/modules/i18n.mjs";

export default class MainWindowPage {
  t = i18n.global.t;

  get appElement() {
    return $("#app");
  }

  get dashboardButton() {
    return $(`a=${this.t("routes.dashboard._")}`);
  }
  get enquiriesButton() {
    return $(`a=${this.t("routes.enquiries._")}`);
  }
  get reportsButton() {
    return $(`a=${this.t("routes.reports._")}`);
  }
  get alertsButton() {
    return $(`a=${this.t("routes.alerts._")}`);
  }
  get auditButton() {
    return $(`a=${this.t("routes.audit._")}`);
  }

  get adminButton() {
    return $(`a=${this.t("routes.admin._")}`);
  }

  get settingsButton() {
    return $(`a=${this.t("routes.settings._")}`);
  }
}
