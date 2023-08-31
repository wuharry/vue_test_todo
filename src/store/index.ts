import { createStore } from "vuex";
import { ITask } from "../types/Task";
import { firebaseInit } from "../firebaseInit";
import { addDoc, collection, getFirestore, setDoc } from "firebase/firestore";
export interface State {
  task: ITask[];
}
export default createStore({
  state: {
    task: [] as ITask[],
  },
  mutations: {
    addTask(state, newTask: ITask) {
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
    },
    removeTask(state, taskId: number) {
      const newArray = state.task.filter((task) => task.id !== taskId);
      state.task.splice(0, state.task.length, ...newArray);
    },
    updateTask(state, preTaskArray: ITask[]) {
      state.task.splice(0, state.task.length, ...preTaskArray);
    },
  },
  actions: {
    async addTask({ commit }, newTask: ITask) {
      commit("addTask", newTask);
      const { app, analytics } = firebaseInit();
      const database = getFirestore(app);
      // console.log(database);
      const dbRef = collection(database, "users");
      await addDoc(dbRef, newTask);
    },
    removeTask({ commit }, taskId) {
      commit("removeTask", taskId);
    },
    updateTask({ commit }) {
      commit("updateTask");
    },
    sortByDate({ commit }) {
      commit("sortByDate");
    },
  },
  modules: {},
  plugins: [],
});
