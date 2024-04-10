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

const getDate = (date) => new Date(date).toLocaleString('tr-TR')
const handlePageChange = (newPage) => {
  return fetchNotes(newPage - 1, 20)
}

onMounted(() => fetchNotes(currentPage.value - 1, 20))

async function redirect({ note }: { note: any }) {
  try {
    sidebarStore.page = ''
    await router.push('/note/' + note.id)
  } catch (error) {
    console.log(error)
  }
}

async function deleteNote({ note }: { note: any }) {
  try {
    isLoadingStore.isLoading = true
    await axiosInstance.delete('note/delete/' + note.id, {
      withCredentials: true,
    })
    await fetchNotes(currentPage.value - 1, 20)
    isLoadingStore.isLoading = false
  } catch (error) {
    isLoadingStore.isLoading = false
    console.log(error)
  }
}

async function editNote({ note }: { note: any }) {
  try {
    isLoadingStore.isLoading = true
    await router.push({ path: '/new', query: { id: note.id } })
    isLoadingStore.isLoading = false
  } catch (error) {
    isLoadingStore.isLoading = false
    console.log(error)
  }
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
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="mt-2 mx-6">
    <div class="flex flex-col">
      <div class="flex flex-col">
        <div v-if="!(noteData.length == 0)" class="grid grid-cols-3 sm:grid-cols-5 underline text-primary dark:text-white font-medium">
          <h5>Başlık</h5>
          <h5>Değiştirilme Tarihi</h5>
          <h5>Oluşturulma Tarihi</h5>
          <h5>Oluşturan</h5>
          <h5>Aksiyon</h5>

        </div>
      </div>
      <div
        v-for="(note, key) in noteData"
        :key="key"
        :class="`grid text-black grid-cols-3 sm:grid-cols-5 ${
          key === noteData.length - 1 ? '' : 'border-b border-stroke border-opacity-60'
        }`"
      >
        <div class="flex items-center gap-3 xl:p-1">
            <a href="#" class="text-md font-bold text-blue-700" @click="redirect({ note: note })">{{ note.title }}
            </a>
        </div>
        <div class="flex items-center gap-3 xl:p-1">
          <p class="text-black text-md font-normal">
            {{ getDate(note.lastModifiedDate) }}
          </p>
        </div>
        <div class="flex items-center gap-3 xl:p-1">
          <p class="text-black text-md font-normal">
            {{ getDate(note.createdDate) }}
          </p>
        </div>
        <div class="flex items-center gap-3 xl:p-1">
          <p class="text-black text-md font-bold">
            {{ note.createdBy.email }}
          </p>
        </div>
        <div class="flex items-center gap-3 xl:p-1">
          <a href="#">
            <p class="text-blue-700 text-md font-normal" @click="editNote({ note: note })">
              Düzenle
            </p>
          </a>
          <a href="#">
            <p class="text-red text-md font-normal" @click="deleteNote({ note: note })">
              Sil
            </p>
          </a>
        </div>
      </div>
    </div>

    <div class="py-1">
      <VueBasicPagination
        v-if="!(noteData.length == 0)"
        :total-rows="totalPages"
        v-model="currentPage"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>
