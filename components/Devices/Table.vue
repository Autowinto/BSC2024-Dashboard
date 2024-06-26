<script setup lang="ts">
import type { Row } from '../EditableTable.vue';

const rows = ref()

const router = useRouter()

const columns = reactive([
  {
    key: 'name',
    label: 'Name',
    editable: true,
    deletable: true,
  },
  {
    key: 'expectedWattage',
    label: 'Expected Wattage',
    editable: true,
  },
  {
    key: 'measuredWattage',
    label: 'Watts',
    type: 'number'
  },
  {
    key: 'hoursActiveWeek',
    label: 'Weekly Active Hours',
    type: 'number',
    editable: true,
  },
  {
    key: 'kiloWattHours',
    label: 'Daily kWh',
    type: 'number'
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
      calculateKiloWattHours()
    })
    .catch((error) => {
      useToast().add({ title: 'Error', description: 'Failed to fetch devices', color: 'red' })
      console.error(error)
    })
}

function calculateKiloWattHours() {
  rows.value.forEach((row: Row) => {
    row.kiloWattHours = (row.measuredWattage / 1000) * row.hoursActiveWeek
  })
}

onMounted(() => {
  fetchDevices()
  fetchOptions()
})

const categoryOptions = ref([])
const areaOptions = ref([])

async function fetchOptions() {
  useApi().get('/deviceCategories').then((res) => {
    categoryOptions.value = res.data.items.map((category: any) => ({
      label: category.name,
      id: category.id,
    }))
  }).catch((error) => {
    console.error(error)
    useToast().add({ title: 'Error', description: 'Failed to fetch device categories', color: 'red' })
  })

  useApi().get('/areas').then((res) => {
    areaOptions.value = res.data.items.map((area: any) => ({
      label: area.name,
      id: area.id,
    }))
  }).catch((error) => {
    console.error(error)
    useToast().add({ title: 'Error', description: 'Failed to fetch areas', color: 'red' })
  })
}

const isModalOpen = ref(false)

const baseState = {
  name: '',
  expectedWattage: 0,
  hoursActiveWeek: 0,
  categoryId: undefined,
  description: '',
}

const state = ref({
  name: '',
  expectedWattage: 0,
  hoursActiveWeek: 0,
  categoryId: undefined,
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
      useToast().add({ title: 'Error', description: 'Failed to add device', color: 'red' })
      console.error(error)
    })
}

function cancelForm() {
  isModalOpen.value = false
  state.value = baseState
}

function navigateToDevicePage(event) {
  router.push(`/devices/${event.id}`)
}

function handleDelete(row: Row) {
  useApi().delete(`/devices/${row.id}`)
    .then(() => {
      fetchDevices()
    })
    .catch((error) => {
      useToast().add({ title: 'Error', description: 'Failed to delete device', color: 'red' })
      console.error(error)
    })
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
    <EditableTable :columns="columns" :rows="rows" @row:delete="handleDelete" clickable @row:clicked="navigateToDevicePage" />
    <UPagination v-model="page" :page-count="pageSize" :total="totalItems" @update:model-value="fetchDevices" />
  </UCard>
  <UModal v-model="isModalOpen">
    <UCard>
      <template #header>
        <span>Add Device</span>
      </template>
      <UForm :state="state" class="space-y-2" @submit="submitDeviceForm">
        <UFormGroup label="Name" model="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup label="Category" model="name">
          <USelectMenu v-model="state.categoryId" value-attribute="id" searchable :options="categoryOptions" />
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
