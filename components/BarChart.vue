<script setup lang="ts">
import { Bar } from 'vue-chartjs'

const chartData = reactive({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }],
})
</script>

<template>
  <Bar :data="chartData" :options="{ responsive: true }" />
</template>
