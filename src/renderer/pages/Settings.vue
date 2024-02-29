<template>
  <NavigationView>
    <template #navigation-title>{{ $t("Settings") }}</template>
    <template #navigation-items-top>
      <NavigationItem route="settings" label-trans-key="routes.settings.general"
        ><GeneralIcon
      /></NavigationItem>
      <NavigationItem route="settings.account"><AccountIcon /></NavigationItem>
      <NavigationItem route="settings.notifications"
        ><NotificationIcon
      /></NavigationItem>
      <NavigationItem route="settings.appearance"
        ><AppearanceIcon
      /></NavigationItem>
      <NavigationDivider />
      <NavigationItem v-if="can('audit.read')" route="settings.audit"
        ><AuditIcon
      /></NavigationItem>
    </template>
    <template #navigation-items-bottom>
      <NavigationItem route="settings.about"><AboutIcon /></NavigationItem>
    </template>
  </NavigationView>
</template>

<script setup>
import { useUserCan } from "@/composables/userCan";
import NavigationItem from "@/components/NavigationView/NavigationItem.vue";
import NavigationView from "@/components/NavigationView/NavigationView.vue";
import GeneralIcon from "@fluentui/svg-icons/icons/app_generic_20_regular.svg";
import AccountIcon from "@fluentui/svg-icons/icons/person_accounts_20_regular.svg";
import NotificationIcon from "@fluentui/svg-icons/icons/badge_20_regular.svg";
import AppearanceIcon from "@fluentui/svg-icons/icons/paint_brush_20_regular.svg";
import AboutIcon from "@fluentui/svg-icons/icons/info_20_regular.svg";
import AuditIcon from "@fluentui/svg-icons/icons/text_grammar_checkmark_20_regular.svg";
import NavigationDivider from "@/components/NavigationView/NavigationDivider.vue";

const { can } = useUserCan();
</script>
