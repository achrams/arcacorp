<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="w-full">
    <input :type="type" class="w-full p-2 rounded-md bg-gray-200 placeholder:text-black placeholder:font-semibold" :placeholder="placeholder">
  </div>
</template>