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

function fetchDevices() {
  useApi().get('/devices')
    .then((response) => {
      rows.value = response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

fetchDevices()
</script>

<template>
  <EditableTable :columns="columns" :rows="rows" />
</template>
