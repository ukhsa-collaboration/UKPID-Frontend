import { logIntoTheApplication, logOut, screenshot } from "../helpers.mjs";
import UserAuditScreen from "../screens/audit/UserAuditScreen.mjs";
import i18n from "../../src/renderer/modules/i18n.mjs";

const { t } = i18n.global;

describe("Audit", () => {
  before(logIntoTheApplication);

  it("should navigate to the users audit page", async () => {
    await UserAuditScreen.switchToMainWindow();

    await UserAuditScreen.navigateTo();

    await expect($("h1")).toHaveText(t("Audit logs"));
    await expect($("h2")).toHaveText(t("Users"));

    await screenshot("audit_users");

    // const madeByFilter = await UserAuditScreen.madeByFilterField;
    // await madeByFilter.$(">>>input").setValue("test");
  });

  it("should display a message when offline", async () => {
    await browser.execute(() => {
      window.network.disconnect();
    });

    await expect($("h1")).toHaveText(t("You are offline"));

    await browser.execute(() => {
      window.network.connect();
    });

    await expect($("h1")).toHaveText(t("Audit logs"));
  });

  it("should only be accessible to administrators", async () => {
    // log in as manager
    await logOut();
    await logIntoTheApplication("manager@cardiff.com");

    await UserAuditScreen.switchToMainWindow();
    await UserAuditScreen.auditButton.waitForExist({ reverse: true });

    // log in as user
    await logOut();
    await logIntoTheApplication("user@cardiff.com");

    await UserAuditScreen.switchToMainWindow();
    await UserAuditScreen.auditButton.waitForExist({ reverse: true });
  });
});
