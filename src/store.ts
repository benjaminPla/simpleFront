import { createStore } from "vuex";

const store = createStore({
  state: {
    data: [],
  },
  mutations: {
    setData: (state, payload) => {
      state.data = payload;
    },
  },
  actions: {
    get: async ({ commit }) => {
      const data = await fetch("http://localhost:3000/get").then((res) =>
        res.json()
      );
      commit("setData", data);
    },
    post: async ({ commit, dispatch }, payload) => {
      const { name, age } = payload;
      console.log({ name, age });
      await fetch(`http://localhost:3000/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });
      dispatch("get");
    },
    put: async ({ commit, dispatch }, payload) => {
      const { _id, name, age } = payload;
      await fetch(`http://localhost:3000/put/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });
      dispatch("get");
    },
    delete: async ({ commit, dispatch }, payload) => {
      await fetch(`http://localhost:3000/delete/${payload}`, {
        method: "DELETE",
      });
      dispatch("get");
    },
  },
  // getters: {
  // Define your getters here
  // },
});

export default store;
