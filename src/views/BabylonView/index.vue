<script lang="ts" setup>
import { onMounted } from "vue"
import { Environment } from '@/babylon/environment';

onMounted(()=> {
  const cvs = document.getElementById("room-canvas") as HTMLCanvasElement
  const environment = new Environment(cvs, true)
  environment.createRoom()
})
</script>
<template>
  <canvas id="room-canvas"></canvas>
</template>
<style lang="scss" scoped>
#room-canvas{
  height: 100%;
  width: 100%;
}
</style>