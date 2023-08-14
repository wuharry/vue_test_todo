<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ITask } from "../types/Task";
import TaskItem from "./TaskItem.vue";
import Dialog from "./Dialog.vue";
const task = reactive<ITask>({
  name: "",
  deadline: "",
  priority: "",
  description: "",
  id: 0,
});
let showDialog = ref<boolean>(false);
const deadlineOptionRef = ref();
const priorityOptionRef = ref();
let taskArray = reactive<ITask[]>([]);
const callTaskDialog = () => {
  showDialog.value = true;
}
const checkTaskName = () => {
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

const deletTask = (id: number) => {
  const newArray = taskArray.filter((task) => task.id !== id);
  taskArray.splice(0, taskArray.length, ...newArray);
};

const closeDialog=()=>{
  showDialog.value=false;
}
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
      <input type="text" v-model="task.name" @keyup.enter="checkTaskName" placeholder="Task Name" />
      <Dialog v-if="showDialog" @closeDialog="closeDialog" />
      <div class="taskList">
        <ul>
          <li v-for="task in taskArray" :key="task.id">
            <TaskItem :task="task" @deletTask="deletTask" />
          </li>
        </ul>
      </div>
    </div>
    <diV>
      <button class="CreatTaskBtn" @click="callTaskDialog">Create Task</button>
    </diV>

  </div>
</template>

<style scoped lang="scss">
.createTask {
  display: flex;
  width: 100%;
  justify-content: center;
  height: 2.5em;
  font-family: 'Lato', sans-serif;
}

.userInput {
  /* width: 30%; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: start;
  input::placeholder{
    color: rgba(206, 184, 184, 0.671);
  }
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
  text-align: center;
}

/* button {
  width: 20%;
} */

.taskList {
  display: block;
}
</style>
