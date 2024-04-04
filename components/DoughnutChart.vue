<script setup lang="ts">
import type { ChartOptions } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

const chartData = reactive({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }],
})
</script>

<template>
  <Doughnut :data="chartData" />
</template>
