<template>
  <MainWindowPage class="ReportPage">
    <iframe class="ReportFrame" :src="reportUrl"> </iframe>
  </MainWindowPage>
</template>

<script setup>
import MainWindowPage from "@/components/MainWindowPage.vue";

const reportUrl = import.meta.env.UKPID_REPORT_URL;
</script>

<style lang="scss" scoped>
.ReportPage {
  padding: 0;
}

.ReportFrame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
