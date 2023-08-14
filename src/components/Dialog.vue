<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ITask } from "../types/Task";
// import { OhVueIcon } from "oh-vue-icons";

const task = reactive<ITask>({
  name: "",
  deadline: "",
  priority: "",
  Description: "",
  id: 0,
});
defineProps({
  msg: String,
})
const priorityOptionRef = ref();

</script>

<template>
  <div class="dialogContain">
    <div class="dialogHeader">
      <span>
        Add New Task
      </span>
      <VIcon class="closeIcon" name="io-close" />
    </div>

    <div class="optionalInput" ref="deadlineOptionRef">
      <input type="date" v-model="task.deadline" />
    </div>
    <div class="optionalInput" ref="priorityOptionRef">
      <select v-model="task.priority">
        <option>Height</option>
        <option>Low</option>
        <option>No matter</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.dialogContain {
  background-color: rgba(238, 240, 242, 0.683);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: .5em;
  border: 1px solid;
}

.dialogHeader {
  display: flex;
  justify-content: space-between;
}
.closeIcon{
  width: 1em;
  height: 1em;
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
