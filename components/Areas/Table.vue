<script setup lang="ts">
import type { Row } from '../EditableTable.vue';

const rows = ref([])

const columns = reactive([{
  key: 'name',
  label: 'Name',
  editable: true,
}])

const page = ref(1)
const pageSize = ref(10)
const totalItems = ref(1)

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

function handleSave(row: Row) {
  useApi().put(`/areas/${row.id}`, row)
    .then(() => {
      fetchAreas()
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <div>
    <UCard class="h-full">
      <PageSizeSelector v-model="pageSize" @change="fetchAreas" />
      <UDivider class="my-4" />
      <EditableTable
        :page="page"
        :page-size="pageSize"
        :columns="columns"
        :rows="rows"
        @save="handleSave"
      />
      <UPagination
        v-model="page"
        :page-count="pageSize"
        :total="totalItems"
        @update:model-value="fetchAreas"
      />
    </UCard>
  </div>
</template>
