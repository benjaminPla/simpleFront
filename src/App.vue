<script setup lang="ts">
import { useStore } from "vuex";
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";

const store = useStore();
store.dispatch("get");
</script>

<template>
  <Header />
  <div class="mainContainer">
    <Main />
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  flex-direction: row;
}
</style>
