<template>
  <div>
    <div class="w-full flex flex-col items-center mt-24">
      <div class="container container-lg flex flex-col items-center">
        <div class="w-full md:w-4/5 lg:w-4/5">
          <div
            class="w-full flex flex-wrap mt-10 border-none md:border-2 lg:border-2 font-semibold text-xs md:text-md lg:text-lg">
            <div class="w-2/12 p-2 text-center border-2 border-r-0 rounded-tl-md border-gray-200 text-md">
              NO
            </div>
            <div class="w-5/12 p-2 text-center border-2 border-gray-200 text-md">TANGGAL & JAM</div>
            <div class="w-5/12 p-2 text-center border-2 border-l-0 rounded-tr-md border-gray-200 text-md truncate">
              SUBTOTAL</div>
          </div>
          <div v-if="list.length" v-for="(order, i) in list" :key="order.id"
            class="w-full flex flex-wrap items-center font-semibold text-xs md:text-md lg:text-md">
            <div
              :class="`w-2/12 h-16 md:h-11 lg:h-11 p-2 text-center border-2 border-t-0 border-r-0 border-gray-200 ${i == list.length - 1 ? 'rounded-bl-md' : ''}`">
              {{ i + 1 }}
            </div>
            <div class="w-5/12 h-16 md:h-11 lg:h-11 p-2 text-center border-2 border-t-0 border-gray-200">
              {{ getFormatDate(order.report_datetime) }}
            </div>
            <div
              :class="`w-5/12 h-16 md:h-11 lg:h-11 p-2 text-center border-2 border-t-0 border-l-0 border-gray-200 ${i == list.length - 1 ? 'rounded-br-md' : ''}`">
              {{ formatToIDR(order.report_subtotal) }}
            </div>
          </div>
          <div v-else class="w-full flex flex-wrap font-semibold bg-gray-100 py-12 px-4 justify-center">
            NO DATA
          </div>
          <div v-if="list.length"
            class="w-full flex flex-wrap justify-end font-semibold text-xs md:text-md lg:text-md mt-8 md:mt-10 lg:mt-10">
            <div class="w-full md:w-2/12 lg:w-2/12">
              <button class="p-2 w-full text-center bg-gray-200 rounded-md text-sm md:text-md lg:text-md font-semibold"
                @click="downloadExcel()">EXPORT TO EXCEL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import xlsx from "json-as-xlsx"
import { useLogStore } from '@/stores/log'
import { ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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

const list = localStorage.transaction ? JSON.parse(localStorage.transaction) : []

let settings = {
  fileName: "Transaction",
  extraLength: 3,
  writeMode: "writeFile",
  writeOptions: {},
  RTL: false,
}

const formatToIDR = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}

const getFormatDate = (val) => {
  const now = new Date(val)
  return `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'long' })} ${now.getFullYear()} ${now.getHours()}:${now.getMinutes()} WIB`
}

const downloadExcel = () => {
  const data = {
    sheet: "Transaction List",
    columns: [
      { label: "Tanggal & Jam", value: "report_datetime" },
      { label: "Subtotal", value: "report_subtotal" }
    ],
    content: list
  }

  xlsx([data], settings)
  toast.success('File Exported.')
}
</script>