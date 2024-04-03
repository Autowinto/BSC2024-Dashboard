import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js'

export default defineNuxtPlugin(() => {
  Chart.register(BarElement, CategoryScale, LinearScale, Legend, Title, Tooltip)
})
