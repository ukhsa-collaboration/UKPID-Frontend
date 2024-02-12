<template>
  <nav class="SidebarNavigation">
    <div class="Top">
      <SidebarNavigationItem route="dashboard"
        ><DashboardIcon
      /></SidebarNavigationItem>
      <SidebarNavigationItem route="enquiries"
        ><EnquiryIcon
      /></SidebarNavigationItem>
      <SidebarNavigationItem route="reports"
        ><ReportIcon
      /></SidebarNavigationItem>
      <SidebarNavigationItem route="alerts"
        ><AlertIcon
      /></SidebarNavigationItem>
      <SidebarNavigationItem route="audit"><AuditIcon /></SidebarNavigationItem>
    </div>
    <div class="Bottom">
      <SidebarNavigationItem route="admin"><AdminIcon /></SidebarNavigationItem>
      <SidebarNavigationItem route="settings" :spin="true"
        ><SettingsIcon
      /></SidebarNavigationItem>
    </div>
  </nav>
</template>

<script setup>
import SidebarNavigationItem from "@/components/SidebarNavigation/SidebarNavigationItem.vue";
import DashboardIcon from "@fluentui/svg-icons/icons/home_20_regular.svg";
import EnquiryIcon from "@fluentui/svg-icons/icons/document_multiple_20_regular.svg";
import ReportIcon from "@fluentui/svg-icons/icons/data_pie_20_regular.svg";
import AlertIcon from "@fluentui/svg-icons/icons/alert_20_regular.svg";
import AuditIcon from "@fluentui/svg-icons/icons/text_grammar_checkmark_20_regular.svg";
import AdminIcon from "@fluentui/svg-icons/icons/text_bullet_list_square_shield_20_regular.svg";
import SettingsIcon from "@fluentui/svg-icons/icons/settings_20_regular.svg";
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.SidebarNavigation {
  background-color: var(--neutral-layer-2);
  width: min(4.25rem, 99px);
  height: calc(100% + #{fns.gap(0.25)});
  margin-top: calc(-1 * #{fns.gap(0.25)});
  margin-right: -1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.Top {
  overflow: auto;
}
</style>
