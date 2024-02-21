<script setup lang="ts">
import type { VerticalNavigationLink } from '#ui/types'

const navLinks: VerticalNavigationLink[] | VerticalNavigationLink[][] = [
  [
    { label: 'Home', to: '/' },
    { label: 'Meters', to: '/meters' },
  ],
  [{ label: 'About' }],
]
</script>

<template>
  <div class="flex flex-row min-h-screen">
    <UCard class="w-64">
      <UVerticalNavigation :links="navLinks" />
    </UCard>
    <slot />
  </div>
</template>
