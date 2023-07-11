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
const emailRef = ref<any>('');
const passwordRef = ref<any>('');
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
                    <span ref="emailRef">Email</span>
                    <input type="email" @click="() => {
                        emailRef.classList.add('active')
                        emailRef.classList.remove('remove');
                    }" @blur="() => {
    emailRef.classList.add('remove');
    emailRef.classList.remove('active');
}" />
                    <img src="../../public/mail-outline.svg" style="width: 25px; height: 25px;" alt="SVG Icon" />
                </div>
                <div class="password_sec">
                    <span ref="passwordRef">Password</span>
                    <input type="password" @click="() => {
                        passwordRef.classList.add('active')
                        passwordRef.classList.remove('remove');
                    }" @blur="() => {
    passwordRef.classList.add('remove');
    passwordRef.classList.remove('active');
}" />
                    <img src="../../public/lock-closed-outline.svg" style="width: 25px; height: 25px;" alt="SVG Icon" />
                </div>
            </div>

            <div>
                <input type="checkbox">
                <span>Remeber Me Forget Password</span>
            </div>
            <button class="loginbtn">Login</button>
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
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid white;
    backdrop-filter: blur(8px);
    border-radius: 10px;

    h2 {
        font-weight: bolder;
        font-size: 30px;
    }
}

.input_sec {
    align-items: start;
}

.email_sec {
    margin-top: 30px;
    border-bottom: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
        // max-width: 100%;
        border: none;
        /* 移除边框 */
        background: transparent;
        /* 设置背景为透明 */
        color: white;
        /* 设置文字颜色为透明 */
        outline: none;
        /* 移除聚焦时的边框效果 */
        padding-bottom: 6px;
    }
}

.password_sec {
    border-bottom: 2px solid white;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
        // max-width: 100%;
        border: none;
        /* 移除边框 */
        background: transparent;
        /* 设置背景为透明 */
        color: white;
        /* 设置文字颜色为透明 */
        outline: none;
        /* 移除聚焦时的边框效果 */
        padding-bottom: 6px;
    }

}

.loginbtn {
    width: 60%;
    background-color: white;
    color: black;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
}


.active {
    transition: transform 1s;
    transform: translateY(-100%);
}

.remove {
    transition: transform 1s;
    transform: translateY(0%);
}
</style>