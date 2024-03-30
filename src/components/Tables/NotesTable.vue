<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axiosInstance from '@/api/axiosInstance'
import { VueBasicPagination } from '@/components/pagination'
import { useRouter } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'
import { useIsLoadingStore } from '@/stores/isLoading'

const isLoadingStore = useIsLoadingStore()
const sidebarStore = useSidebarStore()
const noteData = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const router = useRouter()
const handlePageChange = (newPage) => {
  return fetchNotes(newPage - 1, 20)
}

onMounted(() => fetchNotes(currentPage.value - 1, 20))

async function redirect({ note }: { note: any }) {
  try {
    sidebarStore.page = note.title
    await router.push('/note/' + note.id)
  } catch (error) {}
}

async function fetchNotes(page = 0, size = 20) {
  try {
    isLoadingStore.isLoading = true
    const { data } = await axiosInstance.get('note/all', {
      params: { page, size },
      withCredentials: true
    })
    noteData.value = data.content
    totalPages.value = data.totalPages
    isLoadingStore.isLoading = false
  } catch (error) {}
}
</script>

<template>
  <div class="mt-2 mx-6">
    <div class="flex flex-col">
      <div
        v-for="(note, key) in noteData"
        :key="key"
        :class="`grid grid-cols-3 sm:grid-cols-2 ${
          key === noteData.length - 1 ? '' : 'border-b border-stroke border-opacity-60'
        }`"
      >
        <div class="flex items-center gap-3 xl:p-1">
          <p class="text-black text-md font-normal" @click="redirect({ note: note })">
            <span class="text-third">▪</span> {{ note.title }}
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
