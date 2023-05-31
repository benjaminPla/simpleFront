<script setup lang="ts">
import Header from "./components/Header.vue";
import SideMenu from "./components/SideMenu.vue";
import Main from "./components/Main.vue";
</script>

<template>
  <Header />
  <div class="mainContainer">
    <SideMenu />
    <Main />
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  flex-direction: row;
}
</style>
