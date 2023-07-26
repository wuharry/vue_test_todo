<script setup lang="ts">
import { ref } from "vue";
import { ITask } from "../types/Task";
import TaskItem from "./TaskItem.vue";
const props = defineProps({
  taskArray: {
    type: Array as () => ITask[],
  },
});
const count = ref(0);
</script>

<template>
  <div class="taskCreate">
    <input />
    <button>Create Task</button>
  </div>

  <ul>
    <li v-for="item in taskArray" :key="item.id">
      <TaskItem props="item" />
    </li>
  </ul>
</template>

<style scoped>
.taskCreate{
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
