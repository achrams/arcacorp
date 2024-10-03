<script setup>
import AddProduct from '@/components/AddProduct.vue';
import Table from '@/components/Table.vue'
import { useLogStore } from '@/stores/log'
import { ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const store = useLogStore()
const logged = ref(store.logged || false)

watch(() => store.logged, () => {
  logged.value = store.logged
})

watchEffect(() => {
  if(localStorage.logged) {
    store.login()
    logged.value = true
  }
  else router.push('/login')
})
</script>

<template>
  <div>
    <div class="w-full flex flex-col items-center mt-24">
      <div class="container container-lg flex flex-col items-center">
        <div class="w-full md:w-4/5 lg:w-4/5">
          <AddProduct />
          <Table />
        </div>
      </div>
    </div>
  </div>
</template>
