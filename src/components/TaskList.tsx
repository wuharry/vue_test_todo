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
    const task: ITask = {
      taskName: ref(""),
      deadline: ref(""),
      priority: ref(""),
      id: 0,
    };
    const taskList: ITask[] = [];
    const requireDeadline = ref(false);
    const requirePriority = ref(false);
    const inputRef = ref<HTMLInputElement | null>(null);
    const handleFocus = () => {
      console.log("Input is focused!");
      console.log(`顯示其他選項`);
    };
    const onInputKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault(); // 阻止 Enter 鍵的默認行為
      }
    };
    const snedTask=()=>{
      taskList.push(task);
      for (const attributes in task) {
      }
    } 
    onMounted(() => {
      console.log("組件掛載到頁面之後執行");
      console.log(task.taskName.value);
    });

    onUpdated(() => {
      // console.log("組件更新後執行");/
      if (task.taskName.value) {
        console.log(`觸發動畫`);
      }
      console.log(task);
    });

    return {
      task,
      requirePriority,
      requireDeadline,
      handleFocus,
      onInputKeyDown,
      snedTask,
    };
  },

  render() {
    return (
      <>
        <div class="flex flex-col  space-x-4">
          <div class="flex justify-center item-center m-2">
            <input
              type="text"
              v-model={this.task.taskName.value}
              ref="inputRef"
              onFocus={this.handleFocus}
              onKeydown={this.onInputKeyDown}
            />
          </div>

          <div class="flex justify-center item-center m-2 ">
            <input type="checkbox" v-model={this.requireDeadline} />
            <input
              type="date"
              v-model={this.task.deadline}
              ref="inputRef"
              onFocus={this.handleFocus}
            />
          </div>
          <div class="flex justify-center item-center  m-2">
            <input type="checkbox" v-model={this.requirePriority} />
            <select v-model={this.task.priority}>
              <option>Height</option>
              <option>Low</option>
              <option>not important</option>
            </select>
          </div>
          <button class="rounded bg-orange-300" onClick={this.snedTask}>Create Task</button>
        </div>
        <div>
          <ul>
            {/* {items.value.map(({ id, text }) => {
                return <li key={id}>
                
                </li>;
              })} */}
          </ul>
        </div>
      </>
    );
  },
});
