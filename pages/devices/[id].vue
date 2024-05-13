<script setup lang="ts">
const route = useRoute()

const deviceName = ref('')

async function fetchDevices() {
  const { data } = await useApi().get(`/devices/${route.params.id}`)
  deviceName.value = data.name
}

onMounted(() => {
  fetchDevices()
})
</script>

<template>
  <NuxtLayout>
    <UCard class="h-full">
      {{ deviceName }}
      <MeasurementsGraph :device="(route.params.id as string)" />
    </UCard>
  </NuxtLayout>
</template>
