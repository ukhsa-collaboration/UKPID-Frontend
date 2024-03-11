<template>
  <div class="Offline">
    <OfflineIcon class="Icon" />
    <h1 class="Title2">{{ $t("You are offline") }}</h1>
    <p>
      {{ $t("Unable to connect to the UKPID server.") }}
    </p>
  </div>
</template>

<script setup>
import OfflineIcon from "@fluentui/svg-icons/icons/cloud_off_48_regular.svg";
</script>

<style lang="scss" scoped>
.Offline {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
}

.Icon {
  fill: currentColor;
}
</style>
