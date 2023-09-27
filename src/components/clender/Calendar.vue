<template>
    <div class="calendar-body">
        <!-- 禮拜日那一行 -->
        <div class="test" v-for="day in calWeekDays">
            {{ day }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const localDate = ref(new Date()); //當前時間'固定'
const year = computed(() => localDate.value.getFullYear());
const calMonthName = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const month = computed(() => calMonthName[localDate.value.getMonth()]);
const today = computed(() => localDate.value.getDate());//當前日期
const calWeekDays = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
const currentMonthDays = ref<number[]>([]);//當前月天數
const calendarControl = {
    localDate: new Date(),
    // 其他程式碼屬性和方法
};

// 當前月有幾天
const daysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
}
const firstDay = (): Date => {
    // calendar.value.getMonth() 1月是0,12月是11
    return new Date(localDate.value.getFullYear(), localDate.value.getMonth(), 1);
}
const lastDay = (): Date => {
    return new Date(localDate.value.getFullYear(), localDate.value.getMonth() + 1, 0);
}
// 獲取當月第一天星期
const firstDayNumber = (): number => {
    return firstDay().getDay();
}
const lastDayNumber = (): number => {
    return lastDay().getDay();
}
// 獲取前一個月總天數
const getPreviousMonthLastDate = (): number => {
    let lastDate = new Date(
        localDate.value.getFullYear(),
        localDate.value.getMonth(),
        0
    ).getDate();


    return lastDate;
}
// 導資料到前一個月
const navigateToPreviousMonth = (): void => {
    localDate.value = new Date(localDate.value.setMonth(localDate.value.getMonth() - 1));
    setCalenderData();
}
// 導資料到後一個月
const navigateToNextMonth = (): void => {
    localDate.value = new Date(localDate.value.setMonth(localDate.value.getMonth() + 1));
    setCalenderData();
}
// 導資料到當前月
const navigateToCurrentMonth = (): void => {
    let currentMonth = calendarControl.localDate.getMonth();
    let currentYear = calendarControl.localDate.getFullYear();
    localDate.value.setMonth(currentMonth);
    localDate.value.setFullYear(currentYear);
    setCalenderData();
}
let todayindex = ref(0);
const setCalenderData = () => {
    currentMonthDays.value = [];
    const firstDayOfMonth = firstDayNumber()
    const daysPerMonth = daysInMonth(year.value, (localDate.value.getMonth() + 1));
    const daysPreMonth = getPreviousMonthLastDate();
    for (let day = firstDayOfMonth; day > 0; day--) {
        currentMonthDays.value.push(daysPreMonth + 1 - day);
    }
    for (let day = 1; day <= daysPerMonth; day++) {
        currentMonthDays.value.push(day);
        if (day === today.value) {
            todayindex.value = currentMonthDays.value.indexOf(day);
        }

    }
}
</script>
<style scoped lang='scss'>
.calendar-body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 20px repeat(5, 1fr);
}

.test {
    display: block;
    border: 1px solid;
    text-align: center;
    justify-content: center;
}
</style>