<template>
  <StatusIndicator class="TitleBarStatus" :status="status">
    {{ states[status] }}
  </StatusIndicator>
</template>

<script setup>
import StatusIndicator from "@/components/StatusIndicator.vue";
import { ref } from "vue";

const states = {
  success: "Connected",
  pending: "Connecting",
  fail: "Disconnected",
};

const status = ref("fail");

// setInterval(() => {
//   const keys = Object.keys(states);
//   status.value = keys[Math.floor(Math.random() * keys.length)];
// }, 5000);
</script>
