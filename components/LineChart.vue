<script setup lang="ts">
import type { ChartData } from 'chart.js'
import { Line } from 'vue-chartjs'

const chartData: ChartData<'line'> = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Energinet Measurements',
      data: [40, 39, 10, 40, 39, 80, 40],
      backgroundColor: '#00FFFF',
      borderColor: '#00FFFF',
    },
    {
      label: 'Own Measurements',
      data: [54, 31, 18, 13, 432, 3, 6],
      backgroundColor: '#C70039 ',
      borderColor: '#C70039 ',
    },

  ],
}
</script>

<template>
  <Line :data="chartData" :options="{ responsive: true }" />
</template>
