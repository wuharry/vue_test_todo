<script setup lang="ts">
import { ref,reactive } from "vue";
import { ITask } from "../types/Task";
import TaskItem from "./TaskItem.vue";
const task = ref<ITask>({
  name: '',
  deadline: '',
  priority: '',
  id: 0
});
const taskArray = reactive<ITask[]>([]);
const sendTaskData = () => {
  const newTask={
    ...task.value,
    id: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000)
  }
  taskArray.push(newTask);
  console.log(taskArray.length);
  /**
   這裡要有api將資料送出到backend
   */
}

</script>

<template>
  <div class="taskCreate">
    <input type="text" v-model="task.name" />
    <div class="">
      <input type="checkbox">
      <input type="date" v-model="task.deadline" />
    </div>
    <div class="">
      <input type="checkbox">
      <select v-model="task.priority">
        <option>Height</option>
        <option>Low</option>
        <option>No matter</option>
      </select>
    </div>
    <button @click="sendTaskData">Create Task</button>
  </div>
  <ul>
    <!-- {{task}} -->
    <li v-for="task in taskArray" :key="task.id" >
      <TaskItem :task="task" />
      <!-- <TaskItem  /> -->
    </li>

  </ul>
</template>

<style scoped>
.taskCreate {
  display: flex;
  width: 100%;
  justify-content: center;
  height: 2.5em;
}

input {
  width: 50%;
}

button {
  width: 20%;
}
</style>
