<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'vue-chartjs';

interface Props {
  device: string
}

const props = defineProps<Props>()

onMounted(() => {
  fetchMeasurements()
})

const measurements = ref([
  { wattage: 12, timeMeasured: '2024-05-13 14:00:00' },
  { wattage: 14, timeMeasured: '2024-05-13 13:00:00' },
  { wattage: 15, timeMeasured: '2024-05-13 12:00:00' },
  { wattage: 8, timeMeasured: '2024-05-13 11:00:00' },
])

async function fetchMeasurements() {
  const data = await useApi().get(`/devices/${props.device}/measurements`)
  console.log(data)
  measurements.value = data.data.items.map((item: any) => ({
    wattage: item.wattage,
    timeMeasured: item.timeMeasured,
  }))
}

const chartData: ChartData<'line'> = computed(() => {
  return {
    labels: measurements.value.map(measurement => measurement.timeMeasured),
    datasets: [
      {
        label: 'Wattage',
        data: measurements.value.map(measurement => measurement.wattage),
        backgroundColor: '#00FFFF',
        borderColor: '#00FFFF',
      },
    ],
  }
})

const chartOptions: ChartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
