<script setup lang="ts">
const rows = reactive([
  {
    id: 'clujohm5000008avoreo13f0j',
    name: '571313154390543527',
    externalId: 571313154390543550,
    isEditing: false,
  },
  {
    id: 'clujohm5900018avoynp1v5yf',
    name: '571313155411009268',
    externalId: 571313155411009300,
  },
  {
    id: 'clujojycu000336auf5c8w185',
    name: '571313155411056668',
    externalId: 571313155411056640,
  },
  {
    id: 'clujojycz000436auqwjeehs1',
    name: '571313155411056675',
    externalId: 571313155411056700,
  },
  {
    id: 'clujojyd2000536au0dql5jmw',
    name: '571313155411649570',
    externalId: 571313155411649600,
  },
  {
    id: 'clujojyd7000636au47vqdbme',
    name: '571313155411747115',
    externalId: 571313155411747140,
  },
  {
    id: 'clujojydb000736aubva8rgwm',
    name: '571313155438043818',
    externalId: 571313155438043840,
  },
])

const columns = reactive([{
  key: 'id',
  label: 'ID',
}, {
  key: 'name',
  label: 'Name',
  editable: true,
}, {
  key: 'actions',
  label: 'Actions',
}])

const dynamicColumns = computed(() => {
  return columns.filter(column => column.key !== 'actions')
})

const hasEditableRows = computed(() => {
  return columns.some(column => column.editable === true)
})

const showActions = computed(() => {
  return hasEditableRows
})
</script>

<template>
  <UTable :columns="columns" :rows="rows">
    <template
      v-if="showActions"
      #actions-data="{ row }"
    >
      <UButtonGroup v-if="!row.isEditing">
        <UButton v-show="hasEditableRows" square @click="row.isEditing = true">
          <Icon name="carbon:edit" />
        </UButton>
      </UButtonGroup>
      <UButtonGroup v-else>
        <UButton square @click="row.isEditing = false">
          <Icon name="carbon:save" />
        </UButton>
      </UButtonGroup>
    </template>

    <template v-for="(dynamicColumn, index) in dynamicColumns" #[`${dynamicColumn.key}-data`]="{ row, column }" :key="index">
      <div v-if="column.type === undefined">
        <div v-if="!row.isEditing || !column.editable">
          {{ row[column.key] }}
        </div>
        <div v-else-if="row.isEditing">
          <UInput v-model="row[column.key]" />
        </div>
      </div>
    </template>
  </UTable>
</template>
