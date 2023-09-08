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
import { WeatherWidget, Calendar } from "../components/informationColumn";
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
watchEffect(() => { });
// 使用toRefs解構
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
});
</script>

<template>
  <div class="container">
    <div class="context">
      <span>Notes</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgb(226, 232, 240);
  display: flex;
  letter-spacing: 0.025em;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-family: "Monospace", monospace;
  font-weight: 700;
}
.context {
  flex: 8;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  font-family: "Monospace", monospace;
}
</style>
