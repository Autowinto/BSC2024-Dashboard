<script setup lang="ts">
const rows = ref()

const columns = reactive([
  {
    key: 'name',
    label: 'Name',
    editable: true,
  },
  {
    key: 'expectedWattage',
    label: 'Expected Wattage',
  },
  {
    key: 'measuredWattage',
    label: 'Measured Wattage',
  },
])

const page = ref(1)
const pageSize = ref(10)
const totalItems = ref(1)

function fetchDevices() {
  useApi().get('/devices', { params: { page: page.value, pageSize: pageSize.value } })
    .then((response) => {
      totalItems.value = response.data.totalItems
      rows.value = response.data.items
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  fetchDevices()
})

const isModalOpen = ref(false)

const baseState = {
  name: '',
  expectedWattage: 0,
  description: '',
}

const state = ref({
  name: '',
  expectedWattage: 0,
  description: '',
})

function submitDeviceForm() {
  useApi().post('/devices', state.value)
    .then(() => {
      fetchDevices()
      state.value = baseState
      isModalOpen.value = false
    })
    .catch((error) => {
      console.error(error)
    })
}

function cancelForm() {
  isModalOpen.value = false
  state.value = baseState
}
</script>

<template>
  <UCard class="h-full">
    <div class="flex">
      <PageSizeSelector v-model="pageSize" @change="fetchDevices" />
      <UButton class="ml-auto" variant="outline" @click="isModalOpen = true">
        Add Device
      </UButton>
    </div>
    <UDivider class="my-4" />
    <EditableTable :columns="columns" :rows="rows" />
    <UPagination v-model="page" :page-count="pageSize" :total="totalItems" @update:model-value="fetchDevices" />
  </UCard>
  <UModal v-model="isModalOpen">
    <UCard>
      <template #header>
        <span>Add Device</span>
      </template>
      <UForm :state="state" @submit="submitDeviceForm">
        <UFormGroup label="Name" model="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup label="Expected Wattage" model="name">
          <UInput v-model="state.expectedWattage" type="number" inputmode="decimal" step="0.01">
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
