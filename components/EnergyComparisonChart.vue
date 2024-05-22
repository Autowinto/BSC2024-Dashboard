<script setup lang="ts">
import type { ChartData } from 'chart.js';
import { Bar } from 'vue-chartjs';

const props = defineProps<{
  data: ChartData<'bar'>
}>()


const { data } = toRefs(props)
console.log(data)

</script>

<template>
  <Bar :data="data" :options="{ responsive: true}" />
</template>
