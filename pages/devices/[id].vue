<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'vue-chartjs';

const route = useRoute()
const deviceId = route.params.id

const deviceName = ref('')

async function fetchDevices() {
  const { data } = await useApi().get(`/devices/${route.params.id}`)
  deviceName.value = data.name
}

onMounted(() => {
  fetchMeasurements()
  fetchDevices()
})

const measurements = ref([
  { wattage: 12, timeMeasured: '2024-05-13 14:00:00' },
  { wattage: 14, timeMeasured: '2024-05-13 13:00:00' },
  { wattage: 15, timeMeasured: '2024-05-13 12:00:00' },
  { wattage: 8, timeMeasured: '2024-05-13 11:00:00' },
])

async function fetchMeasurements() {
  const data = await useApi().get(`/devices/${deviceId}/measurements`)
  console.log(data)
  measurements.value = data.data.items.map((item: any) => ({
    wattage: item.wattage,
    timeMeasured: item.timeMeasured,
  }))

  setTimeout(fetchMeasurements, 10000)
}

const chartData: ComputedRef<ChartData<'line'>> = computed(() => {
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
  <NuxtLayout>
    <UCard>
      <template #header>
        <span>
          History
        </span>
      </template>
      <Line :data="chartData" :options="chartOptions" />
    </UCard>
  </NuxtLayout>
</template>
