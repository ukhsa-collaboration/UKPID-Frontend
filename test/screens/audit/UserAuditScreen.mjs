import AuditScreen from "./AuditScreen.mjs";

class UserAuditScreen extends AuditScreen {
  async navigateTo() {
    await this.auditButton.waitForClickable();
    await this.auditButton.click();

    await this.usersButton.waitForClickable();
    await this.usersButton.click();
  }
}

export default new UserAuditScreen();
