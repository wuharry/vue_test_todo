<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ITask } from '@/types/Task';
const props = defineProps<{
  task: ITask;
}>();
const emit = defineEmits<{
  deletTask: [id: number];
  taskDoneEvent: [taskID: number, checked: boolean];
}>();
const checked = ref<boolean>(false);
const task: ITask = props.task;
// html element
const taskBackground = ref();
const taskName = ref<HTMLElement>();
const taskDescription = ref<HTMLElement>();
const taskDeadline = ref<HTMLElement>();
const jobDoneEvent = (task: ITask): void => {
  emit("taskDoneEvent", task.id, checked.value)
  if (!checked.value) {
    taskName.value?.classList.add('taskDone');
    taskDescription.value?.classList.add('taskDone');
    taskDeadline.value?.classList.add('taskDone');
  } else {
    taskName.value?.classList.remove('taskDone');
    taskDescription.value?.classList.remove('taskDone');
    taskDeadline.value?.classList.remove('taskDone');
  }
};
const taskDeletEvent = (): void => {
  // 傳送事件到父組件去
  emit("deletTask", task.id);
};
const taskEditEvent = (): void => { };
const checkSelectedTask = (id: number): void => {
  if (task.id === id) {

    console.log(task.name);
  }
};
defineExpose({
  checkSelectedTask
})
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
    <div class="TaskStatement">
      <div style="display: flex">
        <h4>TaskName:</h4> <span ref="taskName">{{ task.name }}</span>
      </div>
      <div style="display: flex">
        <h4>Description:</h4><span ref="taskDescription">{{ task.description }}</span>
      </div>
      <div style="display: flex">
        <h4>Deadline:</h4><span ref="taskDeadline">{{ task.deadline }}</span>
      </div>
    </div>
    <div class="editTask">

      <div class="checkbox-wrapper-44">
        <label class="toggleButton">
          <input type="checkbox" @click="jobDoneEvent(task)" v-model="checked">
          <div>
            <svg viewBox="0 0 44 44">
              <path
                d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
                transform="translate(-2.000000, -2.000000)"></path>
            </svg>
          </div>
        </label>
      </div>


      <button class="iconButton" @click="taskDeletEvent">
        <VIcon class="icon" name="ri-delete-bin-2-line" />
      </button>
      <button class="iconButton" @click="">
        <VIcon class="icon" name="fa-edit" />
      </button>
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
  grid-template-columns: 3fr 1fr;
  /* 两个列的比例是 3:1 */
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
  overflow: hidden;

  * h4 {
    font-family: "Monospace", monospace;
    padding: 0;
    margin: 0;
  }

  *span {
    display: inline-block;
    max-height: 1em;
    /* 适当调整最大高度 */
    overflow: hidden;
    text-overflow: ellipsis;
    /* 在内容超出最大高度时显示省略号 */
    white-space: nowrap;
    /* 防止内容换行 */
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

.iconButton {
  // 移除button格式
  background-color: transparent;
  border: none;
  margin: .6em;
  padding: 0;
  text-align: inherit;
  font: inherit;
  border-radius: 0;
  appearance: none; // Just in case we missed anything.
}

.icon {
  width: 2.3em;
  height: 2.3em;
}

.taskDone {
  text-decoration: line-through;
}

.editTask {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

//外部置入
// 隱藏原生元素
.checkbox-wrapper-44 input[type="checkbox"] {
  display: none;
  visibility: hidden;
}

.checkbox-wrapper-44 *,
.checkbox-wrapper-44 *::before,
.checkbox-wrapper-44 *::after {
  box-sizing: border-box;
}

.checkbox-wrapper-44 .toggleButton {
  cursor: pointer;
  display: block;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  transition: transform 0.14s ease;
}

.checkbox-wrapper-44 .toggleButton:active {
  transform: rotateX(30deg);
}

.checkbox-wrapper-44 .toggleButton input+div {
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  position: relative;
  width: 44px;
  height: 44px;
}

.checkbox-wrapper-44 .toggleButton input+div svg {
  fill: none;
  stroke-width: 3.6;
  stroke: #000;
  stroke-linecap: round;
  stroke-linejoin: round;
  width: 44px;
  height: 44px;
  display: block;
  position: absolute;
  left: -3px;
  top: -3px;
  right: -3px;
  bottom: -3px;
  z-index: 1;
  stroke-dashoffset: 124.6;
  stroke-dasharray: 0 162.6 133 29.6;
  transition: all 0.4s ease 0s;
}

.checkbox-wrapper-44 .toggleButton input+div:before,
.checkbox-wrapper-44 .toggleButton input+div:after {
  content: "";
  width: 3px;
  height: 16px;
  background: #000;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 5px;
}

.checkbox-wrapper-44 .toggleButton input+div:before {
  opacity: 0;
  transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  -webkit-animation: bounceInBefore-44 0.3s linear forwards 0.3s;
  animation: bounceInBefore-44 0.3s linear forwards 0.3s;
}

.checkbox-wrapper-44 .toggleButton input+div:after {
  opacity: 0;
  transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  -webkit-animation: bounceInAfter-44 0.3s linear forwards 0.3s;
  animation: bounceInAfter-44 0.3s linear forwards 0.3s;
}

.checkbox-wrapper-44 .toggleButton input:checked+div svg {
  stroke-dashoffset: 162.6;
  stroke-dasharray: 0 162.6 28 134.6;
  transition: all 0.4s ease 0.2s;
}

.checkbox-wrapper-44 .toggleButton input:checked+div:before {
  opacity: 0;
  transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  -webkit-animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
  animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
}

.checkbox-wrapper-44 .toggleButton input:checked+div:after {
  opacity: 0;
  transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  -webkit-animation: bounceInAfterDont-44 0.3s linear forwards 0s;
  animation: bounceInAfterDont-44 0.3s linear forwards 0s;
}

@-webkit-keyframes bounceInBefore-44 {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  }

  50% {
    opacity: 0.9;
    transform: scale(1.1) translate(-50%, -50%) rotate(45deg);
  }

  80% {
    opacity: 1;
    transform: scale(0.89) translate(-50%, -50%) rotate(45deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }
}

@keyframes bounceInBefore-44 {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  }

  50% {
    opacity: 0.9;
    transform: scale(1.1) translate(-50%, -50%) rotate(45deg);
  }

  80% {
    opacity: 1;
    transform: scale(0.89) translate(-50%, -50%) rotate(45deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }
}

@-webkit-keyframes bounceInAfter-44 {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  }

  50% {
    opacity: 0.9;
    transform: scale(1.1) translate(-50%, -50%) rotate(-45deg);
  }

  80% {
    opacity: 1;
    transform: scale(0.89) translate(-50%, -50%) rotate(-45deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }
}

@keyframes bounceInAfter-44 {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  }

  50% {
    opacity: 0.9;
    transform: scale(1.1) translate(-50%, -50%) rotate(-45deg);
  }

  80% {
    opacity: 1;
    transform: scale(0.89) translate(-50%, -50%) rotate(-45deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }
}

@-webkit-keyframes bounceInBeforeDont-44 {
  0% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }

  100% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  }
}

@keyframes bounceInBeforeDont-44 {
  0% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }

  100% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  }
}

@-webkit-keyframes bounceInAfterDont-44 {
  0% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }

  100% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  }
}

@keyframes bounceInAfterDont-44 {
  0% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }

  100% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  }
}
</style>