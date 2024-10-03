import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    totalPrice: 0
  }),
  getters: {
    list: (state) => state.products,
    total: (state) => state.total
  },
  actions: {
    addProduct(payload) {
      if (this.products) {
        const found = this.products.find(x => x.id == payload.id)
        if (found) {
          let newList = []
          this.products.forEach(prod => {
            if (prod.id == payload.id) newList.push({ ...payload, qty: +prod.qty + +payload.qty })
            else newList.push(prod)
          })
          this.products = newList
          const totalSum = this.products.reduce((sum, product) => sum + product.total_price, 0)
          this.totalPrice = totalSum
        } else {
          this.products.push(payload)
          const totalSum = this.products.reduce((sum, product) => sum + product.total_price, 0)
          this.totalPrice = totalSum
        }
      } else {
        this.products.push(payload)
        const totalSum = this.products.reduce((sum, product) => sum + product.total_price, 0)
          this.totalPrice = totalSum
      }
      console.log(this.totalPrice)
    },
    removeProduct(id) {
      let newList = []
      this.products.forEach(prod => {
        if (prod.id !== id) newList.push(prod)
      })
      this.products = newList
      const totalSum = products.reduce((sum, product) => sum + product.total_price, 0)
      this.total = totalSum
    },
    resetProducts () {
      this.products = []
    }
  }
})