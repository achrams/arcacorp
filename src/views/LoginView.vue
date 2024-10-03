<script setup>
import FormInput from '@/components/FormInput.vue';
import { useRouter } from 'vue-router';
import { useLogStore } from '@/stores/log'

const router = useRouter()

const store = useLogStore()
const login = () => {
  store.login()
  localStorage.setItem('logged', true)
  router.push('/')
}
</script>
<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="w-full h-screen md:h-fit lg:h-fit md:w-2/4 lg:w-2/4 bg-gray-500 text-white px-4 py-10 rounded-md">
      <h1 class="text-center text-2xl p-4">LOGIN PAGE</h1>
      <div class="flex justify-center">
        <div class="w-full md:w-3/4 lg:w-3/4 p-2 my-4">
          <h5>USERNAME</h5>
          <FormInput placeholder="USERNAME" type="text" class="my-3" />
          <h5>PASSWORD</h5>
          <FormInput placeholder="PASSWORD" type="password" class="my-3" />
          <button class="p-2 my-8 w-full text-white text-center bg-gray-800 rounded-md font-semibold" @click="login()">LOGIN</button>
        </div>
      </div>
    </div>
  </div>
</template>
