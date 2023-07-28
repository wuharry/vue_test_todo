import { defineComponent, ref, render } from "vue";
import { ITask } from "../types/Task";
import TaskItem from "./TaskItem.vue";

export default defineComponent({
  setup() {
    const taskInput = ref("");
    return {
      taskInput,
    };
  },
  render() {
    return  (
      <>
        <div class="flex justify-center item-center space-x-4">
          <input type="text" v-model={this.taskInput} />
          <button class="rounded bg-orange-300">Create Task</button>
        </div>
      </>
    );
  },
});
