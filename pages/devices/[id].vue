<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'vue-chartjs';

const route = useRoute()
const deviceId = route.params.id

const deviceName = ref('')

async function fetchDevices() {
  try {
    const { data } = await useApi().get(`/devices/${route.params.id}`)
    deviceName.value = data.name
  }
  catch (error) {
    console.error(error)
    useToast().add({ title: 'Error', description: 'Failed to fetch devices', color: 'red' })
  }
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
  try {
    const data = await useApi().get(`/devices/${deviceId}/measurements`)
    measurements.value = data.data.items.map((item: any) => ({
      wattage: item.wattage,
      timeMeasured: item.timeMeasured,
    }))
  }
  catch (error) {
    console.error(error)
    useToast().add({ title: 'Error', description: 'Failed to fetch measurements', color: 'red' })
  }

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
    x: {
      display: false
    }
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
