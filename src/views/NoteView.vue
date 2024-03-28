<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import {onMounted, ref} from 'vue'
import axiosInstance from '@/api/axiosInstance'
import { useRoute } from 'vue-router'

const content = ref("")
const route = useRoute()

onMounted(() => {
  const noteId = route.params.noteId;
  return fetchNoteById(noteId);
})
async function fetchNoteById(noteId) {
  try {
    const { data } = await axiosInstance.get('note/' + noteId, { params: {}, withCredentials: true })
    content.value = data.text
  } catch (error) {
    console.log("test")
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">

        <VueShowdown class="prose" :markdown="content"
                     flavor="ghost"
                     :options="{ emoji: true }" />
    </div>
  </DefaultLayout>
</template>
