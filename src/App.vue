<script setup lang="ts">
// @ts-ignore
import { useStore } from "vuex";
import Main from "./components/Main.vue";

const store = useStore();
store.dispatch("get");
</script>

<template>
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
