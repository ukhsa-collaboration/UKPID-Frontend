<template>
  <ContentFrame :body-grid="false">
    <template #header>
      <ContentTitle>{{ $t("Landing") }}</ContentTitle>
    </template>
    <template #body> Hello </template>
  </ContentFrame>
</template>

<script setup>
import ContentFrame from "@/components/NavigationView/ContentFrame.vue";
import ContentTitle from "@/components/NavigationView/ContentTitle.vue";
</script>
