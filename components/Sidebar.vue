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
  <div class=" h-full border-r-2">
    <UVerticalNavigation class="p-4" :links="navLinks" />
    <slot />
  </div>
</template>
