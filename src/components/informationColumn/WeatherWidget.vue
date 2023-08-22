<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
const weatherData = ref({
  location: "",
  tempC: 0,
  humidity: 0,
  uv: 0,
  windKph: 0,
  pm2_5: 0,
  weather: "",
});
const fetchWeatherData = async () => {
  const options = {
    method: "GET",
    url: "https://api.weatherapi.com/v1/current.json?key=fed9d997bf574afbace92916231808&q=Taiwan&aqi=yes",
  };
  try {
    const response = await axios.request(options);
    weatherData.value.location = response.data.location.name;
    weatherData.value.tempC = response.data.current.temp_c;
    weatherData.value.humidity = response.data.current.humidity;
    weatherData.value.uv = response.data.current.uv;
    weatherData.value.windKph = response.data.current.wind_kph;
    weatherData.value.pm2_5 = response.data.current.air_quality.pm2_5;
    weatherData.value.weather = response.data.current.condition.text;
    console.log(weatherData.value);
  } catch (error) {
    console.log(`失敗`);
    console.error(error);
  }
};

fetchWeatherData();
let meteorological = ref('');
const weatherJudgment = (weather: string) => {
  if (weather == 'Clear' || weather == 'Partly cloudy') {
    meteorological.value = 'sun'
    return
  }
  // 夜晚
  // if () {
  //   return 'moon'
  // }

  if (weather == 'Cloudy' || weather == 'Overcast' || weather == 'Mist' || weather == 'Fog') {
    meteorological.value = 'Cloudy'
    return
  }
  if (weather == 'Freezing fog' || weather == 'Patchy snow nearby' || weather == 'Blowing snow'
    || weather == 'Blizzard' || weather == 'Patchy freezing drizzle nearby') {
    meteorological.value = 'stormy'
    return
  }
  if (weather == 'Patchy rain nearby' || weather == 'Patchy sleet nearby'
    || weather == 'Thundery outbreaks in nearby' || weather == 'Patchy light rain in area with thunder'
    || weather == 'Patchy light snow in area with thunder'
    || weather == 'Patchy moderate snow in area with thunder'
    || weather == 'Moderate or heavy snow in area with thunder'
  ) {
    meteorological.value = 'breezy'
    return
  }
  //  之前沒有資料的話
  return
}
const weatherCardRef = ref();
let prevClass = '';
watch(
  () => weatherData.value.weather,
  (newValue, oldValue) => {
    weatherJudgment(newValue);
    meteorological.value = 'night'
    console.log(meteorological.value);

    switch (meteorological.value) {
      case "sun":
        weatherCardRef.value.classList.add("hot");
        weatherCardRef.value.classList.add("cardFont");
        // weatherCardRef.value.classList.remove(prevClass);
        break;
      case "Cloudy":
        weatherCardRef.value.classList.add("cloudy");
        weatherCardRef.value.classList.add("cardFont2");
        // weatherCardRef.value.classList.remove(prevClass);
        break;
      case "stormy":
        weatherCardRef.value.classList.add("stormy");
        weatherCardRef.value.classList.add("cardFont2");
        // weatherCardRef.value.classList.remove(prevClass);
        break;
      case "breezy":
        weatherCardRef.value.classList.add("breezy");
        weatherCardRef.value.classList.add("cardFont");
        // weatherCardRef.value.classList.remove(prevClass);
        break;
      case "night":
        weatherCardRef.value.classList.add("night");
        weatherCardRef.value.classList.add("cardFont");
        // weatherCardRef.value.classList.remove(prevClass);
        break;
      default:
        break;
    }
    prevClass = meteorological.value;
  }
);
</script>

<template>
  <div>
    <!-- <p>Weather Widget Content Here</p> -->
    <div class="cardBackground" ref="weatherCardRef">
      <span class="sun" v-if="meteorological === 'sun'"></span>
      <span class="sunx" v-if="meteorological === 'sun'"></span>
      <span class="cloud" v-if="meteorological === 'Cloudy'"></span>
      <span class="cloudx" v-if="meteorological === 'Cloudy'"></span>
      <span class="snowe" v-if="meteorological === 'stormy'"></span>
      <span class="snowex" v-if="meteorological === 'stormy'"></span>
      <span class="stick" v-if="meteorological === 'stormy'"></span>
      <span class="stick2" v-if="meteorological === 'stormy'"></span>
      <span class="cloudr" v-if="meteorological === 'breezy'"></span>
      <span class="moon" v-if="meteorological === 'night'"></span>
      <span class="spot1" v-if="meteorological === 'night'"></span>
      <span class="spot2" v-if="meteorological === 'night'"></span>
      <div class="weatherCard">
        <!-- 溫度,風速,濕度 -->
        <div class="cardTop">
          <!-- 降雨機率暫不提供改為溫度 -->
          <div>
            <VIcon class="" name="la-temperature-high-solid" />
            <span>{{ weatherData.tempC }}</span>
          </div>
          <div>
            <VIcon class="" name="ri-windy-line" />
            <span> {{ weatherData.windKph }}</span>
          </div>
          <div>
            <VIcon class="" name="wi-humidity" />
            <span>{{ weatherData.humidity }}</span>
          </div>
        </div>
        <!-- pm2.5,uv,天氣 -->
        <div class="cardMid">
          <!-- <div>
          <VIcon class="" name="" />
          <span>{{ }}</span>
        </div> -->
          <div>
            <VIcon class="" name="" />
            <span>{{}}</span>
          </div>
          <!-- <div>
          <VIcon class="" name="" />
          <span>{{ }}</span>
        </div> -->
          <div>
            <VIcon class="" name="" />
            <span>{{}}</span>
          </div>
        </div>
        <!-- 位置,時間(根據時間,天氣背景也要更換) -->
        <div></div>
        <!-- 氣候圖片 -->
        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./style.scss"></style>
