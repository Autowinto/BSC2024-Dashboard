<script setup lang="ts">
const rows = ref()

const columns = reactive([
  {
    key: 'id',
    label: 'ID',
  },
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

const state = ref({
  name: '',
  expectedWattage: 0,
  description: '',
})

function submitDeviceForm() {
  useApi().post('/devices', state.value)
    .then(() => {
      fetchDevices()
      isModalOpen.value = false
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <UCard class="h-full">
    <div class="flex">
      <USelect v-model="pageSize" class="flex-grow mr-3" :options="[10, 20, 50, 100]" @change="fetchDevices" />
      <UButton @click="isModalOpen = true">
        Create
      </UButton>
    </div>
    <EditableTable :columns="columns" :rows="rows" />
    <UPagination v-model="page" :page-count="pageSize" :total="totalItems" @update:model-value="fetchDevices" />
  </UCard>
  <UModal v-model="isModalOpen">
    <UCard>
      <UForm :state="state" @submit="submitDeviceForm">
        <UFormGroup label="Name" model="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup label="Description" model="name">
          <UInput v-model="state.description" />
        </UFormGroup>
        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>
