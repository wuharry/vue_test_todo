<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { ITask } from "../types/Task";
const props = defineProps<{
  task: ITask;
}>();
const emit = defineEmits<{
  deletTask: [id: number];
}>();
const store = useStore();
const task = props.task;
const taskStatus = ref(false);
const taskBackground = ref();
const taskDataRef = ref();
const jobDoneEvent = () => {
  if (taskStatus.value) {
    taskDataRef.value.classList.add('taskDone');
  }
};
const taskDeletEvent = () => {
  emit("deletTask", task.id);
};
const taskEditEvent = () => {};
onMounted(() => {
  switch (task.priority) {
    case "Height":
      taskBackground.value.classList.add("priorityHeight");
      break;
    case "Low":
      taskBackground.value.classList.add("priorityLow");
      break;
    case "No matter":
      taskBackground.value.classList.add("priorityNoMatter");
      break;

    default:
      taskBackground.value.classList.add("priorityNoMatter");
      break;
  }
});
</script>

<template>
  <div class="taskContain" ref="taskBackground">
    <input type="checkbox" v-model="taskStatus" @change="jobDoneEvent" />
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
@import url("https://fonts.cdnfonts.com/css/sketch");

.taskContain {
  font-family: "Sketch", sans-serif;
  display: flex;
  /* width: fit-content; */
  border: 0.5px solid hsla(0, 0%, 100%, 0.5);
  border-radius:0.5em;
  padding: 5px;
}
.taskContain:hover {
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
}
.priorityHeight {
  background-color: rgb(235, 75, 12);
  color: white;
}
.priorityLow {
  background-color: rgb(252, 252, 16);
  color: black;
}
.priorityNoMatter {
  background-color: rgb(44, 253, 58);
  color: black;
}
.taskDone{
  text-decoration:line-through;
}
</style>
