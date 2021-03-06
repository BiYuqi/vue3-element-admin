import { Module } from "vuex";

export interface State {
  sideBarIsOpen: boolean;
}

export const app: Module<State, unknown> = {
  namespaced: true,
  state: {
    sideBarIsOpen: false
  },
  mutations: {
    toggleSideBar(state, status) {
      state.sideBarIsOpen = status;
    }
  }
};
