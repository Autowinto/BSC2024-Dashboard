<script setup lang="ts">
import type { DropdownItem, VerticalNavigationLink } from '#ui/types'

const colorMode = useColorMode()

function toggleColorMode() {
  if (colorMode.preference !== 'light')
    colorMode.preference = 'light'
  else
    colorMode.preference = 'dark'
}

const navLinks: VerticalNavigationLink[] | VerticalNavigationLink[][] = [
  [
    { label: 'Home', to: '/' },
    { label: 'Meters', to: '/meters' },
  ],
  [
    { label: 'About' },
  ],
]

const dropdownItems: DropdownItem[] | DropdownItem[][] = [
  [
    { label: 'Profile' },
  ],
  [
    { label: 'Sign Out', to: '/login' },
  ],
]
</script>

<template>
  <div class="flex flex-col flex-grow min-h-screen">
    <div class="p-4 border-b-2">
      <div class="text-2xl w-48 inline-block">
        Meterpreter
      </div>
      <Search class=" w-1/4 inline-flex" />
      <div class="inline-block-flex space-x-4 float-right">
        <div class="inline">
          <UButton variant="ghost" color="black" @click="toggleColorMode">
            <Icon :name="$colorMode.preference === 'dark' ? 'carbon:sun' : 'carbon:moon'" />
          </UButton>
        </div>

        <UDropdown :items="dropdownItems">
          <UButton>
            Options
            <Icon name="carbon:chevron-down" />
          </UButton>
        </UDropdown>
      </div>
    </div>
    <div class="flex flex-grow">
      <UVerticalNavigation class="w-48 p-4 border-r-2" :links="navLinks" />
      <div class="p-3 w-full">
        <slot />
      </div>
    </div>
  </div>
</template>
