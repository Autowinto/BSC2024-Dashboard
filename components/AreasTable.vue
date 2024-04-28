<script setup lang="ts">
const rows = ref()

const columns = reactive([{
  key: 'id',
  label: 'ID',
}, {
  key: 'name',
  label: 'Name',
  editable: true,
}])

function fetchAreas() {
  useApi().get('/areas')
    .then((response) => {
      rows.value = response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

fetchAreas()

function handleSave(row: unknown) {
  console.log(row)
}
</script>

<template>
  <EditableTable :columns="columns" :rows="rows" @save="handleSave" />
</template>
