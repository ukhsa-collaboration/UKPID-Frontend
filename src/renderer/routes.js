import Dashboard from "@/pages/Dashboard.vue";
import Enquiries from "@/pages/Enquiries.vue";
import Reports from "@/pages/Reports.vue";
import Alerts from "@/pages/Alerts.vue";
import Audit from "@/pages/Audit.vue";
import Admin from "@/pages/Admin.vue";
import Settings from "@/pages/Settings.vue";

export const routes = [
  { path: "/", name: "dashboard", component: Dashboard },
  { path: "/enquiries", name: "enquiries", component: Enquiries },
  { path: "/reports", name: "reports", component: Reports },
  { path: "/alerts", name: "alerts", component: Alerts },
  { path: "/audit", name: "audit", component: Audit },
  { path: "/admin", name: "admin", component: Admin },
  { path: "/settings", name: "settings", component: Settings },
];
