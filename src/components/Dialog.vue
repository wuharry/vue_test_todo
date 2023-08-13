<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
<div class="dialogContain">
  <span>
    Add New Task
  </span>
</div>
</template>

<style scoped>
.dialogContain {
  background-color: rgb(226,232,240);
}
</style>
