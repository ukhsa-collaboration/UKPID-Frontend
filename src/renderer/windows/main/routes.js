import dashboard from "@/modules/routes/main/dashboard";
import enquiry from "@/modules/routes/main/enquiry";
import reports from "@/modules/routes/main/reports";
import alerts from "@/modules/routes/main/alerts";
import audit from "@/modules/routes/main/audit";
import admin from "@/modules/routes/main/admin";
import settings from "@/modules/routes/main/settings";

import popoutEnquiry from "@/modules/routes/popout/enquiry";

export default [dashboard, enquiry, reports, alerts, audit, admin, settings];

export const popoutWindowRoutes = [popoutEnquiry];
