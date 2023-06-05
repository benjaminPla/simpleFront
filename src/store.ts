// @ts-ignore
import { createStore, Commit, Dispatch } from "vuex";

interface IState {
  data: any;
}

interface IPayload {
  _id?: string;
  name?: string;
  age?: string | number;
}

const store = createStore({
  state: {
    data: [],
  },
  mutations: {
    setData: (state: IState, payload: IPayload) => {
      state.data = payload;
    },
  },
  actions: {
    get: async ({ commit }: Commit) => {
      const data = await fetch(`13.53.192.193:3000/get`).then(
        (res) => res.json()
      );
      commit("setData", data);
    },
    post: async ({ dispatch }: Dispatch, payload: IPayload) => {
      const { name, age } = payload;
      await fetch(`13.53.192.193:3000/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });
      dispatch("get");
    },
    put: async ({ dispatch }: Dispatch, payload: IPayload) => {
      try {
        const { _id, name, age } = payload;
        await fetch(`13.53.192.193:3000/put/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, age }),
        });
        dispatch("get");
      } catch (error) {
        console.log(error);
      }
    },
    delete: async ({ dispatch }: Dispatch, payload: IPayload) => {
      await fetch(`13.53.192.193:3000/delete/${payload}`, {
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
