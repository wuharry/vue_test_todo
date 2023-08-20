<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
const fetchWeatherData = async () => {
  const options = {
    method: "GET",
    url: "https://api.weatherapi.com/v1/current.json?key=fed9d997bf574afbace92916231808&q=Taiwan&aqi=yes",
  };
  try {
    const response = await axios.request(options);
    console.log(`天氣`);
    console.log(response.data);
  } catch (error) {
    console.log(`失敗`);
    console.error(error);
  }
};

fetchWeatherData();

const count = ref(0);
</script>

<template>
  <div>
    <!-- <p>Weather Widget Content Here</p> -->
    <div class="weatherCard">
      <!-- 降雨機率,風速,濕度 -->
      <div></div>
      <!-- 溫度,溫度range -->
      <div></div>
      <!-- 位置,時間(根據時間,天氣背景也要更換) -->
      <div></div>
      <!-- 氣候圖片 -->
      <div></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weatherCard {
  width: 15em;
  height: 17em;
  margin-top: 1em;
  background-color: rgba(29, 126, 222, 0.388);
  border-radius: 1em;
}
</style>
