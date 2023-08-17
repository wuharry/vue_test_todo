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
      //   預設排版
      state.task.sort((currentTask, nextTask) => {
        const priorityMap: { [key: string]: number } = {
          Height: 3,
          Low: 2,
          "No matter": 1,
        };
        const currentVal = priorityMap[currentTask?.priority || ""] || 0;
        const nextVal = priorityMap[nextTask?.priority || ""] || 0;

        if (currentVal > nextVal) {
          return -1;
        }
        if (currentVal < nextVal) {
          return 1;
        }
        return 0;
      });

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
    updateTask({ commit }) {
      commit("updateTask");
    },
    sortByDate({ commit }){
        commit('sortByDate');
    }
  },
  modules: {},
  plugins: [],
});
