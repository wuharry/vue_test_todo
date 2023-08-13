<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ITask } from "../types/Task";
import TaskItem from "./TaskItem.vue";
const task = reactive<ITask>({
  name: "",
  deadline: "",
  priority: "",
  id: 0,
});
let needDeadlin = ref<boolean>(false);
let needPriority = ref<boolean>(false);
const deadlineOptionRef = ref();
const priorityOptionRef = ref();
let taskArray = reactive<ITask[]>([]);
const sendTaskData = () => {
  if (task.name == "") {
    alert(`taskName不能為空`);
    return;
  }
  const newTask = {
    ...task,
    id: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
  };
  taskArray.push(newTask);
  taskArray.sort((currentTask, nextTask) => {
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
  storeTaskAtBrowser();
  /**
   這裡要有api將資料送出到backend
   */
  needDeadlin.value = false;
  needPriority.value = false;
  deadlineOptionRef.value.classList.remove("showExtraInput");
  priorityOptionRef.value.classList.remove("showExtraInput");
  for (const key in task) {
    if (key != "id") {
      task[key] = "";
    }
  }
};
const storeTaskAtBrowser = () => {
  localStorage.setItem("taskList", JSON.stringify(taskArray));
};
const userInputting = (check: boolean) => {
  if (check) {
    deadlineOptionRef.value.classList.add("showExtraInput");
    priorityOptionRef.value.classList.add("showExtraInput");
  } else {
    // extraOptionRef.value.classList.remove('showExtraInput');
  }
};
const deletTask = (id: number) => {
  console.log(`處理`);
  console.log(taskArray);
  console.log(id);
  const newArray = taskArray.filter((task) => task.id !== id);
  taskArray.splice(0, taskArray.length, ...newArray);
};

onMounted(() => {
  const taskListFromLocalStorage = localStorage.getItem("taskList");
  const preTaskList: ITask[] = taskListFromLocalStorage
    ? JSON.parse(taskListFromLocalStorage)
    : [];
  taskArray.splice(0, taskArray.length, ...preTaskList);
});
</script>

<template>
  <div class="createTask">
    <div class="userInput">
      <input type="text" v-model="task.name" @focus="userInputting(true)" />
      <div class="optionalInput" ref="deadlineOptionRef">
        <input type="checkbox" v-model="needDeadlin" />
        <input type="date" v-model="task.deadline" :disabled="!needDeadlin" />
      </div>
      <div class="optionalInput" ref="priorityOptionRef">
        <input type="checkbox" v-model="needPriority" />
        <select v-model="task.priority" :disabled="!needPriority">
          <option>Height</option>
          <option>Low</option>
          <option>No matter</option>
        </select>
      </div>
      <div class="taskList">
        <ul>
          <li v-for="task in taskArray" :key="task.id">
            <TaskItem :task="task" @deletTask="deletTask" />
          </li>
        </ul>
      </div>
    </div>
    <button class="CreatTaskBtn" @click="sendTaskData">Create Task</button>
  </div>
</template>

<style scoped lang="scss">
.createTask {
  display: flex;
  width: 100%;
  justify-content: center;
  height: 2.5em;
}

.userInput {
  /* width: 30%; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: start;
}

.optionalInput {
  display: flex;
  visibility: hidden;
  opacity: 0;
  width: 20em;
  margin-top: 10px;
  transition: visibility 0s linear 0.33s, opacity 0.33s linear;
}

.showExtraInput {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}

input[type="text"] {
  appearance: none; //使得開發者可以完全自定義元素的外觀。
  padding: 0.75rem;
  border: 2px solid;
  border-radius: 0.5em;
  border-width: 2px;
  border-color: transparent;
  color: rgb(71 85 105 / var(--tw-text-opacity));
  font-weight: 700;
  font-size: 16px;
  outline: 0;
  font: inherit;
  width: 16em;
  height: 25em;

  &:focus {
    outline: none;
  }
}

input[type="date"] {
  appearance: none; //使得開發者可以完全自定義元素的外觀。
  padding: 0.75rem;
  border-radius: 0.5em;
  border-width: 2px;
  border-color: transparent;
  color: rgb(71 85 105 / var(--tw-text-opacity));
  outline: none;
  width: 25em;

  height: 3em;
}

input[type="checkbox"] {
  appearance: none;
  margin: 0;
  outline: none;
  font: inherit;
  // color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  border-width: 2px;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em rgb(28, 7, 224);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

select {
  appearance: none; //使得開發者可以完全自定義元素的外觀。
  padding: 0.75rem;
  border: 0;
  outline: 0;
  font: inherit;
  width: 20em;
  height: 3em;
  // color: white;
  border-radius: 0.5em;
  border-width: 2px;
  border-color: transparent;
  color: rgb(71 85 105);
  /* box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2); */
  cursor: pointer;

  option {
    color: inherit;
  }

  /* 當有元素或的聚焦時,移除輸入聚焦效果*/
  &:focus {
    outline: none;
  }

  /* Remove IE arrow */
  &::-ms-expand {
    display: none;
  }
}

.CreatTaskBtn {
  width: auto;
  border-radius: 0.5rem;
  border-width: 2px;
  border-color: transparent;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: rgb(34, 132, 245);
  color: white;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  text-align:center;
}
/* button {
  width: 20%;
} */

.taskList {
  display: block;
}
</style>
