<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const items = ref(["get", "post", "put", "delete"]);
const data = ref({});

const request = async (element) => {
  switch (element.target.textContent) {
    case "get":
      store.dispatch("get");
      break;
    case "post":
      data.value = await fetch("http://localhost:3000/post");
      break;
    case "put":
      data.value = await fetch("http://localhost:3000/put");
      break;
    case "delete":
      data.value = await fetch("http://localhost:3000/delete");
      break;
  }
};
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item">
      <button @click="request">{{ item }}</button>
    </li>
  </ul>
  <ul>
    <li v-for="item in data" :key="item._id">{{ item }}</li>
  </ul>
</template>

<style scoped></style>
