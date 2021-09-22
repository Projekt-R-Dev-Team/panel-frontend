import Cookies from "js-cookie";

export const COOKIE_NAME = "server_panel_navbar";

const state = {
  toggel: Cookies.get(COOKIE_NAME) || true
};

const getters = {
  isToggel: (state) => !!state.toggel
};

const actions = {
  changeToggel({ commit }) {
    return new Promise((resolve) => {
      commit("change");
      resolve();
    });
  }
};

const mutations = {
  change(state) {
    console.log("Update");
    state.toggel = !state.toggel;
    Cookies.set(COOKIE_NAME, !state.toggel);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
