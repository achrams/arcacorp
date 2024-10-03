<template>
  <div class="w-full flex justify-center bg-gray-200 fixed top-0">
    <div class="container container-lg flex justify-between p-4">
      <div class="flex justify-center w-2/3 md:w-1/3 lg:w-1/3">
        <div class="mx-2 p-2 cursor-pointer font-semibold" @click="navTo('/')">HOME</div>
        <div class="mx-2 p-2 cursor-pointer font-semibold" @click="navTo('/report')">REPORT</div>
      </div>
      <div class="flex justify-center w-1/3">
        <div class="w-fit cursor-pointer p-2 font-semibold" @click="logout()">LOGOUT</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useLogStore } from '@/stores/log'
import { useProductStore } from '@/stores/product'
import { useProductsStore } from '@/stores/products'

const productStore = useProductStore()
const psStore = useProductsStore()

const router = useRouter()
const store = useLogStore()

const navTo = (link) => {
  router.push(link)
}

const logout = () => {
  localStorage.clear()
  store.logout()
  router.push('/login')
  productStore.resetProduct()
  psStore.resetProducts()
}
</script>