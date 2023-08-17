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
      console.log(`deletTask`);
      const newArray = state.task.filter((task) => task.id !== taskId);
      state.task.splice(0, state.task.length, ...newArray);
      console.log(state.task);
    },
    updateTask(state, preTaskArray: ITask[]) {
        console.log(`updateTask`);
        state.task.splice(0, state.task.length, ...preTaskArray);
    },
  },
  actions: {
    addTask({ commit }, newTask: ITask) {
      commit("addTask", newTask);
    },
    removeTask({ commit }, taskId) {
      commit("removeTask", taskId);
    },
    updateTask({ commit }, preTaskArray: ITask[]) {
      commit("updateTask");
    },
  },
  modules: {},
  plugins: [],
});
