import { defineComponent, ref } from "vue";
import { ITask } from "../types/Task";
import TaskItem from "./TaskItem.vue";

export default defineComponent({
  setup() {
    const count = ref(0);
    return () => (
      <>
        <div class="justify-center">
          <input />
          <button class="rounded bg-orange-300">Create Task</button>
        </div>
      </>
    );
  },
});
