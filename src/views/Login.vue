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
watchEffect(() => {
})
// 使用toRefs解構
// let { } = { ...toRefs(data) } 
defineExpose({
    ...toRefs(data)
})

</script>

<template>
    <div class="body">

        <div class="loginform">
            <h2>Login</h2>
            <div class="input_sec">
                <div class="email_sec">
                    <span>Email</span>
                    <input value="email" type="email" />

                </div>
                <div class="password_sec">
                    <span>Password</span>
                    <input value="email" type="password" />

                </div>
            </div>

            <div>
                <input type="checkbox">
                <span>Remeber Me Forget Password</span>
            </div>
            <button>Login</button>
            <div>
                <span>Don't have a account</span>
                <a href="">Regiseter</a>
            </div>
        </div>
    </div>
</template>


<style scoped lang='less'>
* {
    margin: 0;
    padding: 0;
    font-family: "poppins", sans-serif;

}

.body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    max-height: fit-content;
    overflow: hidden;
    background: url("/moonaBackground2.jpg") no-repeat;
    background-size: cover;
    color: white;
}

.loginform {
    margin: 0 auto;
    padding: 0 auto;
    width: 30%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid white;
    backdrop-filter:blur(8px); 
    border-radius: 10px;
    h2{
        font-weight: bolder;
    }
}
.input_sec {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    align-items: start;
}

.email_sec {}

.password_sec {}
</style>