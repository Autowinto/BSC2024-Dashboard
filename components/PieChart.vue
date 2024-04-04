<script setup lang="ts">
import type { ChartOptions } from 'chart.js'
import { Pie } from 'vue-chartjs'

const chartData = reactive({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }],
})
</script>

<template>
  <Pie :data="chartData" />
</template>
