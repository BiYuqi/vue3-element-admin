import { Module } from "vuex";

export interface State {
  sideBarIsOpen: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const app: Module<State, any> = {
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
