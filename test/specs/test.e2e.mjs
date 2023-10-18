import { browser } from "@wdio/globals";

describe("Electron Testing", () => {
  it("should print application metadata", async () => {
    const appName = await browser.electron.app("getName");
    const appVersion = await browser.electron.app("getVersion");
    console.log("Testing Electron app:", appName, appVersion);
  });

  // it("tests test", async () => {
  //   const msg = await $("#msg");
  //
  //   await expect(msg).toHaveText("Say hello");
  //   await browser.pause(1000);
  //   await browser.$("fluent-button=Hello!").click();
  //   await expect(msg).toHaveText("Hello there!");
  //   await browser.pause(1000);
  // });
});
