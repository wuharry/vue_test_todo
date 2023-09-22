<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ITask } from '@/types/Task';
import style from './TaskItem_style.module.scss';
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
checked.value = task.completed;
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
    taskBackground.value.classList.add('taskContentExpand');
  } else {
    taskBackground.value.classList.remove('taskContentExpand');
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
  <div :class="style.taskContain" ref="taskBackground">
    <div :class="style.TaskStatement">
      <div>
        <h4>TaskName:</h4> <span ref="taskName">{{ task.name }}</span>
      </div>
      <div>
        <h4>Description:</h4><span ref="taskDescription">{{ task.description }}</span>
      </div>
      <div>
        <h4>Deadline:</h4><span ref="taskDeadline">{{ task.deadline }}</span>
      </div>
    </div>
    <div :class="style.editTask">
      <div :class="style.checkbox_wrapper_44">
        <label :class="style.toggleButton">
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


      <button :class="style.iconButton" @click="taskDeletEvent">
        <VIcon :class="style.icon" name="ri-delete-bin-2-line" />
      </button>
      <button :class="style.iconButton" @click="">
        <VIcon :class="style.icon" name="fa-edit" />
      </button>
    </div>
  </div>
</template>
