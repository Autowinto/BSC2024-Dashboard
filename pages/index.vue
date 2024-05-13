<script setup lang="ts">
useHead({
  title: 'Home',
})

definePageMeta({ alias: '/home' })

enum EnergyComparison {
  Today = 'Today',
  Yesterday = 'Yesterday',
  LastWeek = 'Last Week',
  LastMonth = 'Last Month',
}

const energyComparisonOptions = [
  { name: 'Today', value: EnergyComparison.Today },
  { name: 'Yesterday', value: EnergyComparison.Yesterday },
  { name: 'Last Week', value: EnergyComparison.LastWeek },
  { name: 'Last Month', value: EnergyComparison.LastMonth },
]

const selectedEnergyComparison = ref(EnergyComparison.Today)

function generateReport() {
  console.log('Should generate report')
}

let data = reactive({
  external: {
    areas: [
      { id: '1', data: ['8'] },
    ],
  },
})

async function fetchPowerUsageData() {
  data = (await useApi().get('/powerUsage', { params: { aggregation: 'Hour' } })).data
  calculateDataPoints()
}

fetchPowerUsageData()

function calculateDataPoints() {
  const areas = data.external.areas
  const sums = []
  for (let i = 0; i < areas[0].data.length; i++) {
    let sum = 0

    for (const area of areas)
      sum += Number.parseFloat(area.data[i])

    sums.push(sum)
  }
  return sums
}

const energyChartData = computed(() => {
  return {
    labels: calculateDataPoints().map((_, i) => i + 1),
    datasets: [
      {
        label: 'Energinet',
        data: calculateDataPoints(),
        backgroundColor: '#00FFFF',
        borderColor: '#00FFFF',
      },
    ],
  }
})
</script>

<template>
  <NuxtLayout>
    <div class="grid grid-cols-4 gap-3 mb-3">
      <InfoCard class="" title="Active Devices" value="Value" icon="lucide:plug-zap" />
      <InfoCard class="" title="Current Wattage" value="Value" icon="lucide:zap" />
    </div>
    <div class="grid grid-cols-12 gap-3">
      <UCard class="col-span-8">
        <div class="flex">
          <USelect v-model="selectedEnergyComparison" :options="energyComparisonOptions" />
          <!-- <USelectMenu v-model="selectedMeters" multiple class="ml-2" :options="meterOptions" /> -->
          <UButton class="ml-auto" variant="outline" @click="generateReport">
            Generate Report
          </UButton>
        </div>
        <UDivider class="my-4" />
        <EnergyComparisonChart :data="energyChartData" />
      </UCard>
      <UCard class="col-span-4">
        Card
      </UCard>
    </div>
  </NuxtLayout>
</template>
