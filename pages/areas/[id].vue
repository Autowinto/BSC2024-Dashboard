<template>
  <NuxtLayout>

      <UCard>
        <div class="flex">
          
          <h1 class="text-xl">{{ areaName || 'N/A' }}</h1>
          <UButton variant="outline" @click="isModalOpen = true" class="ml-auto"
            >Assign Devices to Area</UButton
          >
        </div>
        <EditableTable @row:save="handleSave" @row:delete="handleDelete" :rows="rows" :columns="columns" />
      </UCard>
  </NuxtLayout>

  <UModal v-model="isModalOpen">
    <UCard>
      <template #header>
        <span>Assign Devices to Area</span>
      </template>
      <UForm :state="state" @submit="handleSubmit">
        <UFormGroup label="Device">
          <USelectMenu
            v-model="state.deviceId"
            value-attribute="value"
            :options="deviceOptions"
            searchable
          />
        </UFormGroup>
        <UFormGroup label="Count">
          <UInput type="number" v-model="state.count"></UInput>
        </UFormGroup>
        <UDivider class="my-3" />
        <div class="flex justify-between">
          <UButton type="submit"> Submit </UButton>
          <UButton color="red" @click="handleCancel"> Cancel </UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { Row } from '~/components/EditableTable.vue';

const route = useRoute();
const rows = ref([])
  // Rows should be the areaDevices but with added columns based on the devices

const columns = [
  { key: "name", label: "Name" },
  {
    key: "count",
    label: "Count",
    type: "integer",
    editable: true,
    deletable: true,
  },
];

const totalItems = ref(1);

const deviceOptions = ref([]);

const isModalOpen = ref(false);

const areaName = ref('');

const baseState = {
  areaId: route.params.id,
  deviceId: "",
  count: 1,
};
const state = ref({
  areaId: route.params.id,
  deviceId: "",
  count: 1,
});

function handleCancel() {
  state.value = baseState;
}

function handleSave(row: Row) {
  useApi()
    .put(`/areas/updateDevice`, row)
    .then(() => {
      fetchAreaDevices();
      calculateRows()
    })
    .catch((error) => {
      console.error(error);
      useToast().add({
        title: "Error",
        description: "Failed to save area device",
        color: "red",
      });
    });
}

function handleDelete(row: Row) {
  useApi()
    .put(`/areas/removeDevice`, { areaId: route.params.id, deviceId: row.deviceId })
    .then(() => {
      fetchAreaDevices();
      calculateRows()
    })
    .catch((error) => {
      console.error(error);
      useToast().add({
        title: "Error",
        description: "Failed to delete area device",
        color: "red",
      });
    });
}

function handleSubmit() {
  useApi()
    .post(`/areas/addDevice`, state.value)
    .then(() => {
      fetchDevices();
      fetchAreaDevices().then(() => {
        isModalOpen.value = false;
        console.log(rows.value)
      })
    })
    .catch((error) => {
      console.error(error);
      useToast().add({
        title: "Error",
        description: "Failed to assign device to area",
        color: "red",
      });
    });
}

function calculateRows() {
  rows.value = areaDevices.value.map((areaDevice) => {
    const device = devices.value.find(
      (device) => device.id === areaDevice.deviceId
    );
    return {
      ...areaDevice,
      name: device.name,
    };
  })
}

async function fetchArea() {
  const { data } = await useApi().get(`/areas/${route.params.id}`);
  areaName.value = data.name
}

const areaDevices: Ref<any> = ref([]);
const devices: Ref<any> = ref([]);

async function fetchAreaDevices() {
  const { data } = await useApi().get(`/areas/${route.params.id}/devices`);
  areaDevices.value = data.items;
  totalItems.value = data.totalItems;
  calculateRows()

}

async function fetchDevices() {
  useApi()
    .get("/devices")
    .then((deviceData) => {
      devices.value = deviceData.data.items;
      deviceOptions.value = deviceData.data.items.map((device: any) => ({
        label: device.name,
        value: device.id,
      }));
    })
    .catch((error) => {
      console.error(error);
      useToast().add({
        title: "Error",
        description: "Failed to fetch devices",
        color: "red",
      });
    });
}

onMounted(() => {
  fetchArea();
  fetchDevices().then(() => {
    fetchAreaDevices();
  });
});
</script>
