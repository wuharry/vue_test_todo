<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div id="ww_bc31ffc8ffc8a" v='1.3' loc='auto'
    a='{"t":"horizontal","lang":"zh-Hant","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"rgba(165,34,246,1)","cl_thund":"rgba(9,59,239,1)"}'>
    <a href="https://weatherwidget.org/zh/" id="ww_bc31ffc8ffc8a_u" target="_blank">天氣插件</a></div>
  <script async src="https://app2.weatherwidget.org/js/?id=ww_bc31ffc8ffc8a"></script>
</template>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}</style>
