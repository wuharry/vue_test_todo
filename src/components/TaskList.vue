<script setup lang="ts">
import { ref, reactive } from "vue";
import { ITask } from "../types/Task";
import TaskItem from "./TaskItem.vue";
const task = ref<ITask>({
  name: '',
  deadline: '',
  priority: '',
  id: 0
});
const needDeadlin = ref<boolean>(false);
const needPriority = ref<boolean>(false);
const deadlineOptionRef = ref();
const priorityOptionRef = ref();
const taskArray = reactive<ITask[]>([]);
const sendTaskData = () => {
  const newTask = {
    ...task.value,
    id: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000)
  }
  taskArray.push(newTask);
  console.log(taskArray.length);

  /**
   這裡要有api將資料送出到backend
   */
  deadlineOptionRef.value.classList.remove('showExtraInput');
  priorityOptionRef.value.classList.remove('showExtraInput');
}

const UserInputting = (check: boolean) => {
  if (check) {
    deadlineOptionRef.value.classList.add('showExtraInput');
    priorityOptionRef.value.classList.add('showExtraInput');
  }
  else {
    // extraOptionRef.value.classList.remove('showExtraInput');
  }
}
</script>

<template>
  <div class="createTask">
    <div class="userInput">
      <input type="text" v-model="task.name" @focus="UserInputting(true)" />
      <div class="optionalInput" ref="deadlineOptionRef">
        <input type="checkbox" v-model="needDeadlin">
        <input type="date" v-model="task.deadline" :disabled="!needDeadlin" />
      </div>
      <div class="optionalInput" ref="priorityOptionRef">
        <input type="checkbox" v-model="needPriority">
        <select v-model="task.priority" :disabled="!needPriority">
          <option>Height</option>
          <option>Low</option>
          <option>No matter</option>
        </select>
      </div>
    </div>
    <button @click="sendTaskData">Create Task</button>
  </div>
  <div>
    <ul>
      <li v-for="task in taskArray" :key="task.id">
        <TaskItem :task="task" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.createTask {
  display: flex;
  width: 100%;
  justify-content:center;
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
  /* width: 100%; */
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 0.33s, opacity 0.33s linear;
}

.showExtraInput {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}

input {
  /* width: 60%; */
}

button {
  width: 20%;
}
</style>
