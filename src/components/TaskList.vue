<script setup lang="ts">
import { ref, reactive } from "vue";
import { ITask } from "../types/Task";
import TaskItem from "./TaskItem.vue";
const task = reactive<ITask>({
  name: '',
  deadline: '',
  priority: '',
  id: 0
});
const needDeadlin = ref<boolean>(false);
const needPriority = ref<boolean>(false);
const deadlineOptionRef = ref();
const priorityOptionRef = ref();
const taskArray = reactive<ITask[]>([]);
const sendTaskData = () => {
  const newTask = {
    ...task,
    id: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000)
  }
  taskArray.push(newTask);
  /**
   這裡要有api將資料送出到backend
   */
  deadlineOptionRef.value.classList.remove('showExtraInput');
  priorityOptionRef.value.classList.remove('showExtraInput');
  for (const key in task) {
    if (key != 'id') {
      task[key] = ''
    }
  }
}

const UserInputting = (check: boolean) => {
  if (check) {
    deadlineOptionRef.value.classList.add('showExtraInput');
    priorityOptionRef.value.classList.add('showExtraInput');
  }
  else {
    // extraOptionRef.value.classList.remove('showExtraInput');
  }
}
</script>

<template>
  <div class="createTask">
    <div class="userInput">
      <input type="text" v-model="task.name" @focus="UserInputting(true)" />
      <div class="optionalInput" ref="deadlineOptionRef">
        <input type="checkbox" v-model="needDeadlin">
        <input type="date" v-model="task.deadline" :disabled="!needDeadlin" />
      </div>
      <div class="optionalInput" ref="priorityOptionRef">
        <input type="checkbox" v-model="needPriority">
        <select v-model="task.priority" :disabled="!needPriority">
          <option>Height</option>
          <option>Low</option>
          <option>No matter</option>
        </select>
      </div>
      <div class="taskList">
        <ul>
          <li v-for="task in taskArray" :key="task.id">
            <TaskItem :task="task" />
          </li>
        </ul>
      </div>
    </div>
    <button @click="sendTaskData">Create Task</button>
  </div>
</template>

<style scoped lang="scss">
.createTask {
  display: flex;
  width: 100%;
  justify-content: center;
  height: 2.5em;
}

.userInput {
  /* width: 30%; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: start;

}

.optionalInput {
  display: flex;
  visibility: hidden;
  opacity: 0;
  width: 20em;
  transition: visibility 0s linear 0.33s, opacity 0.33s linear;
}

.showExtraInput {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}

input[type="text"] {
  appearance: none; //使得開發者可以完全自定義元素的外觀。
  padding: 0 4em 0 1em;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: 0;
  font: inherit;
  width: 16em;
  height: 25em;
  &:focus {
    outline: none;
  }

}

input[type="date"] {
  appearance: none; //使得開發者可以完全自定義元素的外觀。
  border-radius: 3px;
  border: 1px white solid;
  outline: none;
  width: 23em;
  height: 3em;
}

input[type="checkbox"] {
  outline: none;
}

select {
  appearance: none; //使得開發者可以完全自定義元素的外觀。
  border: 0;
  outline: 0;
  font: inherit;
  width: 20em;
  height: 3em;
  padding: 0 4em 0 1em;
  // color: white;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  // background-color: #320a28;

  option {
    color: inherit;
    // background-color: #320a28;
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

button {
  width: 20%;
}

.taskList {
  display: block;
}
</style>
