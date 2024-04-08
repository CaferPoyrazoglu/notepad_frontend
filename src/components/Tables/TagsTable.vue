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

async function deleteTag({ tag }: { tag: any }) {
  console.log(tag)
  try {
    isLoadingStore.isLoading = true
    await axiosInstance.delete('tag/delete/' + tag.id, {
      withCredentials: true,
    })
    await fetchTags(currentPage.value - 1, 20)
    isLoadingStore.isLoading = false
  } catch (error) {
    isLoadingStore.isLoading = false
    console.log(error)
  }
}
</script>

<template>
  <div class="mt-2 mx-6">
    <div class="flex flex-col">
      <div class="flex flex-col">
        <div v-if="!(tagData.length == 0)" class="underline grid grid-cols-3 sm:grid-cols-5 text-primary dark:text-white font-medium">
            <h5>Etiket</h5>
            <h5>Kullanım Sayısı</h5>
            <h5>Oluşturan</h5>
            <h5>Aksiyon</h5>

        </div>
      </div>

      <div
        v-for="(tag, key) in tagData"
        :key="key"
        :class="`grid text-black grid-cols-3 sm:grid-cols-5 ${
          key === tagData.length - 1 ? '' : 'border-b border-stroke border-opacity-60'
        }`"
      >
        <div class="flex items-center gap-3 xl:p-1">
          <p class="text-blue-700 text-md font-bold">{{ tag.text }}
          </p>
        </div>
        <div class="flex items-center gap-3 xl:p-1">
          <p class="text-black text-md font-normal">
            {{ tag.count }}
          </p>
        </div>
        <div class="flex items-center gap-3 xl:p-1">
          <p class="text-black text-md font-normal">
            {{ tag.createdBy.email }}
          </p>
        </div>
        <div class="flex items-center gap-3 xl:p-1">
          <a href="#">
            <p class="text-red text-md font-normal" @click="deleteTag({ tag: tag })">
              Sil
            </p>
          </a>
        </div>
      </div>
    </div>

    <div class="py-1">
      <VueBasicPagination
          v-if="!(tagData.length == 0)"
        :total-rows="totalPages"
        v-model="currentPage"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>
