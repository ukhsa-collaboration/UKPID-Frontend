import { createI18n } from "vue-i18n";

export const i18nStrings = {
  en_GB: {
    routes: {
      dashboard: { _: "Dashboard" },
      enquiries: { _: "Enquiries" },
      reports: { _: "Reports" },
      alerts: { _: "Alerts" },
      audit: { _: "Audit" },
      admin: { _: "Admin" },
      settings: {
        _: "Settings",
        general: "General",
        account: "Account",
        notifications: "Notifications",
        appearance: "Appearance",
        about: "About",
      },
    },
    "UK Poisons Information Database": "UK Poisons Information Database",
    "Log in": "Log in",
    "Continue offline as {user}": "Continue offline as {user}",
    "Logged in as {user}": "Logged in as {user}",
    "Log out": "Log out",
    "Version {version}": "Version {version}",
    "Select a {0} to use this feature.": "Select a {0} to use this feature.",
    "{zoom}%": "{zoom}%",
  },
};

export const i18n = createI18n({
  locale: "en_GB",
  fallbackLocale: "en_GB",
  messages: i18nStrings,
  legacy: false,
  missingWarn: false,
  fallbackWarn: false,
});

export default i18n;
