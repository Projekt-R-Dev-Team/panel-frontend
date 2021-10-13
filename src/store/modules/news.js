import { News } from "../../models";
import { ModelManager } from "../manager";

const manager = new ModelManager(News);

const state = {
    manager,
    ...manager.state
};

const getters = {
    ...manager.getters,
    active: () => state.all.filter(news => news.active)
};

const actions = {
    ...manager.actions
};

const mutations = {
    ...manager.mutations
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
