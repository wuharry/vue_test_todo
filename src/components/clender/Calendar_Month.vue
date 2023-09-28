<template>
    <div class="calendar-body">
        <!-- 星期顯示 -->
        <div class="Week" v-for="day in calWeekDays">
            {{ day }}
        </div>
        <!--前一個月多出的天數  -->
        <!-- <div></div> -->
        <!-- 月天數顯示 -->
        <div v-for="day in currentMonthDays">
            <div class="Day">
                {{ day }}
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const localDate = ref(new Date()); //當前時間'固定'
const year = computed(() => localDate.value.getFullYear());
const calMonthName = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const month = computed(() => calMonthName[localDate.value.getMonth()]);
const today = computed(() => localDate.value.getDate());//當前日期
const calWeekDays = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
const currentMonthDays = ref<string[]>([]);//當前月天數
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

// 獲取當月第一天星期
const firstDayNumber = (): number => {
    return firstDay().getDay();
}

// 獲取當月最後一天星期
const lastDay = (): Date => {
    return new Date(localDate.value.getFullYear(), localDate.value.getMonth() + 1, 0);
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
const setCalenderData = (): void => {
    currentMonthDays.value = [];
    // 補上前一個月多出顯示的天數
    let firstDay = firstDayNumber();//該月第一天
    for (let day = 0; day < firstDay; day++) {
        currentMonthDays.value.push(" ");
    }
    const daysPerMonth = daysInMonth(year.value, (localDate.value.getMonth() + 1));
    for (let day = 1; day <= daysPerMonth; day++) {
        currentMonthDays.value.push(day.toString());
        if (day === today.value) {
            todayindex.value = currentMonthDays.value.indexOf(day.toString());
        }
    }
    // 補上下一個月的天數(如果長度可以被7整除就不用加如果沒有的話就push)
    if (currentMonthDays.value.length % 7 != 0) {
        let nextmonthday = currentMonthDays.value.length % 7;
        for (let index = 0; index < nextmonthday; index++) {
            currentMonthDays.value.push(" ");
        }
    }
}
setCalenderData();
</script>
<style scoped lang='scss'>
@mixin custom-border {
    font-size: 1rem;
    line-height: 1.5rem;
    text-align: center;
    box-sizing: border-box;
    border-style: solid;
    border-color: #c1c8cf;
    border-width: 1px;
}

.calendar-body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-template-rows: 20px repeat(5, minmax(0, 1fr));

}

.Week {
    @include custom-border;
}

.Day {
    @include custom-border;
    width: 100%;
    height: 6.8em;
}

@keyframes slideIn {
    0% {}

    100% {
        background-color: rgb(202, 182, 182);
    }
}

.Day:hover {
    animation: slideIn .45s 0s cubic-bezier(0.175, 0.885, 0.320, 1.275);
}
</style>