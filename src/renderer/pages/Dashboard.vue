<template>
  <MainWindowPage>
    <h1>{{ $t("Dashboard") }}</h1>
    <AppButton appearance="accent" @click="hello">Hello!</AppButton>

    <p id="msg">{{ msg }}</p>

    <p>
      Lorem ipsum
      <router-link :to="{ name: 'enquiries' }">dolor alet</router-link> dsfsdfds
    </p>
  </MainWindowPage>
</template>

<script setup>
import MainWindowPage from "@/components/MainWindowPage.vue";
import { ref } from "vue";
import AppButton from "@/components/AppButton.vue";

const msg = ref("Say hello");

function hello() {
  msg.value = "Hello there!";
}
</script>

<style lang="scss">
// tbc
</style>
