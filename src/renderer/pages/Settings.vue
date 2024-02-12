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
    </template>
    <template #navigation-items-bottom>
      <NavigationItem route="settings.about"><AboutIcon /></NavigationItem>
    </template>
  </NavigationView>
</template>

<script setup>
import NavigationItem from "@/components/NavigationView/NavigationItem.vue";
import GeneralIcon from "@fluentui/svg-icons/icons/app_generic_20_regular.svg";
import AccountIcon from "@fluentui/svg-icons/icons/person_accounts_20_regular.svg";
import NotificationIcon from "@fluentui/svg-icons/icons/badge_20_regular.svg";
import AppearanceIcon from "@fluentui/svg-icons/icons/paint_brush_20_regular.svg";
import AboutIcon from "@fluentui/svg-icons/icons/info_20_regular.svg";
import NavigationView from "@/components/NavigationView/NavigationView.vue";
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.Page {
  padding-right: 0;
  padding-bottom: 0;
}

.NavigationView {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-areas:
    "navigation-header content-header"
    "navigation-frame content-body";
  grid-template-columns: 200px 1fr;
  grid-template-rows: max-content 1fr;
  gap: fns.gap(1) var(--page-gap);
}

.NavigationHeader {
  @extend %clean-child-margins;

  grid-area: navigation-header;
}

.NavigationFrame {
  @extend %clean-child-margins;

  grid-area: navigation-frame;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: var(--page-gap);
}

.NavigationItems {
  display: flex;
  flex-direction: column;
  gap: fns.gap(0.25);
}
</style>
