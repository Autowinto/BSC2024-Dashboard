<script setup lang="ts">
useHead({
  title: 'Home',
})

definePageMeta({ alias: '/home' })
</script>

<template>
  <div id="wrapper">
    <NuxtLayout>
      <div class="grid gap-3 grid-cols-12">
        <UCard class="col-span-8">
          <LineChart />
        </UCard>
        <UCard class="col-span-4">
          <PieChart />
        </UCard>
        <UCard class="col-span-8">
          <BarChart />
        </UCard>
        <UCard class="col-span-4">
          <DoughnutChart />
        </UCard>
      </div>
    </NuxtLayout>
  </div>
</template>
