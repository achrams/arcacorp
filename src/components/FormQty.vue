<script setup>
import { useProductStore } from '@/stores/product'
import { ref, watch } from 'vue'
const store = useProductStore()
const qty = ref(store.getQty)

watch(() => store.getQty, () => {
  qty.value = store.getQty
})

const changeQty = (val) => {
  store.changeQty(val)
}

</script>
<template>
  <div class="w-full">
    <input type="number" class="w-full p-2 rounded-md bg-gray-200 placeholder:text-black placeholder:font-semibold" min="1" @change="(e) => changeQty(e.target.value)" :value="qty" placeholder="QTY">
  </div>
</template>