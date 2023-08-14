<script setup lang="ts">
import { ref, reactive, onMounted  } from 'vue'
import { ITask } from "../types/Task";
const task = reactive<ITask>({
  name: "",
  deadline: "",
  priority: "",
  Description:"",
  id: 0,
});
defineProps({
  msg: String,
})
const priorityOptionRef = ref();
let needDeadlin = ref<boolean>(false);
let needPriority = ref<boolean>(false);
</script>

<template>
<div class="dialogContain">
  <span>
    Add New Task
  </span>
  <div class="optionalInput" ref="deadlineOptionRef">
        <input type="checkbox" v-model="needDeadlin" />
        <input type="date" v-model="task.deadline" :disabled="!needDeadlin" />
      </div>
  <div class="optionalInput" ref="priorityOptionRef">
        <input type="checkbox" v-model="needPriority" />
        <select v-model="task.priority" :disabled="!needPriority">
          <option>Height</option>
          <option>Low</option>
          <option>No matter</option>
        </select>
      </div>
</div>
</template>

<style scoped>
.dialogContain {
  background-color: rgb(226,232,240);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.optionalInput {
  display: flex;
  visibility: hidden;
  opacity: 0;
  width: 20em;
  margin-top: 10px;
  transition: visibility 0s linear 0.33s, opacity 0.33s linear;
}
</style>
