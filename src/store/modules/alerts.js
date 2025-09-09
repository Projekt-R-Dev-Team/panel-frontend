import alerts from "../../components/Alerts/alerts";
import vue from 'vue';

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
    vue.$toast({
      component: alerts,
      props: {
        title: alert.title,
        message: alert.message,
        type: alert.type
      }
    }, { timeout: 2000, icon: false, hideProgressBar: true, type: "default", toastClassName: "vue-alert-default", closeButtonClassName: 'vue-alert-close'})
  }
};

export default {
  namespaced: true,
  actions,
  mutations
};
