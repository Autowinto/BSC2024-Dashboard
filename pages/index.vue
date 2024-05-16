<script setup lang="ts">
import Papa from 'papaparse';

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

let data: any = reactive({
  external: {
    areas: [
      { id: '1', data: ['8'] },
    ],
  },
  internal: {
    areas: [
      { id: '1', data: ['8'] },
    ],
  },
})

function generateCSV() {
  const csv = Papa.unparse(data.external, {
    delimiter: ',',
  })
  downloadFile(data, 'csv')
}

function generateJSON() {
  const json = JSON.stringify(data)
  downloadFile(json, 'json')
}

function downloadFile(data: any, fileType: 'csv' | 'json' | 'xlsx') {
  const url = URL.createObjectURL(new Blob([data], { type: `text/${fileType}` }))

  const link = document.createElement('a')
  link.download = `power-usage.${fileType}`
  link.href = url
  link.click()

  URL.revokeObjectURL(url)
}

async function fetchPowerUsageData() {
  data = (await useApi().get('/powerUsage', { params: { aggregation: 'Hour' } })).data
  calculateDataPoints()
}

fetchPowerUsageData()

function calculateDataPoints() {

}

const energyChartData = {
  // labels: dataPoints.value.map((_, i) => i + 1),
  datasets: [
    {
      label: 'Energinet',
      data: [],
      backgroundColor: '#00FFFF',
      borderColor: '#00FFFF',
    },
  ],
}
const dataPoints = computed(() => {
  const areas = data.external.areas
  const sums = []
  for (let i = 0; i < areas[0].data.length; i++) {
    let sum = 0

    for (const area of areas)
      sum += Number.parseFloat(area.data[i])

    sums.push(sum)
  }
  energyChartData.datasets[0].data = sums
  return sums
})

const exportDropdownItems = [
  [
    { label: 'Export to CSV', click: generateCSV },
    { label: 'Export to JSON', click: generateJSON },
  ],
]
</script>

<template>
  <NuxtLayout>
    <div class="grid grid-cols-2 gap-3 mb-3">
      <InfoCard class="" title="Active Devices" value="Value" icon="lucide:plug-zap" />
      <InfoCard class="" title="Current Wattage" value="Value" icon="lucide:zap" />
    </div>
    <div class="grid grid-cols-12 gap-3">
      <UCard class="col-span-12">
        <div class="flex">
          <USelect v-model="selectedEnergyComparison" :options="energyComparisonOptions" />
          <UDropdown :items="exportDropdownItems" class="ml-auto">
            <UButton variant="outline">
              Export
              <Icon name="lucide:chevron-down" />
            </UButton>
          </UDropdown>
        </div>
        <UDivider class="my-4" />
        <EnergyComparisonChart :data="energyChartData" />
      </UCard>
    </div>
  </NuxtLayout>
</template>
