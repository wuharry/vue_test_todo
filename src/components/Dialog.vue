<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ITask } from "../types/Task";
// import { OhVueIcon } from "oh-vue-icons";
import { useStore } from "vuex";

const emit = defineEmits(['closeDialog']);
const task = ref<ITask>({
  name: "",
  deadline: "",
  priority: "",
  description: "",
  id: 0,
});
defineProps({
  msg: String,
})
const clearDialogData = () => {
  for (const key in task.value) {
    task.value[key] = "";
  }
}
const closeDialog = () => {
  emit('closeDialog');
  clearDialogData()
}
const store = useStore();
const sentTasks = () => {
  console.log(`Dialog操作`);
  const newTask = {
    ...task.value,
    id: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
  };
  store.dispatch("addTask", newTask);
  closeDialog()
}

</script>

<template>
  <div class="dialogContain">
    <div class="dialogHeader">
      <span>
        Add New Task
      </span>
      <VIcon class="closeIcon" name="io-close" @click="closeDialog" />
    </div>

    <div class="optionalInput">
      <span>Task Name</span>
      <input type="text" v-model="task.name" placeholder="task Name" @keyup.enter="sentTasks">
    </div>
    <div class="optionalInput">
      <span>Deadline</span>
      <input type="date" v-model="task.deadline" />
    </div>
    <div class="optionalInput">
      <span>Description</span>
      <input type="text" v-model="task.description" placeholder="task description">
    </div>
    <div class="optionalInput">
      <span>Priority</span>
      <select v-model="task.priority">
        <option>Height</option>
        <option>Low</option>
        <option>No matter</option>
      </select>
    </div>
    <div style="flex">
      <button class="CreatTaskBtn" @click="sentTasks">Create Task</button>
      <button class="CreatTaskBtn" @click="closeDialog">Cancel</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialogContain {
  background-color: rgba(238, 240, 242, 0.758);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: .5em;
  border: 1px solid;
  position: fixed;
  z-index: 3;
}

.dialogHeader {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.dialogHeader>* {
  margin: .3em 1em;
}

.closeIcon {
  width: 1em;
  height: 1em;
}

.optionalInput {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: .5em;
  width: 20em;
  margin-top: 10px;
  transition: visibility 0s linear 0.33s, opacity 0.33s linear;
}

input[type="date"] {
  appearance: none; //使得開發者可以完全自定義元素的外觀。
  padding: 0.75rem;
  border-radius: 0.5em;
  border-width: 2px;
  border-color: transparent;
  color: rgb(71 85 105 / var(--tw-text-opacity));
  outline: none;
  width: 24em;
  height: 1em;
}

select {
  appearance: none; //使得開發者可以完全自定義元素的外觀。
  padding: 0.75rem;
  margin-bottom: 1em;
  border: 0;
  outline: 0;
  font: inherit;
  width: 19.5em;
  height: 3em;

  border-radius: 0.5em;
  border-width: 2px;
  border-color: transparent;
  color: rgb(71 85 105);
  /* box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2); */
  cursor: pointer;

  option {
    color: inherit;
  }

  /* 當有元素或的聚焦時,移除輸入聚焦效果*/
  &:focus {
    outline: none;
  }

  /* Remove IE arrow */
  &::-ms-expand {
    display: none;
  }
}

input[type="text"] {
  appearance: none; //使得開發者可以完全自定義元素的外觀。
  padding: 0.75rem;
  border: 2px solid;
  border-radius: 0.5em;
  border-width: 2px;
  border-color: transparent;
  color: rgb(71 85 105 / var(--tw-text-opacity));
  font-weight: 700;
  font-size: 16px;
  outline: 0;
  font: inherit;
  width: 18em;
  height: 2em;

  &:focus {
    outline: none;
  }
}

.CreatTaskBtn {
  width: auto;
  border-radius: 0.5rem;
  border-width: 2px;
  border-color: transparent;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: rgb(34, 132, 245);
  color: white;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  text-align: center;
}
</style>
