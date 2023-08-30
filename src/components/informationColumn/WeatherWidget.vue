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
  time: "",
});
let timestamp: number;
const fetchWeatherData = async (): Promise<void> => {
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
    const dateTimeParts = response.data.current.last_updated.split(" "); // 拆分日期和时间部分
    const dateParts = dateTimeParts[0].split("-"); // 拆分日期的年、月、日部分
    weatherData.value.time = `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
    const timeParts = dateTimeParts[1].split(":");
    const hour = parseInt(timeParts[0]);
    timestamp = hour;
  } catch (error) {
    console.error(error);
  }
  console.log(weatherData.value.weather);

};

fetchWeatherData();
let meteorological = ref("");
const weatherJudgment = (weather: string): void => {
  // 夜晚
  if (timestamp < 6 || timestamp >= 18) {
    meteorological.value = "night";
    return;
  }
  if (weather == "Clear" || weather == "Partly cloudy") {
    meteorological.value = "sun";
    return;
  }
  if (
    weather == "Cloudy" ||
    weather == "Overcast" ||
    weather == "Mist" ||
    weather == "Fog"
  ) {
    meteorological.value = "Cloudy";
    return;
  }
  if (
    weather == "Freezing fog" ||
    weather == "Patchy snow nearby" ||
    weather == "Blowing snow" ||
    weather == "Blizzard" ||
    weather == "Patchy freezing drizzle nearby"
  ) {
    meteorological.value = "stormy";
    return;
  }
  if (
    weather == "Patchy rain nearby" ||
    weather == "Light rain" ||
    weather == "Patchy sleet nearby" ||
    weather == "Thundery outbreaks in nearby" ||
    weather == "Patchy light rain in area with thunder" ||
    weather == "Patchy light snow in area with thunder" ||
    weather == "Patchy moderate snow in area with thunder" ||
    weather == "Moderate or heavy snow in area with thunder"
  ) {
    meteorological.value = "breezy";
    return;
  }
  //  之前沒有資料的話
  return;
};
const weatherCardRef = ref();
watch(
  () => weatherData.value.weather,
  (newValue, oldValue) => {
    weatherJudgment(newValue);
    switch (meteorological.value) {
      case "sun":
        weatherCardRef.value.classList.add("hot");
        weatherCardRef.value.classList.add("cardFont");
        break;
      case "Cloudy":
        weatherCardRef.value.classList.add("cloudy");
        weatherCardRef.value.classList.add("cardFont2");
        break;
      case "stormy":
        weatherCardRef.value.classList.add("stormy");
        weatherCardRef.value.classList.add("cardFont2");
        break;
      case "breezy":
        weatherCardRef.value.classList.add("breezy");
        weatherCardRef.value.classList.add("cardFont");
        break;
      case "night":
        weatherCardRef.value.classList.add("night");
        weatherCardRef.value.classList.add("cardFont");
        break;
      default:
        break;
    }
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
        <!-- pm2.5,天氣,uv -->
        <div class="cardMid">
          <div class="font">
            pm2.5:<span>{{ weatherData.pm2_5 }}</span> UV:<span>{{
              weatherData.uv
            }}</span>
          </div>
          <div class="iconSec">
            <VIcon class="Icon" name="ri-sun-line" />
          </div>
        </div>
        <!-- 位置,時間 -->
        <div class="cardBotton">
          <div>
            <VIcon class="" name="oi-clock" />
            <span>{{ weatherData.location }}</span>
          </div>
          <div>
            <VIcon class="" name="oi-location" />
            <span>{{ weatherData.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./style.scss"></style>
