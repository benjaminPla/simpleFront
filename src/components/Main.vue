<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const data = computed(() => store.state.data);
</script>

<template>
  <ul>
    <li v-for="item in data" :key="item._id">
      <span>{{ item._id }}</span>
      <span>{{ item.name }}</span>
      <span>{{ item.age }}</span>
    </li>
  </ul>
</template>

<style scoped></style>
