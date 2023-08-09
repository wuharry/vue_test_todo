<script setup lang="ts">
import { ref, onMounted  } from 'vue'
import { ITask } from '../types/Task'
const props = defineProps<{
  task: ITask;
}>();
const emit = defineEmits<{
  deletTask:[id:number],
}>()
const task = props.task;
const taskDataRef=ref();
const taskStatus=ref(false);
const jobDoneEvent = () => {
  if(taskStatus.value){
    taskDataRef.value.classList.add();
  }
}
const taskDeletEvent=()=>{
  emit('deletTask',task.id);
}
const taskEditEvent=()=>{

}
onMounted(() =>{

  switch (task.priority) {
    case 'Height':
        console.log(`高優先`);
        
      break;
      case 'Low':
      console.log(`低優先`);
      
      break;
      case 'No matter':
      console.log(`不重要`);
      
      break;
  
    default:
      break;
  }
})
</script>

<template>
  <div class="taskContain">
    <input type="checkbox" v-model="taskStatus" @change="jobDoneEvent">
    <div ref="taskDataRef">
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
  /* width: fit-content; */
  border: 0.5px solid hsla(0, 0%, 100%, .5);
  border-radius: 3px;
  padding: 5px;
}
.taskContain:hover {
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
}
</style>
