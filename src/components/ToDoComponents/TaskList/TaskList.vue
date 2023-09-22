<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from "vue";
import { ITask } from '@/types/Task';
import TaskItem from "../TaskItem/TaskItem.vue";
import Dialog from "./Dialog.vue";
import { firebaseInit } from "../../../firebaseInit";
import { collection, getDocs, getFirestore, setDoc, doc, deleteDoc, query, where, orderBy, updateDoc } from "firebase/firestore";
import style from './TaskList_style.module.scss';
let task = ref<ITask>({
  id: 0,
  name: "",
  deadline: null,
  priority: null,
  description: null,
  completed: false,
  classification:null
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
const taskProgress = async () => {
  await getTasksData();
  completedTasks.value = 0;
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
  // refresh page
  taskProgress()
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
// 點擊task事件
const taskRef = ref<any>([]);
const setTaskRef = (el: any, index: number) => {
  taskRef.value[index] = el
};
const checkSelectedTask = (id: number): void => {
  taskRef.value.forEach((task: any) => {
    task.checkSelectedTask(id)
  })
}
onMounted(async () => {
  await getTasksData()
  taskProgress()
});

</script>

<template>
  <div :class="style.createTask">
    <div :class="style.userInput">
      <button :class="style.CreatTaskBtn" @click="callTaskDialog">Create Task</button>
      <div :class="style.dialog_Container" v-if="showDialog">
        <Dialog :class="style.dialog_wrapper" @closeDialog="closeDialog" @storeTaskAtBrowser="storeTaskAtBrowser"
          @getTasksData="getTasksData" />
      </div>
    </div>
    <!-- 搜尋 -->
    <!-- <div :class="style.userInput">
      <input type="text" v-model="searchValue" @keyup.enter="searchTask" placeholder="Search Task" />
      <div :class="style.inputFeedback" v-if="isInvalid">
        <span :class="style.icon">❌</span>
        <span :class="style.text">{{ errorMessage }}</span>
      </div>
      <button :class="style.CreatTaskBtn" @click="searchTask">Search Task</button>
    </div> -->
    <!-- 新增分類標籤 -->
    <div :class="style.userInput">
      <input type="text" v-model="searchValue" @keyup.enter="searchTask" placeholder="Enter Tag Name" />
      <div :class="style.inputFeedback" v-if="isInvalid">
        <span :class="style.icon">❌</span>
        <span :class="style.text">{{ errorMessage }}</span>
      </div>
      <!-- <button :class="style.CreatTaskBtn" @click="searchTask">Add Tag</button> -->
    </div>
  </div>
  <div :class="style.showTaskData">
    <div :class="style.taskStatus">
      <span>Task List({{ taskArray.length }} Tasks)</span>
      <div :class="style.progress">
        <!-- 進度條:role="progressbar",aria-valuenow="25",aria-valuemin="0",aria-valuemax="100"
        這些屬性是html原生的-->
        <div :class="style.progressBar" role="progressbar" v-bind:style='"width: " + progreso + "%"' aria-valuenow="25"
          aria-valuemin="0" aria-valuemax="100">{{ progreso }}%
        </div>
      </div>
      <button :class="style.iconButton" @click="deletAllTask">
        <VIcon :class="style.icon" name="ri-delete-bin-2-line" />
      </button>
    </div>

    <div :class="style.taskList">
      <ul>
        <div v-for="(task, index) in taskList" :key="task.id">
          <div @click="checkSelectedTask(task.id)">
            <TaskItem :task="task" @deletTask="deletTask" @taskDoneEvent="taskDoneEvent"
              :ref="(el: any) => setTaskRef(el, index)" />
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>


