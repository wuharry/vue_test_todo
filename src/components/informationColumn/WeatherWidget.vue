<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
const weatherData = ref({
  location: '',
  tempC: 0,
  humidity: 0,
  uv: 0,
  windKph: 0,
  pm2_5: 0,
});
const fetchWeatherData = async () => {
  const options = {
    method: "GET",
    url: "https://api.weatherapi.com/v1/current.json?key=fed9d997bf574afbace92916231808&q=Taiwan&aqi=yes",
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    weatherData.value.location = response.data.location.name;
    weatherData.value.tempC = response.data.current.temp_c;
    weatherData.value.humidity = response.data.current.humidity;
    weatherData.value.uv = response.data.current.uv;
    weatherData.value.windKph = response.data.current.wind_kph;
    weatherData.value.pm2_5 = response.data.current.air_quality.pm2_5;
    console.log(weatherData.value);
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
      <!-- 溫度,風速,濕度 -->
      <div class="cardTop">
        <!-- 降雨機率暫不提供改為溫度 -->
        <span> {{ weatherData.tempC }}</span>
        <span> {{ weatherData.windKph }}</span>
        <span>{{ weatherData.humidity }}</span>
      </div>
      <!-- pm2.5,uv,天氣 -->
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

.cardTop {
  display: flex;
  justify-content: space-around;
}
</style>
