<template>
  <div
    class="md:border-2 lg:border-2 border-gray-200 rounded-md flex flex-wrap justify-start md:justify-center lg:justify-center items-center p-2 md:p-4 lg:p-4">
    <div class="w-full md:w-4/12 lg:w-4/12 md:mx-1 lg:mx-1">
      <FormSelection />
    </div>
    <div class="w-1/4 my-2 md:my-0 lg:my-0 md:w-1/12 lg:w-1/12 mx-0 md:mx-1 lg:mx-1">
      <FormQty />
    </div>
    <div class="w-3/4 md:w-4/12 lg:w-4/12 mx-0 md:mx-1 lg:mx-1 text-center">
      <h5 class="text-sm md:text-md lg:text-md font-semibold">TOTAL HARGA : {{ formatToIDR(productStore.total)
        }}</h5>
    </div>
    <div class="w-full md:w-2/12 lg:w-2/12 mx-0 md:mx-1 lg:mx-1 text-center">
      <button :disabled="productStore.selectedProduct.id == 0" class="p-2 w-full text-center bg-gray-200 disabled:bg-gray-100 rounded-md text-sm md:text-md lg:text-md font-semibold" @click="addToCart()">ADD</button>
    </div>
  </div>
</template>
<script setup>
import { watch, ref } from 'vue'
import FormQty from '@/components/FormQty.vue';
import FormSelection from '@/components/FormSelection.vue';
import { useProductStore } from '@/stores/product'
import { useProductsStore } from '@/stores/products'

const productStore = useProductStore()
const psStore = useProductsStore()
const list = ref(psStore.list)

watch(() => [psStore.list, psStore.total], ([newList, newTotal]) => {
  list.value = psStore.list
})


const addToCart = () => {
  psStore.addProduct({
    id: productStore.selectedProduct.id,
    product_name: productStore.selectedProduct.product_name,
    qty: productStore.getQty,
    total_price: productStore.getPrice
  })
}

const formatToIDR = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}
</script>