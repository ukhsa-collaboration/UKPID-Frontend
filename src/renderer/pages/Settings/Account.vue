<template>
  <ContentFrame>
    <template #header>
      <h2 class="Title2">{{ $t("Account") }}</h2>
    </template>
    <template #body>
      <div class="SettingsPage">
        <FluentMessageBar v-if="logoutDisabled" intent="warning">
          <template #title>{{ $t("You are offline") }}</template>
          <template #message>{{
            $t(
              "To preserve data, logging out is disabled while the application is offline.",
            )
          }}</template></FluentMessageBar
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
          <FluentButton :disabled="logoutDisabled" @click="logout">{{
            $t("Log out")
          }}</FluentButton>
        </div>
      </div>
    </template>
  </ContentFrame>
</template>

<script setup>
import { computed } from "vue";
import ContentFrame from "@/components/navigation-view/ContentFrame.vue";
import { useUserStore } from "@/stores/user";
import UserAvatar from "@/components/UserAvatar.vue";
import FluentButton from "@/components/FluentButton.vue";
import FluentMessageBar from "@/components/FluentMessageBar.vue";
import { useConnectionStore } from "@/stores/connection";

const userStore = useUserStore();
const connection = useConnectionStore();

const logout = () => {
  window.application.logout();
};

const logoutDisabled = computed(() => connection.status !== "connected");
</script>

<style lang="scss">
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
  gap: fns.gap(1);
  align-items: center;
}

.UserInfo {
  @extend %no-child-margins;

  display: flex;
  flex-direction: column;
}
</style>
