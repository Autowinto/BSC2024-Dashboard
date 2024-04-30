<script setup lang="ts">
const emit = defineEmits(['change'])

const pageSize = defineModel({ default: 10 })
</script>

<template>
  <div class="flex text-sm space-x-1 align-middle">
    <span>Show</span>
    <USelect
      v-model="pageSize"
      :options="[10, 20, 50]"
      size="xs"
      @change="emit('change')"
    />
    <span>rows</span>
  </div>
</template>
