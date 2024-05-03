<script setup lang="ts">
import type { ChartData } from 'chart.js';
import { Line } from 'vue-chartjs';

const props = defineProps<{
  data: ChartData<'line'>
}>()

console.log('props', props.data)

const { data } = toRefs(props)

data.value.datasets.push({
  label: 'In-House Measurements',
  data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
  backgroundColor: '#008000',
  borderColor: '#008000',
})

const chartData: ChartData<'line'> = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Energinet Measurements',
      data: [20, 39, 10, 20, 39, 80, 20],
      backgroundColor: '#00FFFF',
      borderColor: '#00FFFF',
    },
    {
      label: 'Own Measurements',
      data: [54, 31, 18, 13, 45, 3, 6],
      backgroundColor: '#C70039 ',
      borderColor: '#C70039 ',
    },
  ],
}
</script>

<template>
  <Line :data="data" :options="{ responsive: true }" />
</template>
