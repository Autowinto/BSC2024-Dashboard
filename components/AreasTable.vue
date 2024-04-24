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
}])

function handleSave(row: unknown) {
  console.log(row)
}
</script>

<template>
  <UCard>
    <EditableTable :columns="columns" :rows="rows" @save="handleSave" />
  </UCard>
</template>
