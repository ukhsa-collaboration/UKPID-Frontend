<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const tips = `Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), Electron
    (v${versions.electron()})`;

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <p class="read-the-docs">
    {{ tips }}
  </p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
