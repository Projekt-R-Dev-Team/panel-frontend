import { ServerScript} from "../../models";
import { ModelManager } from "../manager";
import api from "../../services/api";

const manager = new ModelManager(ServerScript);

const state = {
    manager,
    ...manager.state
};

const getters = {
    ...manager.getters,
    byServerId: state => id => state.all.filter(item => item.server_id === id)
};

const actions = {
    ...manager.actions,
    execute({ commit }, scriptId) {
        return new Promise((resolve, reject) => {
            api
                .get("/execute/script/" + scriptId)
                .then(() => {
                    resolve()
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
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
