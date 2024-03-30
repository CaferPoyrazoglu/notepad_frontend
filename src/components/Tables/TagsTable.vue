<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axiosInstance from '@/api/axiosInstance'
import { VueBasicPagination } from '@/components/pagination'
import { useIsLoadingStore } from '@/stores/isLoading'

const isLoadingStore = useIsLoadingStore()

const tagData = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const handlePageChange = (newPage) => fetchTags(newPage - 1, 20)

onMounted(() => fetchTags(currentPage.value - 1, 20))

async function fetchTags(page = 0, size = 20) {
  try {
    isLoadingStore.isLoading = true
    const { data } = await axiosInstance.get('tag/all', {
      params: { page, size },
      withCredentials: true
    })
    tagData.value = data.content
    totalPages.value = data.totalPages
    isLoadingStore.isLoading = false
  } catch (error) {}
}
</script>

<template>
  <div class="mt-2 mx-6">
    <div class="flex flex-col">
      <div
        v-for="(tag, key) in tagData"
        :key="key"
        :class="`grid grid-cols-3 sm:grid-cols-2 ${
          key === tagData.length - 1 ? '' : 'border-b border-stroke border-opacity-60'
        }`"
      >
        <div class="flex items-center gap-3 xl:p-1">
          <p class="text-black text-md font-normal">
            <span class="text-third">▪</span> {{ tag.text }}
          </p>
        </div>
      </div>
    </div>

    <div class="py-1">
      <VueBasicPagination
        v-if="!isLoadingStore.isLoading"
        :total-rows="totalPages"
        v-model="currentPage"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>
