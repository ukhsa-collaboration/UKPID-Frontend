<template>
  <div class="ukpid-logo">UK Poisons Information Database</div>

  <h1>Welcome</h1>

  <UkpidButton appearance="accent" @click="hello">Hello!</UkpidButton>

  <p id="msg">{{ msg }}</p>
</template>

<script setup>
import UkpidButton from "./components/UkpidButton.vue";
import { ref } from "vue";

const msg = ref("Say hello");

function hello() {
  msg.value = "Hello there!";
}
</script>
