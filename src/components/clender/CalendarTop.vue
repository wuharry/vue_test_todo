<template>
 <div ></div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
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
onBeforeMount(() => {
 //console.log('2.組件掛載頁面之前執行----onBeforeMount')
})
onMounted(() => {
 //console.log('3.-組件掛載到頁面之後執行-------onMounted')
})
watchEffect(()=>{
})
// 使用toRefs解構
// let { } = { ...toRefs(data) } 
defineExpose({
 ...toRefs(data)
})

</script>
<style scoped lang='less'>
</style>