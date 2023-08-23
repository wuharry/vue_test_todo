<template>
    <div class="calendar">
        <!-- 上方控制區 -->
        <div class="calendar-controls"></div>
        <!-- 中間區塊 -->
        <div class="calendar-today-date"></div>
        <!-- 最下方日歷 -->
        <div class="calendar-body">
            <!-- 第一排內容 -->

            <!-- 主內容 -->
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const calendarControl = {
    localDate: new Date(),
    // 其他程式碼屬性和方法
};

onMounted(() => {

});
</script>
<style lang="scss" scoped>
:root {
    --calendar-bg-color: #262829;
    --calendar-font-color: #FFF;
    --weekdays-border-bottom-color: #404040;
    --calendar-date-hover-color: #505050;
    --calendar-current-date-color: #1b1f21;
    --calendar-today-color: linear-gradient(to bottom, #03a9f4, #2196f3);
    --calendar-today-innerborder-color: transparent;
    --calendar-nextprev-bg-color: transparent;
    --next-prev-arrow-color: #FFF;
    --calendar-border-radius: 16px;
    --calendar-prevnext-date-color: #484848
}

* {
    padding: 0;
    margin: 0;
}

.calendar {
    font-family: 'IBM Plex Sans', sans-serif;
    padding: 10px 10px;
    max-width: 400px;
    position: relative;
    margin: 20px auto;
    box-sizing: border-box;
    overflow: hidden;
    font-weight: normal;
    border-radius: .5em;
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
    font-size: 20px;
}

.calendar .calendar-controls .calendar-next a,
.calendar .calendar-controls .calendar-prev a {
    color: var(--calendar-font-color);
    font-family: arial, consolas, sans-serif;
    font-size: 26px;
    text-decoration: none;
    padding: 4px 12px;
    display: inline-block;
    background: var(--calendar-nextprev-bg-color);
    margin: 10px 0 10px 0;
}

.calendar .calendar-controls .calendar-next a svg,
.calendar .calendar-controls .calendar-prev a svg {
    height: 20px;
    width: 20px;
}

.calendar .calendar-controls .calendar-next a svg path,
.calendar .calendar-controls .calendar-prev a svg path {
    fill: var(--next-prev-arrow-color);
}

// 中部

.calendar .calendar-today-date {
    display: grid;
    text-align: center;
    cursor: pointer;
    margin: 3px 0px;
    background: var(--calendar-current-date-color);
    padding: 8px 0px;
    border-radius: 10px;
    width: 80%;
    margin: auto;
}

// 底部
.calendar .calendar-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
}

.calendar .calendar-body div {
    padding: 4px;
    min-height: 30px;
    line-height: 30px;
    border: 1px solid transparent;
    margin: 10px 2px 0px;
}

.calendar .calendar-body div:nth-child(-n+7) {
    border: 1px solid transparent;
    border-bottom: 1px solid var(--weekdays-border-bottom-color);
}

.calendar .calendar-body div:nth-child(-n+7):hover {
    border: 1px solid transparent;
    border-bottom: 1px solid var(--weekdays-border-bottom-color);
}

.calendar .calendar-body div>a {
    color: var(--calendar-font-color);
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
    outline: 2px solid var(--calendar-today-innerborder-color);
}
</style>