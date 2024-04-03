<script setup lang="ts">
const data = reactive([])

async function getAreas() {
  useApi.get('')
}

const columns = [{
  key: 'name',
  label: 'Name',
}, {
  key: 'title',
  label: 'Title',
}, {
  key: 'email',
  label: 'Email',
}, {
  key: 'role',
  label: 'Role',
}]
</script>

<template>
  <div>
    <UCard>
      <UTable :rows="data" :columns="columns" />
    </UCard>
  </div>
</template>
