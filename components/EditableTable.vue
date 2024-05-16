<script setup lang="ts">
import type { DropdownItem } from '#ui/types';

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'row:save', row: Row): void
  (e: 'row:clicked', row: Row): void
  (e: 'row:delete', row: Row): void
}>()

const { columns, rows } = toRefs(props)

export interface Column {
  [key: string]: any
  key: string
  sortable?: boolean | undefined
  editable?: boolean | undefined
  sort?: ((a: any, b: any, direction: 'desc' | 'asc') => number) | undefined
  direction?: 'desc' | 'asc' | undefined
  class?: string | undefined
}

export interface Row {
  [key: string]: any
}

interface Props {
  rows: Row[] | undefined
  columns: Column[]
  clickable?: boolean
}

const dynamicColumns = computed(() => {
  return props.columns.filter(column => column.key !== 'actions')
})

const hasEditableRows = computed(() => {
  return props.columns.some(column => column.editable === true)
})

const hasDeletableRows = computed(() => {
  return props.columns.some(column => column.deletable === true)
})

const showActions = computed(() => {
  return hasEditableRows || hasDeletableRows
})

function emitSave(row: Row) {
  emit('row:save', row)
  row.isEditing = false
}

function initializeExtraColumns() {
  if (showActions.value)
    columns.value.push({ key: 'actions' })
}

function getActions(row: Row):  DropdownItem[][]{
  const actions:  DropdownItem[][] = []
  if (hasEditableRows.value)  {
    actions.push(
      [{
        label: 'Edit',
        icon: 'i-lucide-save',
        click: () => {
          console.log('test')
          row.isEditing = true
        }
      }]
    )    
  }

  if (hasDeletableRows.value) {
    actions.push(
      [{
        label: 'Delete',
        icon: 'i-lucide-trash',
        click: () => {
          emit('row:delete', row)
        }
      }]
    )
  }

  return actions
}

function getEditingActions(row: Row) {
  return [
    [
      {
        label: 'Save',
        icon: 'i-lucide-square-pen',
        click: () => {
          emitSave(row)
        },
      },
    ],
  ]
}

function findAssignedDevice(row: Row, columnKey: string) {
  return columns.value.find((column) => column.key === columnKey)?.selectOptions.find((o) => o.value == row[columnKey]) || ''

}

initializeExtraColumns()
</script>

<template>

  <UTable
  class="overflow-visible"
    :columns="columns"
    :rows="rows"
    @select="($event) => emit('row:clicked', $event)"
  >
    <template
      v-if="showActions" #actions-data="{ row }"
    >
      <div class="float-right w-8 z-10" @click.stop>
        <UDropdown 
          :items="!row.isEditing ? getActions(row) : getEditingActions(row)"
        >
          <UButton square variant="ghost" >
            <Icon size="1.5em" name="i-lucide-ellipsis-vertical" />
          </UButton>
        </UDropdown>
      </div>
    </template>

    <template
      v-for="(dynamicColumn, index) in dynamicColumns"
      #[`${dynamicColumn.key}-data`]="{ row, column }"
      :key="index"
    >
      <div v-if="column.type === 'number'">
        <div v-if="!row.isEditing || !column.editable">
          {{ parseFloat(row[column.key]).toFixed(2) }}
        </div>
        <div v-else-if="row.isEditing" @click.stop>
          <UInput v-model="row[column.key]" type="number" />
        </div>
      </div>
      <div v-if="column.type === 'integer'">
        <div v-if="!row.isEditing || !column.editable">
          {{ row[column.key] }}
        </div>
        <div v-else-if="row.isEditing" @click.stop>
          <UInput v-model="row[column.key]" type="number" />
        </div>
      </div>
      <div v-if="column.type === 'selectmenu'">
        <div v-if="!row.isEditing || !column.editable">
          {{ findAssignedDevice(row, column.key).label || 'N/A'}}
        </div>
        <div v-else-if="row.isEditing" @click.stop>
          <USelectMenu v-model="row[column.key]" value-attribute="value" attribute searchable :options="column.selectOptions" />
        </div>
      </div>
      <div v-if="column.type === undefined || column.type === 'string'">
        <div v-if="!row.isEditing || !column.editable">
          {{ row[column.key] }}
        </div>
        <div v-else-if="row.isEditing" @click.stop>
          <UInput v-model="row[column.key]" />
        </div>
      </div>
    </template>
  </UTable>
</template>
