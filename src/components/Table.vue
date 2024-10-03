<script setup>
import { watch, ref } from 'vue'

import { useProductsStore } from '@/stores/products'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const psStore = useProductsStore()
const list = ref(psStore.list)

watch(() => [psStore.list, psStore.total], ([newList, newTotal]) => {
  list.value = psStore.list
})

const deleteProduct = (id) => {
  toast.success('Product Removed.')
  psStore.removeProduct(id)
}

const resetProduct = () => {
  psStore.resetProducts()
}

const savePurchase = () => {
  let transaction = localStorage.transaction ? JSON.parse(localStorage.transaction) : []
  let id = transaction.length + 1 || 1
  const order = {
    id,
    report_datetime: new Date(),
    report_subtotal: psStore.totalPrice    
  }
  transaction.push(order)
  localStorage.setItem('transaction', JSON.stringify(transaction, null, 2))
  resetProduct()
  toast.success('Transaction Saved.')
}

const formatToIDR = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}
</script>
<template>
  <div>
    <div
      class="w-full flex flex-wrap mt-10 border-none md:border-2 lg:border-2 font-semibold text-xs md:text-md lg:text-lg">
      <div class="hidden md:block lg:block w-1/12 p-2 text-center border-2 border-r-0 rounded-tl-md border-gray-200 text-md">
        NO</div>
      <div class="w-4/12 p-2 text-center border-2 border-r-0 border-gray-200 text-md">NAMA PRODUCT</div>
      <div class="w-1/12 p-2 text-center border-2 border-r-0 border-gray-200 text-md truncate">QTY</div>
      <div class="w-4/12 p-2 text-center border-2 border-r-0 border-gray-200 text-md">TOTAL HARGA</div>
      <div class="w-3/12 md:w-2/12 lg:w-2/12 p-2 text-center border-2 border-gray-200 text-md rounded-tr-md">ACTION</div>
    </div>
    <div v-if="list.length" v-for="(prod, i) in list" :key="prod.id"
      class="w-full flex flex-wrap items-center font-semibold text-xs md:text-md lg:text-md">
      <div class="hidden md:block lg:block w-1/12 h-16 md:h-11 lg:h-11 p-2 text-center border-2 border-r-0 border-t-0 border-gray-200">
        {{ i + 1 }}</div>
      <div class="w-4/12 h-16 md:h-11 lg:h-11 p-2 text-center border-2 border-r-0 border-t-0 border-gray-200">
        {{ prod.product_name }}</div>
      <div class="w-1/12 h-16 md:h-11 lg:h-11 p-2 text-center border-2 border-r-0 border-t-0 border-gray-200">{{ prod.qty }}</div>
      <div class="w-4/12 h-16 md:h-11 lg:h-11 p-2 text-center border-2 border-r-0 border-t-0 border-gray-200">
        {{ formatToIDR(prod.total_price) }}</div>
      <div class="w-3/12 h-16 md:h-11 lg:h-11 md:w-2/12 lg:w-2/12 p-2 text-center border-2 border-t-0 border-gray-200">
        <button class="px-2 md:py-1 lg:py-1 w-fit text-center bg-gray-200 rounded-md font-semibold text-xs"
          @click="deleteProduct(prod.id)">DELETE</button>
      </div>
    </div>
    <div v-if="list.length" class="w-full flex flex-wrap font-semibold text-xs md:text-md lg:text-md">
      <div
        class="w-5/12 md:w-6/12 lg:w-6/12 p-2 text-center border-2 border-r-0 border-t-0 rounded-bl-md border-gray-200 bg-gray-100 ">
        SUBTOTAL</div>
      <div class="w-4/12 p-2 text-center border-2 border-r-0 border-t-0 border-gray-200 bg-gray-100 ">
        {{ formatToIDR(psStore.totalPrice) }}</div>
      <div class="w-3/12 md:w-2/12 lg:w-2/12 p-2 text-center border-2 border-t-0 rounded-br-md border-gray-200 bg-gray-100 ">
      </div>
    </div>
    <div v-if="list.length" class="w-full flex flex-wrap justify-end font-semibold text-xs md:text-md lg:text-md mt-4 md:mt-10 lg:mt-10">
      <div class="w-full md:w-2/12 lg:w-2/12 flex justify-center md:justify-between lg:justify-between">
        <div class="w-5/12 mx-1 md:mx-0 lg:mx-0">
          <button class="p-2 w-full text-center bg-gray-200 rounded-md text-sm md:text-md lg:text-md font-semibold" @click="resetProduct()">CLEAR</button>
        </div>
        <div class="w-5/12 mx-1 md:mx-0 lg:mx-0">
          <button class="p-2 w-full text-center bg-gray-200 rounded-md text-sm md:text-md lg:text-md font-semibold" @click="savePurchase()">SAVE</button>
        </div>
      </div>
    </div>
    <div v-else class="w-full flex flex-wrap font-semibold bg-gray-100 py-12 px-4 justify-center">
      NO DATA
    </div>
  </div>
</template>
