<script setup lang="ts">
import { ref } from 'vue'
import { ITask } from '../types/Task'
const props = defineProps({
  task: {
    type: Object as () => ITask,
  }
})

const count = ref(0)
</script>

<template>
  <div class="taskContain">
    <span>{{task?.id}}</span>
    <span>{{task?.name}}</span>
    <div>{{ task?.deadline }}</div>
    <div>
      <button>Edit</button>
      <button>Delet</button>
    </div>
  </div>
</template>

<style scoped>
.taskContain {
  display: flex;
}
</style>
