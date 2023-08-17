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
const taskEditEvent = () => { };
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
    <!-- <input type="checkbox" v-model="taskStatus" @change="jobDoneEvent" /> -->
    <div class="TaskStatement" ref="taskDataRef">
      <div style="display: flex;">
        <h4>TaskName:</h4> <span>{{ task.name }}</span>
      </div>
      <div>
        <h4>Description:</h4><span>{{ task.description }}</span>
      </div>
      <div>
        <h4>Deadline:</h4><span>{{ task.deadline }}</span>
      </div>
    </div>
    <div>
      <button @click="">Edit</button>
      <button @click="taskDeletEvent">Delet</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.cdnfonts.com/css/sketch");

.taskContain {
  font-family: "Sketch", sans-serif;
  display: grid;
  /* grid的列布局,auto-fill=根据容器的宽度自动填充
    minmax(21em, 1fr) 则表示每列的最小宽度是 21em 
  */
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  width: 100%;
  height: 5em;
  border: 0.5px solid hsla(0, 0%, 100%, 0.2);
  border-radius: 0.5em;
  padding: 1px;
  margin: 1.5em 0;
}

.taskContain:hover {
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
}

.TaskStatement {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  * h4 {
    font-family: "Monospace", monospace;
    padding: 0;
    margin: 0;
  }
}

.priorityHeight {
  background-color: rgb(243, 33, 33);
  color: white;
}

.priorityLow {
  background-color: rgb(182, 250, 8);
  color: black;
}

.priorityNoMatter {
  background-color: rgb(240, 240, 240);
  color: black;
}

.taskDone {
  text-decoration: line-through;
}
</style>
