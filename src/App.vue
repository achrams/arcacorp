<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, watch, watchEffect } from 'vue'
import Navbar from './components/Navbar.vue';
import { useLogStore } from '@/stores/log'
const store = useLogStore()
const logged = ref(store.logged || false)
const router = useRouter()

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
  <Navbar v-if="store.log" />
  <RouterView />
</template>

<style scoped>
</style>
