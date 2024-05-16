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
      useToast().add({ title: 'Error', description: 'Failed to fetch areas', color: 'red' })
    })
}

onMounted(() => {
  fetchAreas()
})

function handleSave(row: Row) {
  useApi().put(`/areas`, row)
    .then(() => {
      fetchAreas()
    })
    .catch((error) => {
      useToast().add({ title: 'Error', description: 'Failed to save area', color: 'red' })
      console.error(error)
    })
}

function importAreas() {
  useApi().get('/areas/load')
    .then(() => {
      fetchAreas()
    })
    .catch((error) => {
      console.error(error)
      useToast().add({ title: 'Error', description: 'Failed to import areas', color: 'red' })
    })

}


function navigateToAreaPage(row: Row) {
  useRouter().push(`/areas/${row.id}`)
}
</script>

<template>
  <div>
    <UCard class="h-full">
      <div class="flex">
        <PageSizeSelector v-model="pageSize" @change="fetchAreas" />
        <UButton variant="outline" class="ml-auto" @click="importAreas">
          Import Areas
        </UButton>
      </div>
      <UDivider class="my-4" />
      <EditableTable
        clickable
        @row:clicked="navigateToAreaPage"
        :page="page"
        :page-size="pageSize"
        :columns="columns"
        :rows="rows"
        @row:save="handleSave"
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
