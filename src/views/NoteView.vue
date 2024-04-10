<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { onMounted, ref } from 'vue'
import axiosInstance from '@/api/axiosInstance'
import { useRoute } from 'vue-router'
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const content = ref('')
const title = ref('')
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
    title.value = data.title
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
      class="col-span-2 rounded-sm bg-white px-5 pt-7.5 pb-5 mx-auto max-w-screen-md p-4 md:p-6 2xl:p-10">
      <h1 class="text-black text-4xl font-extrabold pb-4">{{ title }}</h1>
      <span v-html="content"></span>
    </div>
  </DefaultLayout>
</template>
