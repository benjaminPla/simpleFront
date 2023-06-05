<script setup lang="ts">
// @ts-ignore
import { useStore } from "vuex";
import { computed, ref, Ref } from "vue";

interface IItem {
  _id?: string;
  name?: string;
  age?: string | number;
}

const store = useStore();
const activeRow: Ref<string | undefined> = ref("");
const data = computed(() => store.state.data);
const postName = ref("");
const postAge: Ref<string | number | null> = ref(null);
const isPostActive = ref(false);
const isPutActive = ref(false);
const handleDeleteBtn = (item: IItem) => store.dispatch("delete", item._id);
const handlePutBtn = (item: IItem) => {
  const { _id } = item;
  activeRow.value = activeRow.value === _id ? "" : _id;
  isPutActive.value = !isPutActive.value;
};
const handlePutSaveBtn = (item: IItem) => {
  const { _id, name, age } = item;
  activeRow.value = "";
  isPutActive.value = !isPutActive.value;
  store.dispatch("put", { _id, name, age });
};
const handlePostSaveBtn = () => {
  store.dispatch("post", { name: postName.value, age: postAge.value });
  postName.value = "";
  postAge.value = "";
  isPostActive.value = false;
};
</script>

<template>
  <div v-if="isPostActive" class="popUpContainer">
    <div class="postPopUp">
      <input v-model="postName" placeholder="Name" />
      <input v-model="postAge" placeholder="Age" />
      <div class="postPopUpBtnContainer">
        <button @click="handlePostSaveBtn">Save</button>
        <button @click="isPostActive = false">Cancel</button>
      </div>
    </div>
  </div>
  <div class="container">
    <button @click="isPostActive = true" class="postBtn">
      Add to the list<img src="../assets/plus.svg" />
    </button>
    <table v-if="data.length > 0" class="table">
      <thead>
        <tr>
          <th>_ID</th>
          <th>NAME</th>
          <th>AGE</th>
          <th></th>
          <th></th>
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
              <img src="../assets/edit.svg" alt="edit" />
            </button>
            <button
              v-if="activeRow === item._id && isPutActive"
              @click="handlePutSaveBtn(item)"
            >
              <img src="../assets/check.svg" alt="save" />
            </button>
          </td>
          <td>
            <button @click="handleDeleteBtn(item)">
              <img src="../assets/delete.svg" alt="delete" />
            </button>
          </td>
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
  background-color: #666;
}

.postBtn {
  display: grid;
  grid-template-columns: 1fr 50px;
  height: 60px;
  margin: 0 0 30px 0;
  align-items: center;
  width: 250px;
}

.popUpContainer {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}

.postPopUp {
  display: flex;
  flex-direction: column;
  left: 50%;
  padding: 20px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #242424;
  border-radius: 12px;
}

.postPopUpBtnContainer {
  display: flex;
  width: 100%;
}

.postPopUp input {
  margin: 5px 0;
}

.postPopUpBtnContainer button {
  margin: 5px 0;
  width: 100%;
}

img {
  width: 80%;
  height: 80%;
}
</style>
