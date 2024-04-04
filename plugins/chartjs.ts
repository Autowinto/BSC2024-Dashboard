import { ArcElement, BarElement, CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js'

export default defineNuxtPlugin(() => {
  Chart.register(ArcElement, BarElement, CategoryScale, Legend, LineElement, LinearScale, PointElement, Title, Tooltip)
})
