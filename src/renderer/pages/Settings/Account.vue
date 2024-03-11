<template>
  <ContentFrame>
    <template #header>
      <ContentTitle>{{ $t("Account") }}</ContentTitle>
    </template>
    <template #body>
      <div class="SettingsPage">
        <UkpidMessageBar v-if="logoutDisabled" intent="warning">
          <template #title>{{ $t("You are offline") }}</template>
          <template #message>{{
            $t(
              "To preserve data, logging out is disabled while the application is offline.",
            )
          }}</template></UkpidMessageBar
        >
        <div class="CurrentUser">
          <UserAvatar :size="64" />
          <div class="UserInfo">
            <span class="Subtitle1" data-testid="loggedInUser">{{
              userStore.name
            }}</span>
            <span data-testid="loggedInEmail">{{ userStore.email }}</span>
            <span>{{ userStore.role[0] }}</span>
          </div>
          <UkpidButton :disabled="logoutDisabled" @click="logout">{{
            $t("Log out")
          }}</UkpidButton>
        </div>
      </div>
    </template>
  </ContentFrame>
</template>

<script setup>
import { computed } from "vue";
import ContentFrame from "@/components/NavigationView/ContentFrame.vue";
import { useUserStore } from "@/stores/user";
import UserAvatar from "@/components/UserAvatar.vue";
import UkpidButton from "@/components/UkpidButton.vue";
import UkpidMessageBar from "@/components/UkpidMessageBar.vue";
import { useConnectionStore } from "@/stores/connection";
import ContentTitle from "@/components/NavigationView/ContentTitle.vue";

const userStore = useUserStore();
const connection = useConnectionStore();

const logout = () => {
  window.application.logout();
};

const logoutDisabled = computed(() => connection.status !== "connected");
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.SettingsPage {
  display: flex;
  flex-direction: column;
  gap: fns.gap(1);
}

.CurrentUser {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  gap: fns.gap(1);
}

.UserInfo {
  @extend %no-child-margins;

  display: flex;
  flex-direction: column;
}
</style>
