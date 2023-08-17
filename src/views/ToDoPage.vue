<script setup lang="ts">
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import TaskList from "../components/TaskList.vue";
/**
 * 倉庫
 */
const store = useStore();
/**
 * 路由對象
 */
const route = useRoute();
/**
 * 路由實例
 */
const router = useRouter();
//console.log('1-開始創建組件-setup')
/**
 * 數據部分
 */
const data = reactive({});
/* 獲取後端數據(不需要寫在生命週期)


*/

onBeforeMount(() => {
  //console.log('2.組件掛載頁面之前執行----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-組件掛載到頁面之後執行-------onMounted')
});
watchEffect(() => {});
// 使用toRefs解構
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
});
</script>

<template>
  <div class="container">
    <div class="optionList">
      <!-- 左側 -->
      <div class="">Option List</div>
    </div>
    <div class="context">
      <span>Task</span>
      <TaskList />
    </div>
  </div>
</template>
<style scoped lang="less">
.container {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(226, 232, 240);
  display: flex;
  letter-spacing: 0.025em;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-family: "Monospace", monospace;
  font-weight: 700;
}

.optionList {
  flex: 2;
  display: grid;
  //   grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-items: center; /* 將子容器水平置中 */
  border: none;
  background-color: rgb(241, 245, 249);
  box-shadow: 1px -1px teal;
}

.context {
  flex: 10;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  font-family: "Monospace", monospace;
}
</style>
