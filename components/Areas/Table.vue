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
      useToast().add({ title: 'Error', description: 'Failed to fetch areas', color: 'red' }
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
      useToast().add({ title: 'Error', description: 'Failed to save area', color: 'red' })
      console.error(error)
    })
}
</script>

<template>
  <div>
    <UCard class="h-full">
      <div class="flex">
        <PageSizeSelector v-model="pageSize" @change="fetchAreas" />
        <UButton class="ml-auto" @click="fetchAreas">
          Import Areas
        </UButton>
      </div>
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
