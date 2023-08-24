<template>
  <div class="calendar">
    <!-- 上方控制區 -->
    <div class="calendar-controls">
      <div class="calendar-prev" @click="navigateToPreviousMonth"><a href="#"><svg xmlns="http://www.w3.org/2000/svg"
            width="128" height="128" viewBox="0 0 128 128">
            <path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z" />
          </svg></a></div>
      <div class="calendar-year-month">
        <div class="calendar-month-label">{{ month }}</div>
        <div>-</div>
        <div class="calendar-year-label">
          {{ year }}
        </div>
      </div>
      <div class="calendar-next" @click="navigateToNextMonth"><a href="#"><svg xmlns="http://www.w3.org/2000/svg"
            width="128" height="128" viewBox="0 0 128 128">
            <path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z" />
          </svg></a></div>
    </div>
    <!-- 中間區塊 -->
    <div class="calendar-today-date"></div>
    <!-- 最下方日歷 -->
    <div class="calendar-body">
      <!-- 第一排內容 -->
      <div class="week" v-for="dayOfWeek in calWeekDays">
        {{ dayOfWeek }}
      </div>
      <!-- 主內容  class="number-item" -->
      <div v-for="day in currentMonthDays">
        {{ day }}
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">

import { ref, onMounted, computed } from 'vue';
const localDate = ref(new Date()); //當前時間'固定'
const year = computed(() => localDate.value.getFullYear());
const calMonthName = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const month = computed(() => calMonthName[localDate.value.getMonth()]);
const day = computed(() => localDate.value.getDate());//當前日期
const calWeekDays = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);

const prevMonthDays = ref<number[]>([]); //前一個月天數
const currentMonthDays = ref<number[]>([]);//當前月天數
const nextMonthDays = ref<number[]>([]);//下一個月天數
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
const getPreviousMonthLastDate = () => {
  let lastDate = new Date(
    localDate.value.getFullYear(),
    localDate.value.getMonth(),
    0
  ).getDate();


  return lastDate;
}
// 導資料到前一個月
const navigateToPreviousMonth = () => {
  localDate.value.setMonth(localDate.value.getMonth() - 1);
}
// 導資料到後一個月
const navigateToNextMonth = () => {
  localDate.value.setMonth(localDate.value.getMonth() + 1);
}
// 導資料到當前月
const navigateToCurrentMonth = () => {
  let currentMonth = calendarControl.localDate.getMonth();
  let currentYear = calendarControl.localDate.getFullYear();
  localDate.value.setMonth(currentMonth);
  localDate.value.setFullYear(currentYear);
}


onMounted(() => {
  // currentMonthDays.value 
  const firstDayOfMonth = firstDayNumber()
  const daysPerMonth = daysInMonth(year.value, (localDate.value.getMonth() + 1));
  const daysPreMonth = getPreviousMonthLastDate();
  for (let day = firstDayOfMonth; day > 0; day--) {
    currentMonthDays.value.push(daysPreMonth + 1 - day);
  }
  for (let day = 1; day <= daysPerMonth; day++) {
    currentMonthDays.value.push(day);
  }
});
</script>
<style lang="scss" scoped>
/* --calendar-current-date-color: #1b1f21;
    --calendar-today-color: linear-gradient(to bottom, #03a9f4, #2196f3); */


* {
  padding: 0;
  margin: 0;
}

.calendar {
  font-family: 'IBM Plex Sans', sans-serif;
  padding: 10px 10px;
  max-width: 50rem;
  position: relative;
  margin: 20px auto;
  box-sizing: border-box;
  overflow: hidden;
  font-weight: normal;
  border-radius: .5em;
  background: #1b1f21;
  color: wheat;
}



.calendar .calendar-controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.calendar .calendar-controls .calendar-year-month {
  display: flex;
  min-width: 100px;
  justify-content: space-evenly;
  align-items: center;
}

.calendar .calendar-controls .calendar-next {
  text-align: right;
}

.calendar .calendar-controls .calendar-year-month .calendar-year-label,
.calendar .calendar-controls .calendar-year-month .calendar-month-label {
  font-weight: 500;
  font-size: 16px;
}

.calendar .calendar-controls .calendar-next a,
.calendar .calendar-controls .calendar-prev a {
  color: #FFF;
  font-family: arial, consolas, sans-serif;
  font-size: 16px;
  text-decoration: none;
  padding: 4px 12px;
  display: inline-block;
  background: transparent;
  margin: 10px 0 10px 0;
}

.calendar .calendar-controls .calendar-next a svg,
.calendar .calendar-controls .calendar-prev a svg {
  height: 20px;
  width: 20px;
}

.calendar .calendar-controls .calendar-next a svg path,
.calendar .calendar-controls .calendar-prev a svg path {
  fill: #FFF;
}

// 中部

.calendar .calendar-today-date {
  display: grid;
  text-align: center;
  cursor: pointer;
  margin: 3px 0px;
  background: #1b1f21;
  padding: 8px 0px;
  border-radius: 10px;
  width: 80%;
  margin: auto;
}

// 底部
.calendar .calendar-body {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: 0;

}

.calendar .calendar-body div {
  padding: 1.5px;
  min-height: 30px;
  line-height: 30px;
  border: 1px solid transparent;
  margin: 10px 2px 0px;
}

.calendar .calendar-body div:nth-child(-n+7) {
  border: 1px solid transparent;
  border-bottom: 1px solid #404040;
}

.calendar .calendar-body div:nth-child(-n+7):hover {
  border: 1px solid transparent;
  border-bottom: 1px solid #404040;
}

.calendar .calendar-body div>a {
  color: #FFF;
  text-decoration: none;
  display: flex;
  justify-content: center;
}

.calendar .calendar-body div:hover {
  border: 1px solid var(--calendar-date-hover-color);
  border-radius: 4px;
}

.calendar .calendar-body div.empty-dates:hover {
  border: 1px solid transparent;
}

.calendar.calendar-body .calendar-today:hover {
  border: 1px solid transparent;
}

.calendar.calendar-body .calendar-today a {
  outline: 2px solid transparent;
}

.week {
  font-size: x-small;
  width: 2.5em;
  padding: 0;
  margin: 0;
}
</style>