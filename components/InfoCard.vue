<script setup lang="ts">
interface Props {
  title: string
  value: string
  icon: string
}

const props = defineProps<Props>()
</script>

<template>
  <UCard class="relative z-0 grid-cols-subgrid">
    <p>{{ title }}</p>
    <p>{{ value }}</p>
    <Icon :name="icon" size="6em" class="absolute -z-10 bottom-0 right-0 text-gray-300" />
  </UCard>
</template>
