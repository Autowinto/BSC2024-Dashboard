import process from 'node:process'
import axios from 'axios'

const client = axios.create({ baseURL: process.env.API_URL || 'http://localhost:3000' })

export default function useApi() {
  return client
}
