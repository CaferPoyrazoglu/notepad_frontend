<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { onMounted, ref } from 'vue'
import axiosInstance from '@/api/axiosInstance'
import { useRoute } from 'vue-router'
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const content = ref('')
const route = useRoute()

onMounted(() => {
  const noteId = route.params.noteId
  return fetchNoteById(noteId)
})
async function fetchNoteById(noteId) {
  try {
    const { data } = await axiosInstance.get('note/' + noteId, {
      params: {},
      withCredentials: true
    })
    content.value = data.text
  } catch (error) {}
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ql-syntax').forEach((el) => {
    hljs.highlightElement(el);
  });
});
</script>

<template>
  <DefaultLayout>
    <div
      class="h-screen col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <span v-html="content"></span>
    </div>
  </DefaultLayout>
</template>
