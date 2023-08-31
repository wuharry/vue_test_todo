<script setup lang="ts">
import * as firebase from "firebase/app";
import "firebase/storage";
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app{
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
