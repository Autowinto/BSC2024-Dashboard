<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (e: "save", row: Row): void;
}>();

const { columns, rows } = toRefs(props);

export interface Column {
  [key: string]: any;
  key: string;
  sortable?: boolean | undefined;
  editable?: boolean | undefined;
  sort?: ((a: any, b: any, direction: "desc" | "asc") => number) | undefined;
  direction?: "desc" | "asc" | undefined;
  class?: string | undefined;
}

export interface Row {
  [key: string]: any;
}

interface Props {
  rows: Row[] | undefined;
  columns: Column[];
}

const dynamicColumns = computed(() => {
  return props.columns.filter((column) => column.key !== "actions");
});

const hasEditableRows = computed(() => {
  return props.columns.some((column) => column.editable === true);
});

const showActions = computed(() => {
  return hasEditableRows;
});

function emitSave(row: Row) {
  emit("save", row);
  row.isEditing = false;
}

function initializeExtraColumns() {
  if (showActions.value) columns.value.push({ key: "actions" });
}

function getActions(row: Row) {
  return [
    [
      {
        label: "Edit",
        icon: "i-lucide-save",
        click: () => {
          // console.log(row)
          row.isEditing = true;
        },
      },
    ],
  ];
}

function getEditingActions(row: Row) {
  return [
    [
      {
        label: "Save",
        icon: "i-lucide-square-pen",
        click: () => {
          emitSave(row);
        },
      },
    ],
  ];
}

initializeExtraColumns();
</script>

<template>
  <UTable :columns="columns" :rows="rows">
    <template v-if="showActions" #actions-data="{ row }">
      <div class="float-right w-8">
        <UDropdown
          :items="!row.isEditing ? getActions(row) : getEditingActions(row)"
        >
          <UButton square variant="ghost">
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
          {{ row[column.key] }}
        </div>
        <div v-else-if="row.isEditing">
          <UInput v-model="row[column.key]" type="number" />
        </div>
      </div>
      <div v-if="column.type === undefined || column.type === 'string'">
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
