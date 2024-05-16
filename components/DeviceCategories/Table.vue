<script setup lang="ts">
const rows = ref([])

const pageSize = ref(10)
const totalItems = ref(1)
const currentPage = ref(1)

function fetchCategories() {
  useApi().get('deviceCategories', { params:
    { pageSize: pageSize.value, page: currentPage.value } }).then((response) => {
    rows.value = response.data.items
    totalItems.value = response.data.totalItems
  }).catch((error) => {
    console.error(error)
    useToast().add({ title: 'Error', description: 'Failed to fetch device categories', color: 'red' })
  })
}

onMounted(() => {
  fetchCategories()
})

const isModalOpen = ref(false)
const columns = [{ key: 'name', label: 'Name' }]

const baseState = {
  name: '',
}

const state = ref(baseState)

function submitDeviceForm() {
  useApi().post('deviceCategories', state.value).then(() => {
    isModalOpen.value = false
    fetchCategories()
  }).catch((error) => {
    console.error(error)
    useToast().add({ title: 'Error', description: 'Failed to add device category', color: 'red' })
  })
}
</script>

<template>
  <div class="flex">
    <PageSizeSelector v-model="pageSize" @change="fetchCategories" />
    <UButton class="ml-auto" variant="outline" @click="isModalOpen = true">
      Add Category
    </UButton>
  </div>
  <UDivider class="my-4" />
  <EditableTable :columns="columns" :rows="rows" />
  <UPagination v-model="currentPage" :page-count="pageSize" :total="totalItems" @update:model-value="fetchCategories" />
  <UModal v-model="isModalOpen">
    <UCard>
      <template #header>
        <span>Add Device Category</span>
      </template>
      <UForm :state="state" @submit="submitDeviceForm">
        <UFormGroup label="Name" model="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UDivider class="my-3" />
        <div class="flex justify-between">
          <UButton type="submit">
            Submit
          </UButton>
          <UButton color="red" @click="cancelForm">
            Cancel
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
