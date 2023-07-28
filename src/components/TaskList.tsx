import {
  defineComponent,
  ref,
  render,
  onMounted,
  onUpdated,
  onBeforeUnmount,
} from "vue";
import { ITask } from "../types/Task";
import TaskItem from "./TaskItem.vue";

export default defineComponent({
  setup() {
    const taskInput = ref("");
    onMounted(() => {
      // console.log("組件掛載到頁面之後執行");
      console.log(taskInput.value);
    });
    onUpdated(() => {
      // console.log("組件更新後執行");
      console.log(taskInput.value);
    });
    return {
      taskInput,
    };
  },
  render() {
    return (
      <>
        <div class="flex justify-center item-center space-x-4">
          <input type="text" v-model={this.taskInput} />
          <button class="rounded bg-orange-300">Create Task</button>
        </div>
      </>
    );
  },
});
