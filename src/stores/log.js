import { defineStore } from 'pinia'

export const useLogStore = defineStore('log', {
  state: () => ({
    log: false
  }),
  getters: {
    logged: (state) => state.log
  },
  actions: {
    login() {
      this.log = true
    },
    logout () {
      this.log = false
    }
  }
})