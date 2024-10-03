<script setup>
import products from '@/database/products.json'
import { useProductStore } from '@/stores/product'
import { ref } from 'vue'
const store = useProductStore()
const selected = ref(null)

const updateProduct = () => {
  store.changeProduct({
    id: selected.value.id,
    product_name: selected.value.product_name,
    product_price: selected.value.product_price
  })
}

</script>
<template>
  <div class="w-full">
    <select name="product" id="product" class="w-full p-2 rounded-md bg-gray-200 font-semibold" @change="updateProduct()" v-model="selected">
      <option :value="null" selected>Select Product</option>
      <option v-for="product in products" :key="product.id" :value="product">{{ product.product_name }}</option>
    </select>
  </div>
</template>