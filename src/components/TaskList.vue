<script setup lang="ts">
import { ref } from 'vue'
import { ITask } from '@/types/Task'
import TaskItem from './TaskItem.vue';
const props = defineProps({
  taskArray: {
      type: Array as () => ITask[],
    },
})
const count = ref(0)

</script>

<template>
  <input>
  <button>Create Task</button>
<ul>
  <li v-for="item in taskArray " :key="item.id">
    <TaskItem props="item"/>
  </li>
</ul>
</template>

<style scoped>

</style>
