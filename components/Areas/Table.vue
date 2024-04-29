<script setup lang="ts">
const rows = ref([])

const columns = reactive([{
  key: 'id',
  label: 'ID',
}, {
  key: 'name',
  label: 'Name',
  editable: true,
}])

function fetchAreas() {
  useApi().get('/areas', { params: { page: page.value, pageSize: pageSize.value } })
    .then((response) => {
      rows.value = response.data.items
      totalItems.value = response.data.totalItems
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  fetchAreas()
})

function handleSave(row: unknown) {
  console.log(row)
}

const page = ref(1)
const pageSize = ref(10)
const totalItems = ref(1)
</script>

<template>
  <UCard>
    <div class="flex">
      <USelect v-model="pageSize" class="flex-grow mr-3" :options="[10, 20, 50, 100]" @change="fetchAreas" />
      <UButton>Create</UButton>
    </div>
    <EditableTable :page="page" :page-size="pageSize" :columns="columns" :rows="rows" @save="handleSave" />
    <UPagination v-model="page" :page-count="pageSize" :total="totalItems" />
  </UCard>
</template>
