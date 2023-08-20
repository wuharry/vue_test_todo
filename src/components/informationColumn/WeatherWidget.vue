<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

console.log(`天氣啟動`);
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
console.log(`圓神啟動`);

const count = ref(0);
</script>

<template>
  <div class="weatherContainer"></div>
</template>

<style scoped lang="scss">
.weatherContainer {
  width: 11em;
  height: 13em;
  background-color: black;
  border-radius: 1em;
}
</style>
