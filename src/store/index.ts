import { createStore } from "vuex";
export default createStore({
  state: {
    taskStatus: {} as Record<string, boolean>,
  },
  mutations: {
    changeTaskStatus(state, taskid) {

      if (!(taskid in state.taskStatus)) {
        state.taskStatus[taskid] = true;
      } else {
        state.taskStatus[taskid]=!state.taskStatus[taskid]
      }
    },
  },
  actions: {
    changeTaskStatus({ commit }, taskid: number) {
      const payload = { taskid };
      commit("changeTaskStatus", payload);
    },
  },
  modules: {},
  plugins: [],
});
