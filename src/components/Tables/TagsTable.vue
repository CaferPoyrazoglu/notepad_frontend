<script setup lang="ts">
import {onMounted, ref} from 'vue'
import axiosInstance from '@/api/axiosInstance'
import { VueBasicPagination } from 'vue-basic-pagination';
import 'vue-basic-pagination/dist/style.css'

const tagData = ref(null)
const currentPage = ref(1)
const totalPages = ref(0)
const handlePageChange = (newPage) => fetchTags(newPage - 1, 8)

onMounted(() => fetchTags(currentPage.value - 1, 8))

async function fetchTags(page = 0, size = 8) {
  try {
    const { data } = await axiosInstance.get('tag/all', { params: { page, size }, withCredentials: true })
    tagData.value = data.content
    totalPages.value = data.totalPages
  } catch (error) {
    console.log("test")
  }
}

</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Etiket</h4>
    <div class="flex flex-col">
      <div
        v-for="(tag, key) in tagData"
        :key="key"
        :class="`grid grid-cols-3 sm:grid-cols-2 ${
          key === tagData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
        }`"
      >
        <div class="flex items-center gap-3 p-2.5 xl:p-5">

          <p class="hidden text-black dark:text-white sm:block">#{{ tag.text }}</p>
        </div>


      </div>
    </div>

    <div class="py-1">
      <VueBasicPagination :total-rows="totalPages" v-model="currentPage" @change="handlePageChange"/>

    </div>

  </div>
</template>
