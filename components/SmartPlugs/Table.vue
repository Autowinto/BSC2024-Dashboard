<script setup lang="ts">
const rows = ref([])
const totalItems = ref(0)

async function fetchData() {
  const plugData = await useApi().get('/smartPlugs')
  rows.value = plugData.data.items
  totalItems.value = plugData.data.totalItems
}

const currentPage = ref(1)

const columns = [{
  key: 'id',
  label: 'Plug MAC Address',
}, {
  key: 'name',
  label: 'Name',
  editable: true,
}, {
  key: 'deviceId',
  label: 'Assigned Device',
  editable: true,
  selectOptions: [],
}]

async function fetchDevices() {
  useApi().get('/devices').then((deviceData) => {
    columns[2].selectOptions = deviceData.data.items.map((device: any) => ({
      label: device.name,
      value: device.id,
    }))
  }).catch((error) => {
    console.error(error)
    useToast().add({ title: 'Error', description: 'Failed to fetch devices', color: 'red' })
  })
}

onMounted(() => {
  fetchData()
  fetchDevices()
})
</script>

<template>
  <PageSizeSelector />
  <UDivider class="my-4" />
  <EditableTable :rows="rows" :columns="columns" />
  <UPagination v-model="currentPage" :total="totalItems" />
</template>
