import i18n from "../../src/renderer/modules/i18n.mjs";
import { switchToWindowByUrlPart } from "../helpers.mjs";

export default class MainWindowScreen {
  t = i18n.global.t;

  async switchToMainWindow() {
    return await browser.waitUntil(
      async () => await switchToWindowByUrlPart("/main_window/index.html"),
      {
        timeout: 5000,
        interval: 500,
        timeoutMsg: "Expected the main window to open",
      },
    );
  }

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

export const MainScreen = new MainWindowScreen();
