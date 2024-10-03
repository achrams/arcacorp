import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    selected: {
      id: 0,
      product_name: '',
      product_price: 0
    },
    qty: null,
    total: 0
  }),
  getters: {
    selectedProduct: (state) => state.selected,
    getQty: (state) => state.qty,
    getPrice: (state) => state.total
  },
  actions: {
    changeProduct (payload) {
      this.selected = payload
      this.qty = 1
      this.total = this.qty * payload.product_price || 0
    },
    changeQty(val) {
      console.log(val)
      this.qty = val
      this.total = val * this.selected?.product_price || 0
    },
    resetProduct() {
      this.selected = {
        id: 0,
        product_name: '',
        product_price: 0
      }
      this.qty = null
      this.total = null
    }
  }
})