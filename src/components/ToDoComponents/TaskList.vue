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
  console.log(`submitTask`);
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

onMounted(() => {
  const taskListFromLocalStorage = localStorage.getItem("taskList");
  const preTaskList: ITask[] = taskListFromLocalStorage
    ? JSON.parse(taskListFromLocalStorage)
    : [];
  store.commit('updateTask', preTaskList);
  // taskArray.splice(0, taskArray.length, ...preTaskList);
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
    <div class="taskList">
      <ul>
        <div v-for="task in taskArray" :key="task.id">
          <TaskItem :task="task" @deletTask="deletTask" />
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

.taskList {
  display: flex;
  width: 100%;
  ul{
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
