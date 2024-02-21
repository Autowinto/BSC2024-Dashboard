import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const isAuthed = ref(false)
  const darkMode = ref(false)

  return { isAuthed, darkMode }
})
