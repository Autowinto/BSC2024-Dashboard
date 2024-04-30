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
</script>

<template>
  <NuxtLayout>
    <div class="grid grid-cols-12 space-x-3 mb-3">
      <UCard class="col-span-4">
        <span class="text-lg">Active Measuring Devices</span>
        <span class="text-lg float-right">0/2</span>
      </UCard>
      <UCard class="col-span-4">
        <span class="text-lg">Current Actual Power Usage</span>
        <span class="text-lg float-right text-green-500">281.54W</span>
      </UCard>
      <UCard class="col-span-4">
        <span class="text-lg">Current Measured Power Usage</span>
        <span class="text-lg float-right text-green-500">56.61W</span>
      </UCard>
    </div>
    <UCard>
      <div class="flex">
        <USelect v-model="selectedEnergyComparison" class="w-32" :options="energyComparisonOptions" />
        <UButton class="ml-auto" variant="outline">
          Generate Report
        </UButton>
      </div>
      <UDivider class="my-4" />
      <EnergyComparisonChart />
    </UCard>
  </NuxtLayout>
</template>
