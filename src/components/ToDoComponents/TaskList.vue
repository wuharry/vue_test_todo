<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { ITask } from '@/types/Task';
import TaskItem from "./TaskItem.vue";
import Dialog from "./Dialog.vue";
const store = useStore();
let task = ref<ITask>({
  id: 0,
  name: "",
  deadline: null,
  priority: null,
  description: null,
});
let showDialog = ref<boolean>(false);
const callTaskDialog = () => {
  showDialog.value = true;
};

let taskArray = computed(() => store.state.task);
const isInvalid = ref(false);
const errorMessage = computed(() => (isInvalid.value ? "輸入不正確" : ""));
// 存入localStorage
const storeTaskAtBrowser = () => {
  const plainTaskArray = taskArray.value.map((task: ITask) => ({ ...task }));
  localStorage.setItem("taskList", JSON.stringify(plainTaskArray));
};

const submitTask = () => {
  isInvalid.value = task.value.name == "" || task.value.name == undefined;
  if (isInvalid.value) {
    setTimeout(() => {
      isInvalid.value = false;
    }, 1500);
    return;
  }
  const newTask = {
    ...task.value,
    id: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
  };


  store.dispatch("addTask", newTask);
  storeTaskAtBrowser();
  /**
   這裡要有api將資料送出到backend
   */
  for (const key in task.value) {
    task.value[key] = "";
  }
};

const deletTask = (id: number) => {
  store.dispatch("removeTask", id);
  storeTaskAtBrowser();
};

const closeDialog = () => {
  showDialog.value = false;
};

let progreso = ref(0);
const completedTasks = ref(0);
const jobDoneEvent = (taskID: number, checked: boolean): void => {
  if (checked) {
    completedTasks.value += taskArray.value.filter((task: ITask) => { return task.id == taskID }).length;
    const completionPercentage = (completedTasks.value / taskArray.value.length) * 100;
    progreso.value = completionPercentage;
  } else {
    completedTasks.value -= taskArray.value.filter((task: ITask) => { return task.id == taskID }).length;
    const completionPercentage = (completedTasks.value / taskArray.value.length) * 100;
    progreso.value = completionPercentage;
  }

}

onMounted(() => {
  // 之後這邊要抓取後端的store,然後存到localstorge
  const taskListFromLocalStorage = localStorage.getItem("taskList");
  const preTaskList: ITask[] = taskListFromLocalStorage
    ? JSON.parse(taskListFromLocalStorage)
    : [];
  store.commit('updateTask', preTaskList);
  // taskArray.splice(0, taskArray.length, ...preTaskList);
  console.log(preTaskList.length);
});

</script>

<template>
  <div class="createTask">
    <div class="userInput">
      <input type="text" v-model="task.name" @keyup.enter="submitTask" placeholder="Task Name" />
      <div class="inputFeedback" v-if="isInvalid">
        <span class="icon">❌</span>
        <span class="text">{{ errorMessage }}</span>
      </div>
      <Dialog v-if="showDialog" @closeDialog="closeDialog" @storeTaskAtBrowser="storeTaskAtBrowser" />

    </div>
    <div>
      <button class="CreatTaskBtn" @click="callTaskDialog">Create Task</button>
    </div>
  </div>
  <div class="showTaskData">
    <span>Task List({{ taskArray.length }} Tasks)</span>
    <div class="progress">
      <!-- 進度條:role="progressbar",aria-valuenow="25",aria-valuemin="0",aria-valuemax="100"
      這些屬性是html原生的-->
      <div class="progressBar" role="progressbar" v-bind:style='"width: " + progreso + "%"' aria-valuenow="25"
        aria-valuemin="0" aria-valuemax="100">{{ progreso }}%
      </div>
    </div>
    <div class="taskList">
      <ul>
        <div v-for="task in taskArray" :key="task.id">
          <TaskItem :task="task" @deletTask="deletTask" @jobDoneEvent="jobDoneEvent" />
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.createTask {
  display: flex;
  width: 100%;
  justify-content: center;
  height: 2.5em;
  font-family: "Monospace", monospace;
  margin-bottom: 2em;
}

.userInput {
  /* width: 30%; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: start;

  input::placeholder {
    color: rgba(206, 184, 184, 0.671);
  }
}

.inputFeedback {
  font-size: smaller;
  color: rgba(248, 10, 10, 0.852);
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

.progress {
  display: flex;
  height: 1rem;
  width: 20em;
  overflow: hidden;
  line-height: 0;
  font-size: .75rem;
  background-color: #bec1c5;
  border-radius: 0.25rem;
}

.progressBar {
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #007bff;
  transition: width .6s ease;
}

.taskList {
  display: flex;
  width: 100%;

  ul {
    width: 90%;
  }
}

.showTaskData {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  // height: 2.5em;
  padding: .5em 1em;
  font-family: "Monospace", monospace;
}
</style>
