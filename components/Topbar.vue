<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const dropdownItems: DropdownItem[] | DropdownItem[][] = [
  [
    { label: 'Profile' },
  ],
  [
    { label: 'Sign Out', to: '/login' },
  ],
]

const colorMode = useColorMode()

function toggleColorMode() {
  if (colorMode.preference !== 'light')
    colorMode.preference = 'light'
  else
    colorMode.preference = 'dark'
}
</script>

<template>
  <div class="flex flex-col ">
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
            USER PROFILE NAME HERE
            <Icon name="carbon:chevron-down" />
          </UButton>
        </UDropdown>
      </div>
    </div>
  </div>
</template>
