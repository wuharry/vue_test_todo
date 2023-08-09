<script setup lang="ts">
import { ref, watch } from 'vue'
import { ITask } from '../types/Task'
const props = defineProps<{
  task: ITask;
}>();
const emit = defineEmits<{
  deletTask:[id:number],
}>()
const task = props.task;
const taskRef=ref();
const taskStatus=ref(false);
const jobDoneEvent = () => {
  if(taskStatus.value){
    taskRef.value.classList.add();
  }
}
const taskDeletEvent=()=>{
  emit('deletTask',task.id);
}
const taskEditEvent=()=>{

}
</script>

<template>
  <div class="taskContain">
    <input type="checkbox" v-model="taskStatus" @change="jobDoneEvent">
    <div ref="taskRef">
      <span>{{ task.name }}</span>
      <span>{{ task.deadline }}</span>
    </div>
    <div>
      <button @click="">Edit</button>
      <button @click="taskDeletEvent">Delet</button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/sketch');

.taskContain {
  font-family: 'Sketch', sans-serif;
  display: flex;
}
</style>
