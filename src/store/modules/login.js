import Cookies from "js-cookie";
import api from "../../services/api";

export const COOKIE_NAME = "server_panel";

const state = {
  token: Cookies.get(COOKIE_NAME) || "",
  avatar: null
};

const getters = {
  isLoggedIn: (state) => !!state.token,
  token: (state) => state.token,
  data: (state) =>
    state.token ? JSON.parse(atob(state.token.split(".")[1])) : {},
  avatar: (state) => state.avatar
};

const actions = {
  login({ commit }, loginData) {
    return new Promise((resolve, reject) => {
      api
        .post("user/login/", loginData)
        .then((resp) => {
          if (resp.data.token) {
            const token = `Bearer ${resp.data.token}`;
            commit("auth_success", token);
            resolve(resp);
          }
        })
        .catch((err) => {
          commit("logout");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("logout");
      resolve();
    });
  },
  getAvatar({ commit }) {
    return new Promise(resolve => {
      api.get("avatar").then(resp => {
        commit("setAvatar", resp.data.results[0].image);
        resolve();
      })
    })
  },
  setAvatar({ commit }, avatar) {
    commit("setAvatar", avatar);
  }
};

const mutations = {
  auth_success(state, token) {
    state.token = token;
    Cookies.set(COOKIE_NAME, token);
  },
  logout(state) {
    state.token = "";
    Cookies.remove(COOKIE_NAME);
  },
  setAvatar(state, avatar) {
    state.avatar = avatar;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
