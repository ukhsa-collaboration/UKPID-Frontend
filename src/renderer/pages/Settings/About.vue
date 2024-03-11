<template>
  <ContentFrame>
    <template #header>
      <ContentTitle>{{ $t("About") }}</ContentTitle>
    </template>
    <template #body>
      <div class="AppInfo">
        <Logo class="AppIcon" />
        <p>
          {{ $t("UK Poisons Information Database") }}
          <br />
          <span class="Caption1">{{ $t("Built by Juicy Media") }}</span>
          <br />
          <span class="Caption1">{{
            $t("Version {version}", { version: "0.0.0" })
          }}</span>
        </p>
      </div>
      <section class="Credits">
        <h3 class="Subtitle1">{{ $t("Credits") }}</h3>
        <p>
          {{
            $t("UKPID is made possible thanks to these packages and libraries:")
          }}
        </p>
      </section>
    </template>
  </ContentFrame>
</template>

<script setup>
import ContentFrame from "@/components/NavigationView/ContentFrame.vue";
import Logo from "@/assets/UKPIDLogoColour.svg";
import ContentTitle from "@/components/NavigationView/ContentTitle.vue";
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.AppInfo {
  @extend %no-child-margins;

  display: flex;
  align-items: center;
  gap: fns.gap(1);
}

.AppIcon {
  height: 48px;
}

.Credits {
  @extend %clean-child-margins;
}
</style>
