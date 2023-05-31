import { createStore } from "vuex";

const store = createStore({
  state: {
    data: {},
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
  },
  // getters: {
  // Define your getters here
  // },
});

export default store;
