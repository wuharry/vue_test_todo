

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import TaskList from '@/components/TaskList.vue';
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
const data = reactive({})
/* 獲取後端數據(不需要寫在生命週期)


*/

onBeforeMount(() => {
    //console.log('2.組件掛載頁面之前執行----onBeforeMount')
})
onMounted(() => {
    //console.log('3.-組件掛載到頁面之後執行-------onMounted')
})
watchEffect(() => {
})
// 使用toRefs解構
// let { } = { ...toRefs(data) } 
defineExpose({
    ...toRefs(data)
})

</script>

<template>
    <div class="container">
        <div class="optionList">
            <!-- 左側 -->
        </div>
        <div class="context">
            <span>Task</span>
            <!-- <input>
            <button>Create Task</button> -->
            <TaskList />
        </div>
    </div>
</template>
<style scoped lang='less'>
.container {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100vh;
    background-color: #0be0ef;
    display: flex;
}

.jobLister {
    flex: 4;
    display: grid;
    border: 1px;
}

.context {
    flex: 6;
    display: flex;
}
</style>