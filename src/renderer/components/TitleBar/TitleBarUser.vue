<template>
  <FluentMenu
    class="TitleBarUser"
    :button-label="$t('Account Manager and more')"
  >
    <template #button>
      <div class="User">
        <UserAvatar class="Avatar" />
      </div>
    </template>
    <template #menu>
      <MenuItemInfo>{{
        $t("Logged in as {user}", { user: userStore.name })
      }}</MenuItemInfo>
      <fluent-divider></fluent-divider>
      <FluentMenuItem
        ref="logoutRef"
        :disabled="logoutDisabled"
        aria-describedby="logout-tooltip"
        @change="logout"
        @mouseover="showTooltip"
        @mouseleave="hideTooltip"
        @focusin="showTooltip"
        @focusout="hideTooltip"
        >{{ $t("Log out") }}</FluentMenuItem
      >
      <FluentTooltip
        v-show="tooltipVisible && logoutDisabled"
        id="logout-tooltip"
        ref="tooltip"
        :style="floatingStyles"
        >{{
          $t(
            "To preserve data, logging out is disabled while the application is offline.",
          )
        }}</FluentTooltip
      >
    </template>
  </FluentMenu>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useTooltip } from "@/composables/tooltip";
import { useConnectionStore } from "@/stores/connection";
import FluentMenu from "@/components/Menu/FluentMenu.vue";
import FluentMenuItem from "@/components/Menu/FluentMenuItem.vue";
import MenuItemInfo from "@/components/Menu/MenuItemInfo.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import FluentTooltip from "@/components/FluentTooltip.vue";

const userStore = useUserStore();
const connection = useConnectionStore();

const logoutRef = ref(null);
const tooltip = ref(null);

const { tooltipVisible, showTooltip, hideTooltip, floatingStyles, placement } =
  useTooltip(logoutRef, tooltip);
const logout = () => {
  window.application.logout();
};

const logoutDisabled = computed(() => connection.status !== "connected");
</script>

<style lang="scss" scoped>
.TitleBarUser {
  -webkit-app-region: no-drag;
}

.User {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style>
