<script setup lang="ts">
import type { VerticalNavigationLink } from '#ui/types'

const navLinks: VerticalNavigationLink[] | VerticalNavigationLink[][] = [
  [
    { label: 'Home', to: '/' },
    { label: 'Areas', to: '/areas' },
    { label: 'Devices', to: '/devices' },
  ],
  [
    { label: 'About', to: '/about' },
  ],
]
</script>

<template>
  <div class="flex-grow flex">
    <UVerticalNavigation class="w-48 p-4 border-r-2" :links="navLinks" />
    <div class="p-3 w-full">
      <slot />
    </div>
  </div>
</template>
