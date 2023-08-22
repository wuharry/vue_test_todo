<template>
    <div class="calendar">
        <div class="calendar-inner">
            <div class="calendar-controls">
                <div class="calendar-prev">
                    <a href="#" @click="navigateToPreviousMonth">
                        <!-- SVG 图标代码 -->
                    </a>
                </div>
                <div class="calendar-year-month">
                    <div class="calendar-month-label">{{ calMonthName[calendar.getMonth()] }}</div>
                    <div>-</div>
                    <div class="calendar-year-label">{{ calendar.getFullYear() }}</div>
                </div>
                <div class="calendar-next">
                    <a href="#" @click="navigateToNextMonth">
                        <!-- SVG 图标代码 -->
                    </a>
                </div>
            </div>
            <div class="calendar-today-date">
                Today: {{ calWeekDays[localDate.getDay()] }}, {{ localDate.getDate() }}, {{
                    calMonthName[localDate.getMonth()] }} {{ localDate.getFullYear() }}
            </div>
            <div class="calendar-body">
                <!-- 日历内容 -->
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const calendar = ref(new Date());
const localDate = ref(new Date());
const calWeekDays = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
const calMonthName = ref([
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]);

function daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

function firstDay(): Date {
    return new Date(calendar.value.getFullYear(), calendar.value.getMonth(), 1);
}

function lastDay(): Date {
    return new Date(calendar.value.getFullYear(), calendar.value.getMonth() + 1, 0);
}

function firstDayNumber(): number {
    return firstDay().getDay() + 1;
}

function lastDayNumber(): number {
    return lastDay().getDay() + 1;
}

function getPreviousMonthLastDate(): number {
    return new Date(calendar.value.getFullYear(), calendar.value.getMonth(), 0).getDate();
}

function navigateToPreviousMonth(): void {
    calendar.value.setMonth(calendar.value.getMonth() - 1);
    attachEventsOnNextPrev();
}

function navigateToNextMonth(): void {
    calendar.value.setMonth(calendar.value.getMonth() + 1);
    attachEventsOnNextPrev();
}

function navigateToCurrentMonth(): void {
    const currentMonth = localDate.value.getMonth();
    const currentYear = localDate.value.getFullYear();
    calendar.value.setMonth(currentMonth);
    calendar.value.setFullYear(currentYear); // 使用 setFullYear
    attachEventsOnNextPrev();
}

function selectDate(e: Event): void {
  const target = e.target as HTMLElement;
  console.log(`${target.textContent} ${calMonthName.value[calendar.value.getMonth()]} ${calendar.value.getFullYear()}`);
}

function plotSelectors(): void {
    // 在模板中实现即可
}

function plotDayNames(): void {
    // 在模板中实现即可
}

function plotDates(): void {
    // 在模板中实现即可
}

function attachEvents(): void {
    // 在模板中实现即可
}

function highlightToday(): void {
    // 在模板中实现即可
}



function attachEventsOnNextPrev(): void {
    plotDates();
    attachEvents();
}

onMounted(() => {
    plotSelectors();
    plotDates();
    attachEvents();
});

</script>
  
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&display=swap');

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
    position: relative;
    max-width: 400px;
    /*change as per your design need */
    min-width: 320px;
    background: var(--calendar-bg-color);
    color: var(--calendar-font-color);
    margin: 20px auto;
    box-sizing: border-box;
    overflow: hidden;
    font-weight: normal;
    border-radius: var(--calendar-border-radius);
}

.calendar-inner {
    padding: 10px 10px;
}

.calendar .calendar-inner .calendar-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
}

.calendar .calendar-inner .calendar-body div {
    padding: 4px;
    min-height: 30px;
    line-height: 30px;
    border: 1px solid transparent;
    margin: 10px 2px 0px;
}

.calendar .calendar-inner .calendar-body div:nth-child(-n+7) {
    border: 1px solid transparent;
    border-bottom: 1px solid var(--weekdays-border-bottom-color);
}

.calendar .calendar-inner .calendar-body div:nth-child(-n+7):hover {
    border: 1px solid transparent;
    border-bottom: 1px solid var(--weekdays-border-bottom-color);
}

.calendar .calendar-inner .calendar-body div>a {
    color: var(--calendar-font-color);
    text-decoration: none;
    display: flex;
    justify-content: center;
}

.calendar .calendar-inner .calendar-body div:hover {
    border: 1px solid var(--calendar-date-hover-color);
    border-radius: 4px;
}

.calendar .calendar-inner .calendar-body div.empty-dates:hover {
    border: 1px solid transparent;
}

.calendar .calendar-inner .calendar-controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.calendar .calendar-inner .calendar-today-date {
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

.calendar .calendar-inner .calendar-controls .calendar-year-month {
    display: flex;
    min-width: 100px;
    justify-content: space-evenly;
    align-items: center;
}

.calendar .calendar-inner .calendar-controls .calendar-next {
    text-align: right;
}

.calendar .calendar-inner .calendar-controls .calendar-year-month .calendar-year-label,
.calendar .calendar-inner .calendar-controls .calendar-year-month .calendar-month-label {
    font-weight: 500;
    font-size: 20px;
}

.calendar .calendar-inner .calendar-body .calendar-today {
    background: var(--calendar-today-color);
    border-radius: 4px;
}

.calendar .calendar-inner .calendar-body .calendar-today:hover {
    border: 1px solid transparent;
}

.calendar .calendar-inner .calendar-body .calendar-today a {
    outline: 2px solid var(--calendar-today-innerborder-color);
}

.calendar .calendar-inner .calendar-controls .calendar-next a,
.calendar .calendar-inner .calendar-controls .calendar-prev a {
    color: var(--calendar-font-color);
    font-family: arial, consolas, sans-serif;
    font-size: 26px;
    text-decoration: none;
    padding: 4px 12px;
    display: inline-block;
    background: var(--calendar-nextprev-bg-color);
    margin: 10px 0 10px 0;
}

.calendar .calendar-inner .calendar-controls .calendar-next a svg,
.calendar .calendar-inner .calendar-controls .calendar-prev a svg {
    height: 20px;
    width: 20px;
}

.calendar .calendar-inner .calendar-controls .calendar-next a svg path,
.calendar .calendar-inner .calendar-controls .calendar-prev a svg path {
    fill: var(--next-prev-arrow-color);
}

.calendar .calendar-inner .calendar-body .prev-dates,
.calendar .calendar-inner .calendar-body .next-dates {
    color: var(--calendar-prevnext-date-color);
}

.calendar .calendar-inner .calendar-body .prev-dates:hover,
.calendar .calendar-inner .calendar-body .next-dates:hover {
    border: 1px solid transparent;
    pointer-events: none;
}
</style>