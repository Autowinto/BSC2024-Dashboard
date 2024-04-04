<script setup lang="ts">
const rows = reactive([{
  id: 'gdfgdfgdf',
  name: 'Some Device 1',
}])

const columns = reactive([{
  key: 'id',
  label: 'ID',
}, {
  key: 'name',
  label: 'Name',
  editable: true,
}])
</script>

<template>
  <EditableTable :columns="columns" :rows="rows" />
</template>
