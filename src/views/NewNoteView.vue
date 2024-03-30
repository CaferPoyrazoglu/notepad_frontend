<script lang="ts" setup>
import axiosInstance from '@/api/axiosInstance'
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Editor from 'primevue/editor';

const newNoteRequest = ref({
  title: '',
  text: '',
  tags: []
})

async function newNote() {
  try {
    await axiosInstance.post('note/add', newNoteRequest.value, {
      withCredentials: true
    })
  } catch (error) {}
}
</script>

<template>
  <DefaultLayout>
    <div class="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div class="flex flex-col gap-9">
        <form class="space-y-4 md:space-y-6" @submit.prevent="newNote">
          <div class="p-6.5">
            <label class="m-2.5 block text-third dark:text-white"> Başlık </label>
            <input
              v-model="newNoteRequest.title"
              placeholder="Yazınız için bir başlık girin"
              class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              type="text"
            />
            <label class="m-2.5 block text-third dark:text-white"> Etiketler </label>
            <input
              v-model="newNoteRequest.tags"
              placeholder="Etiketler boşluk yada virgül ile ayırılabilir (Örn: sağlık, teknoloji, yazılım)"
              class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              type="text"
            />
            <div class="mb-6">
              <label class="m-2.5 block text-third dark:text-white"> İçerik </label>
              <Editor v-model="newNoteRequest.text" editorStyle="height: 320px" />
            </div>

            <button
              class="flex w-full justify-center rounded bg-third p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Oluştur
            </button>
          </div>
        </form>
      </div>
      <div class="flex flex-col gap-9"></div>
    </div>
  </DefaultLayout>
</template>
