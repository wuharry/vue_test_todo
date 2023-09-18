<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { ITask } from '@/types/Task';
import TaskItem from "./TaskItem.vue";
import Dialog from "./Dialog.vue";
import { firebaseInit } from "../../firebaseInit";
import { collection, getDocs, getFirestore, setDoc, doc, deleteDoc, query, where, orderBy, updateDoc } from "firebase/firestore";
// const store = useStore();
let task = ref<ITask>({
  id: 0,
  name: "",
  deadline: null,
  priority: null,
  description: null,
  completed: false
});
const { value: taskValue } = task;
let showDialog = ref<boolean>(false);
const callTaskDialog = () => {
  showDialog.value = true;
};
// firebase初始化
const { app, analytics } = firebaseInit();
const database = getFirestore(app);
// 獲取firebase資料庫中"users"的集合


let taskArray = ref<ITask[]>([]);
let taskList = computed(() => taskArray.value);
const getTasksData = async (): Promise<void> => {
  const dbRef = collection(database, "users");
  // 在firebase排序
  const shortedTask = query(dbRef, orderBy('priority'));
  // 獲取排序好的資料
  const querySnapshot = await getDocs(shortedTask);
  // 綁定model
  taskArray.value = querySnapshot.docs.map((doc) => {
    return doc.data() as ITask
  });
}


// let taskArray = computed(() => store.state.task);
const isInvalid = ref<boolean>(false);
const errorMessage = computed(() => (isInvalid.value ? "輸入不正確" : ""));
// 存入localStorage
const storeTaskAtBrowser = (): void => {
  const plainTaskArray = taskArray.value.map((task: ITask) => ({ ...task }));
  localStorage.setItem("taskList", JSON.stringify(plainTaskArray));
};

const submitTask = async (): Promise<void> => {
  isInvalid.value = taskValue.name == "" || taskValue.name == undefined;
  if (isInvalid.value) {
    setTimeout(() => {
      isInvalid.value = false;
    }, 1500);
    return;
  }
  taskValue.priority = 'No matter';
  const newTask = {
    ...taskValue,
    id: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
  };
  // store.dispatch("addTask", newTask);
  const dbRef = collection(database, "users");
  const id = newTask.id.toString()
  const docRef = doc(dbRef, id); // 使用doc函數來創建DocumentReference
  await setDoc(docRef, newTask);
  await getTasksData();
  // 存資料到本地端
  storeTaskAtBrowser();
  for (const key in taskValue) {
    taskValue[key] = "";
  }
};

const deletTask = async (id: number): Promise<void> => {
  const taskID = id.toString();
  const docRef = doc(database, "users", taskID);
  await deleteDoc(docRef);
  await getTasksData()
  storeTaskAtBrowser();
};

const closeDialog = (): void => {
  showDialog.value = false;
};

let progreso = ref(0);
const completedTasks = ref(0);

const calculateCompletionPercentage = (completedTasks: number, total: number): number => {
  const completionPercentage = (completedTasks / total) * 100;
  return completionPercentage
}
// 計算已經完成的task
const taskProgress = () => {
  completedTasks.value = 0;
  console.log(taskArray.value);
  taskArray.value.map((task: ITask) => {
    if (task.completed) {
      completedTasks.value++
    }
  })
  progreso.value = calculateCompletionPercentage(completedTasks.value, taskArray.value.length);
}
const taskDoneEvent = async (taskID: number, checked: boolean): Promise<void> => {
  // 改變firbasetask資料
  const dbRef = collection(database, "users");
  const docRef = doc(dbRef, taskID.toString()); // 使用doc函數來創建DocumentReference
  const newTask = {
    completed: (!checked)
  }
  await updateDoc(docRef, newTask);
  taskProgress()

  // refresh page
  await getTasksData();
  // store.commit('updateTask', taskArray.value);
}
const deletAllTask = (): void => {
  // 在進行deletallTask,使用for迴圈去異步更改state,會間接影響到taskArray(它有computed屬性去監聽state)
  //導致它在for迴圈中會有新的長度並停止for迴圈,所以需要讓foreach迴圈先跑完再影響到畫面跟屬性
  const tempArray = [...taskArray.value]; // 构建临时数组
  tempArray.forEach((task: ITask) => {
    deletTask(task.id);
  });
}

const searchValue = ref<string>('');
const searchTask = async (): Promise<void> => {
  if (searchValue.value !== '') {
    const dbRef = collection(database, "users");
    const queryCondition = query(dbRef, where("name", "==", searchValue.value));
    // 搜尋結果
    const querySnapshot = await getDocs(queryCondition);
    taskArray.value = querySnapshot.docs.map((doc) => {
      return doc.data() as ITask
    });
  } else if (searchValue.value === '') {
    await getTasksData()
  }
}

onMounted(async () => {
  // 之後這邊要抓取後端的store,然後存到localstorge
  // const taskListFromLocalStorage = localStorage.getItem("taskList");
  // const preTaskList: ITask[] = taskListFromLocalStorage
  //   ? JSON.parse(taskListFromLocalStorage)
  //   : [];
  // store.commit('updateTask', preTaskList);
  await getTasksData()
  taskProgress()
});

</script>

<template>
  <div class="createTask">
    <div class="userInput">
      <input type="text" v-model="task.name" @keyup.enter="submitTask" placeholder="Task Name" />
      <div class="inputFeedback" v-if="isInvalid">
        <span class="icon">❌</span>
        <span class="text">{{ errorMessage }}</span>
      </div>
      <button class="CreatTaskBtn" @click="callTaskDialog">Create Task</button>
      <Dialog v-if="showDialog" @closeDialog="closeDialog" @storeTaskAtBrowser="storeTaskAtBrowser"
        @getTasksData="getTasksData" />
    </div>
    <div class="userInput">
      <input type="text" v-model="searchValue" @keyup.enter="searchTask" placeholder="Search Task" />
      <div class="inputFeedback" v-if="isInvalid">
        <span class="icon">❌</span>
        <span class="text">{{ errorMessage }}</span>
      </div>
      <button class="CreatTaskBtn" @click="searchTask">Search Task</button>
    </div>

  </div>
  <div class="showTaskData">
    <div class="taskStatus">
      <span>Task List({{ taskArray.length }} Tasks)</span>
      <div class="progress">
        <!-- 進度條:role="progressbar",aria-valuenow="25",aria-valuemin="0",aria-valuemax="100"
        這些屬性是html原生的-->
        <div class="progressBar" role="progressbar" v-bind:style='"width: " + progreso + "%"' aria-valuenow="25"
          aria-valuemin="0" aria-valuemax="100">{{ progreso }}%
        </div>
      </div>
      <button class="iconButton" @click="deletAllTask">
        <VIcon class="icon" name="ri-delete-bin-2-line" />
      </button>
    </div>

    <div class="taskList">
      <ul>
        <div v-for="task in taskList" :key="task.id">
          <TaskItem :task="task" @deletTask="deletTask" @taskDoneEvent="taskDoneEvent" />
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.createTask {
  display: flex;
  width: 100%;
  justify-content: space-around;
  height: 2.5em;
  font-family: "Monospace", monospace;
  margin-bottom: 2em;
}

.userInput {
  display: flex;
  flex-direction: row;
  align-items: start;

  input::placeholder {
    color: rgba(206, 184, 184, 0.671);
  }
}

.inputFeedback {
  font-size: smaller;
  color: rgba(248, 10, 10, 0.852);
}

.optionalInput {
  display: flex;
  visibility: hidden;
  opacity: 0;
  width: 20em;
  margin-top: 10px;
  transition: visibility 0s linear 0.33s, opacity 0.33s linear;
}

.showExtraInput {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
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
  font-size: 12px;
  outline: 0;
  font: inherit;
  width: 10em;
  height: 1em;

  &:focus {
    outline: none;
  }
}

.CreatTaskBtn {
  width: 25%;
  height: 5em;
  border-radius: 0.5rem;
  border-width: 2px;
  border-color: transparent;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: .5rem;
  padding-right: .5rem;
  margin-left: .4em;
  background-color: rgb(34, 132, 245);
  color: white;
  font-size: 50%;
  text-align: center;
}

/* button {
  width: 20%;
} */
.taskStatus {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.progress {
  display: flex;
  height: 1rem;
  width: 20em;
  overflow: hidden;
  line-height: 0;
  font-size: .75rem;
  background-color: #bec1c5;
  border-radius: 0.25rem;
}

.progressBar {
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #007bff;
  transition: width .6s ease;
}

.iconButton {
  // 移除button格式
  background-color: transparent;
  width: 2.2em;
  height: 2.2em;
  border: none;
  margin: .6em;
  padding: 0;
  text-align: inherit;
  font: inherit;
  border-radius: 0;
  appearance: none; // Just in case we missed anything.

  svg {
    width: 100%;
    height: 100%;
  }
}

.taskList {
  display: flex;
  width: 100%;

  ul {
    width: 90%;
  }
}

.showTaskData {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  // height: 2.5em;
  padding: .5em 1em;
  font-family: "Monospace", monospace;
}
</style>
