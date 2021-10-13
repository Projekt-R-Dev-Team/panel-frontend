import { Groups } from "../../models";
import { ModelManager } from "../manager";
import api from "../../services/api";

const manager = new ModelManager(Groups);

const state = {
    manager,
    ...manager.state,
    adminGroups: []
};

const getters = {
    ...manager.getters,
    admin: (state) => state.adminGroups
};

const actions = {
    ...manager.actions,
    admin({commit}) {
        return new Promise((resolve, reject) => {
            api
                .get("/admin/groups/")
                .then((resp) => {
                    commit("admin_groups", resp.data.results)
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
};

const mutations = {
    ...manager.mutations,
    admin_groups(state, groups) {
        state.adminGroups = groups;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
