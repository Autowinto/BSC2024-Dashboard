<script setup lang="ts">
import type { Row } from '../EditableTable.vue';

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
  type: 'selectmenu',
  editable: true,
  selectOptions: [],
}]

async function fetchDevices() {
  useApi().get('/devices').then((deviceData) => {
    columns[2].selectOptions = deviceData.data.items.map((device: any) => ({
      label: device.name,
      value: device.id,
    }))
    if (columns[2].selectOptions) {
      columns[2].selectOptions.push({ label: 'None', value: null })
    }
  }).catch((error) => {
    console.error(error)
    useToast().add({ title: 'Error', description: 'Failed to fetch devices', color: 'red' })
  })
}

async function fetchCategories() {
  useApi().get('/deviceCategories').then((categoryData) => {
    columns[3].selectOptions = categoryData.data.items.map((category: any) => ({
      label: category.name,
      value: category.id,
    }))
  }).catch((error) => {
    console.error(error)
    useToast().add({ title: 'Error', description: 'Failed to fetch device categories', color: 'red' })
  })
}

onMounted(() => {
  fetchData()
  fetchDevices()
  fetchCategories()
})

function handleSave(row: Row) {
  useApi().put(`/smartPlugs/${row.id}`, row).then(() => {
    fetchData()
  }).catch((error) => {
    console.error(error)
    useToast().add({ title: 'Error', description: 'Failed to save smart plug', color: 'red' })
  })
}

function handleDelete(row: Row) {
  useApi().delete(`/smartPlugs/${row.id}`).then(() => {
    fetchData()
  }).catch((error) => {
    console.error(error)
    useToast().add({ title: 'Error', description: 'Failed to delete smart plug', color: 'red' })
  })
}
</script>

<template>
  <PageSizeSelector @change="fetchData"/>
  <UDivider class="my-4" />
  <EditableTable :rows="rows" :columns="columns" @row:delete="handleDelete" @row:save="handleSave"/>
  <UPagination v-model="currentPage" :total="totalItems" />
</template>
