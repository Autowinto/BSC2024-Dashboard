<script setup lang="ts">
import { differenceInDays, format, subDays } from "date-fns";
import Papa from "papaparse";

useHead({
  title: "Home",
});

definePageMeta({ alias: "/home" });

enum EnergyComparison {
  Today = "Today",
  Yesterday = "Yesterday",
  LastWeek = "Last Week",
  LastMonth = "Last Month",
}

let data: Ref<any> = ref({
  external: {
    areas: [{ id: "1", data: [] }],
  },
  internal: {
    areas: [{ id: "1", data: [] }],
  },
});

function generateCSV() {
  const csv = Papa.unparse(data.value.external, {
    delimiter: ",",
  });
  downloadFile(data, "csv");
}

function generateJSON() {
  const json = JSON.stringify(data);
  downloadFile(json, "json");
}

function downloadFile(data: any, fileType: "csv" | "json" | "xlsx") {
  const url = URL.createObjectURL(
    new Blob([data], { type: `text/${fileType}` })
  );

  const link = document.createElement("a");
  link.download = `power-usage.${fileType}`;
  link.href = url;
  link.click();

  URL.revokeObjectURL(url);
}

async function fetchPowerUsageData() {
  try {
    data.value = await (
      await useApi().get("/powerUsage", {
        params: {
          aggregation: "Hour",
          dateFrom: format(dateFrom.value, "yyyy-MM-dd"),
          dateTo: format(dateTo.value, "yyyy-MM-dd"),
        },
      })
    ).data;

    //Refresh every 10 seconds
    setTimeout(fetchPowerUsageData, 10000);
  } catch (error) {
    console.error(error);
    useToast().add({
      title: "Error",
      description: "Failed to fetch power usage data",
      color: "red",
    });
  }
}

onMounted(() => {
  fetchPowerUsageData();
});

function calculateDataPoints(areas: any[]) {
  let dataSum = [];

  for (let i = 0; i < areas[0].data.length; i++) {
    let sum = 0;
    for (let j = 0; j < areas.length; j++) {
      sum += areas[j].data[i];
    }
    dataSum.push(sum);
  }

  return dataSum;
}

function calculateInternalDataPoints(areas: any[]) {
  const days = differenceInDays(dateTo.value, dateFrom.value);
  let returnObject: any[] = [];

  for (let i = 0; i < days; i++) {
    if (returnObject.length === 0) {
      returnObject = calculateDataPoints(areas)
      continue;
    }
    returnObject.push(...calculateDataPoints(areas));
    
  }
  return returnObject;
}

function calculateLabels() {
  return data.value.external.areas[0].data.map(
    (point: any, index: number) => "Hour " + (index + 1)
  );
}

const totalWattage = computed(() => {
  return data.value.external.areas.reduce(
    (total: any, area: { data: any[] }) =>
      total + area.data.reduce((sum: any, value: any) => sum + value, 0),
    0
  );
});

const energyChartData = computed(() => {
  const chartData = {
    labels: calculateLabels(),
    datasets: [
      {
        label: "Energinet",
        data: calculateDataPoints(data.value.external.areas),
        backgroundColor: "#00FFFF",
        type: "line",
        borderColor: "#00FFFF",
      },
      {
        label: "Average In-House Measurements",
        data: calculateInternalDataPoints(data.value.internal.areas),
        backgroundColor: "#C70039",
        borderColor: "#C70039",
      },
    ],
  };
  return chartData;
});

const exportDropdownItems = [
  [
    { label: "Export to CSV", click: generateCSV },
    { label: "Export to JSON", click: generateJSON },
  ],
];

const dateFrom = ref(subDays(new Date(), 1));
const dateTo = ref(new Date());

function handleDateChange(start: Date, end: Date) {
  dateFrom.value = start;
  dateTo.value = end;
  fetchPowerUsageData();
}
</script>

<template>
  <NuxtLayout>
    <div class="grid grid-cols-2 gap-3 mb-3">
      <!-- <InfoCard
        class=""
        title="Active Devices"
        value="Value"
        icon="lucide:plug-zap"
      /> -->
      <InfoCard
        class=""
        title="Current Wattage"
        :value="Number.parseFloat(totalWattage).toFixed(2)"
        icon="lucide:zap"
      />
    </div>
    <div class="grid grid-cols-12 gap-3">
      <UCard class="col-span-12">
        <div class="flex">
          <DateRangePicker @change="handleDateChange"></DateRangePicker>
          <!-- <USelect v-model="" :options="energyComparisonOptions" /> -->
          <UDropdown :items="exportDropdownItems" class="ml-auto">
            <UButton variant="outline">
              Export
              <Icon name="lucide:chevron-down" />
            </UButton>
          </UDropdown>
        </div>
        <UDivider class="my-4" />
        <EnergyComparisonChart :data="energyChartData" />
      </UCard>
    </div>
  </NuxtLayout>
</template>
