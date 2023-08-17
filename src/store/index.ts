import { createStore } from "vuex";
import { ITask } from "../types/Task";
export interface State {
  task: ITask[];
}
export default createStore({
  state: {
    task: [] as ITask[],
  },
  mutations: {
    addTask(state, newTask: ITask) {
      console.log(`addTask`);
      state.task.push(newTask);
      console.log(state.task);
    },
    removeTask(state, taskId: number) {
      const newArray = state.task.filter((task) => task.id !== taskId);
      state.task.splice(0, state.task.length, ...newArray);
    },
  },
  actions: {
    addTask({ commit }, newTask: ITask) {
      commit("addTask", newTask);
    },
    removeTask({ commit }, taskId) {
      commit("removeTask", taskId);
    },
  },
  modules: {},
  plugins: [],
});
