<script lang="ts" setup>
import { onMounted } from "vue"
import { Environment } from '@/babylon/environment';

onMounted(()=> {
  const cvs = document.getElementById("img-canvas") as HTMLCanvasElement
  const environment = new Environment(cvs, true)
  environment.create360Img()
})


</script>
<template>
  <canvas id="img-canvas"></canvas>
</template>
<style lang="scss" scoped>
#img-canvas{
  height: 100%;
  width: 100%;
}
</style>