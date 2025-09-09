import { User } from "../../models";
import { ModelManager } from "../manager";

const manager = new ModelManager(User);

const state = {
    manager,
    ...manager.state
};

const getters = {
    ...manager.getters
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
