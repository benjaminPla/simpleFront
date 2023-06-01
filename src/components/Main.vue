<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const activeRow = ref("");
const data = computed(() => store.state.data);
const isPutActive = ref(false);
const handleDeleteBtn = (item) => store.dispatch("delete", item._id);
const handlePutBtn = (item) => {
  const { _id, name, age } = item;
  activeRow.value = activeRow.value === _id ? "" : _id;
  isPutActive.value = !isPutActive.value;
};
const handlePutSaveBtn = (item) => {
  const { _id, name, age } = item;
  activeRow.value = "";
  isPutActive.value = !isPutActive.value;
  store.dispatch("put", { _id, name, age });
};
</script>

<template>
  <div class="container">
    <table v-if="data.length > 0" class="table">
      <thead>
        <tr>
          <th>_ID</th>
          <th>NAME</th>
          <th>AGE</th>
          <th>PUT</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>
            <span>{{ item._id }}</span>
          </td>
          <td>
            <span v-if="activeRow !== item._id">{{ item.name }}</span>
            <input v-if="activeRow === item._id" v-model="item.name" />
          </td>
          <td>
            <span v-if="activeRow !== item._id">{{ item.age }}</span>
            <input v-if="activeRow === item._id" v-model="item.age" />
          </td>
          <td>
            <button v-if="activeRow !== item._id" @click="handlePutBtn(item)">
              put
            </button>
            <button
              v-if="activeRow === item._id && isPutActive"
              @click="handlePutSaveBtn(item)"
            >
              save
            </button>
          </td>
          <td><button @click="handleDeleteBtn(item)">delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-width: 800px;
}

.table {
  border-collapse: collapse;
}

.table th,
.table td {
  text-align: left;
  padding: 5px 30px;
}

.table th,
tr:nth-child(even) {
  background-color: #1f1f1f;
}
</style>
