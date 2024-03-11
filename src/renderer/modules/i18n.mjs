import { createI18n } from "vue-i18n";

export const i18nStrings = {
  en_GB: {
    routes: {
      dashboard: { _: "Dashboard" },
      enquiry: { _: "Enquiries" },
      reports: { _: "Reports" },
      alerts: { _: "Alerts" },
      audit: { _: "Audit", enquiries: "Enquiries", users: "Users" },
      admin: { _: "Admin" },
      settings: {
        _: "Settings",
        general: "General",
        account: "Account",
        notifications: "Notifications",
        appearance: "Appearance",
        audit: "Audit",
        about: "About",
      },
    },
    "location.CARDIFF": "Cardiff",
    "location.NEWCASTLE": "Newcastle",
    "location.BIRMINGHAM": "Birmingham",
    "location.EDINBURGH": "Edinburgh",
    "audit.event.created": "Created",
    "audit.event.updated": "Updated",
    "audit.event.deleted": "Deleted",
    "audit.event.restored": "Restored",
    "user.field.id": "ID",
    "user.field.name": "Name",
    "user.field.email": "Email",
    "user.field.location": "Location",
    "user.field.password": "Password",
    "user.field.role": "Role",
    "user.field.created_at": "Created at",
    "user.field.updated_at": "Updated at",
  },
};

export const i18n = createI18n({
  locale: "en_GB",
  fallbackLocale: "en_GB",
  messages: i18nStrings,
  legacy: false,
  missingWarn: false,
  fallbackWarn: false,
  fallbackFormat: true,
});

export default i18n;
