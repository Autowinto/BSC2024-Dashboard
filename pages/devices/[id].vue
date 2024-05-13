<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <NuxtLayout>
    <UCard class="h-full">
      {{ route.params.id }}
    </UCard>
  </NuxtLayout>
</template>
