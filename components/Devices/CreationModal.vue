<script setup lang="ts">
const isOpen = defineModel('isOpen', { type: Boolean, required: true })
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <span>Add Device</span>
      </template>
      <UForm :state="state" @submit="submitDeviceForm">
        <UFormGroup label="Name" model="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup>
          <USelectMenu />
        </UFormGroup>
        <UFormGroup label="Expected Wattage" model="name">
          <UInput v-model="state.expectedWattage" type="number" inputmode="decimal" step="0.01">
            <template #trailing>
              <span class="text-xs text-gray-400">W</span>
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup label="Expected Active Weekly Hours" model="name">
          <UInput v-model="state.hoursActiveWeek" type="number" inputmode="decimal" step="0.01">
            <template #trailing>
              <span class="text-xs text-gray-400">W</span>
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup label="Description" model="name">
          <UTextarea v-model="state.description" />
        </UFormGroup>
        <UDivider class="my-3" />
        <div class="flex justify-between">
          <UButton type="submit">
            Submit
          </UButton>
          <UButton color="red" @click="cancelForm">
            Cancel
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
