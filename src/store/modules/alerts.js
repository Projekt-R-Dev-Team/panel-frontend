import { createToast, withProps } from 'mosha-vue-toastify';
import alerts from "../../components/Alerts/alerts";

const actions = {
  alert({ commit }, alert) {
    return new Promise((resolve) => {
      commit("sendAlert", alert);
      resolve();
    });
  }
};

const mutations = {
  sendAlert(state, alert) {
    createToast(withProps(alerts, { header: alert.title, message: alert.message, type: alert.type }), {'hideProgressBar': true})
  }
};

export default {
  namespaced: true,
  actions,
  mutations
};
