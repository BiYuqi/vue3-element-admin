import { createStore } from "vuex";
import { app } from "@/store/app";

export default createStore({
  strict: process.env.NODE_ENV !== "production",
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app
  }
});
