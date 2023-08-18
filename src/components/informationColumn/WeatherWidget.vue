<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from "axios";
defineProps({
  msg: String,
})
onMounted(async () => {
const options = {
  method: 'GET',
  url: 'http://api.weatherapi.com/v1',
  param:{
    
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
})
const count = ref(0)
</script>

<template>
  <div class="weatherContainer">

  </div>
</template>

<style scoped lang="scss">
.weatherContainer {
  width: 11em;
  height: 13em;
  background-color: black;
  border-radius: 1em;
}
</style>
