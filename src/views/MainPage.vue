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
import { TaskList } from "../components/ToDoComponents";
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
        <div class="optionList">
            <!-- 左側 -->
            <div class="options">
                <VIcon class="icon" @click="router.push({ name: 'ToDo' })" name="la-list-alt-solid" />
            </div>
            <div class="options">
                <VIcon class="icon" @click="router.push({ name: 'Calendar' })" name="bi-calendar-day" />
            </div>
            <div class="options">
                <VIcon class="icon" @click="router.push({ name: 'Note' })" name="md-noteadd-outlined" />
            </div>
        </div>
        <div class="context">
            <router-view></router-view>
        </div>
        <div class="informationColumn">
            <WeatherWidget />
            <Calendar />
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

.optionList {
    flex: 2;
    display: grid;
    grid-template-columns: auto;
    /* grid 0fr 空間壓縮到內容最小值,auto 自动调整大小以容纳内容的高度或宽度，而不会强制将其大小压缩为最小值。*/
    /* 因為內容會隨著使用者輸入而增加高度,所以我需要將 */
    grid-template-rows: 0fr 0fr 0fr auto;
    gap: 4em;
    justify-items: center;

    /* 將子容器水平置中 */
    border: none;
    background-color: rgb(241, 245, 249);
    // box-shadow: 1px -1px teal;
}

.context {
    flex: 8;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    font-family: "Monospace", monospace;
}

.informationColumn {
    display: grid;
    grid-template-columns: auto;
    /* grid 0fr 空間壓縮到內容最小值,auto 自动调整大小以容纳内容的高度或宽度，而不会强制将其大小压缩为最小值。*/
    grid-template-rows: 0fr 1fr auto;

    /* grid-template-rows: repeat(3, auto); */
    /* 自适应行高 */
    gap: 10px;
    justify-items: center;
    /* 將子容器水平置中 */
    border: none;
    background-color: rgb(241, 245, 249);
    // box-shadow: 1px -1px teal;
}

.options {
    padding-top: .5em;
    height: 6.5em;
}

.options:hover {
    border: 1px;
    border-style: outset;
    border-radius: .5em;
    box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
}

.icon {
    width: 5.5em;
    height: 5.5em;
}
</style>
