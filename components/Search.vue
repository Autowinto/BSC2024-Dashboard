<script setup lang="ts">
const searchOptions = [
  {
    id: 1,
    name: 'Office Area',
    type: 'area',
  },
  {
    id: 2,
    name: 'Bathroom Area ',
    type: 'area',
  },
  {
    id: 3,
    name: 'MacBook',
    type: 'device',
  },
  {
    id: 4,
    name: 'Hotplate',
    type: 'device',
  },
  {
    id: 5,
    name: 'Plug 1',
    type: 'smartplug',
  },
  {
    id: 6,
    name: 'Smart Plug 2',
    type: 'smartplug',
  },
]
</script>

<template>
  <UInputMenu placeholder="Search..." :options="searchOptions" :search-attributes="['type', 'name']">
    <template #option="{ option }">
      <div class="w-screen truncate">
        {{ option.name }}
        <span class="float-right text-gray-400 text-xs">
          {{ option.type }}
        </span>
      </div>
    </template>
  </UInputMenu>
</template>
