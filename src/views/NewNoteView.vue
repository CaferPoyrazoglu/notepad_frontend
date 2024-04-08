<script lang="ts" setup>
import axiosInstance from '@/api/axiosInstance'
import {onMounted, ref} from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useRouter } from 'vue-router'
import {useSidebarStore} from "@/stores/sidebar";

const sidebarStore = useSidebarStore()
const router = useRouter()

const noteRequest = ref({
  id: '',
  title: '',
  text: '',
  tags: []
})

const tagString = ref({
  tags: ''
})

onMounted(async () => {
  const id = router.currentRoute.value.query.id;
  if(typeof id === 'string'){
    try {
      const {data} = await axiosInstance.get('note/' + router.currentRoute.value.query.id, {
        params: {},
        withCredentials: true
      })
      noteRequest.value.title = data.title
      noteRequest.value.text = data.text
      noteRequest.value.id = data.id

      for (let i = 0; i < data.tags.length; i++) {
        tagString.value.tags += data.tags[i].text;
        if (i !== data.tags.length - 1) {
          tagString.value.tags += ', ';
        }
      }

      console.log(noteRequest)
    } catch (error) {
      console.log(error)
    }
  }
})
async function newNote() {
  try {
    let endpoint = 'note/add'
    if(!(noteRequest.value.id == undefined || noteRequest.value.id == '')){
      endpoint = 'note/edit'
    }
    noteRequest.value.tags = tagString.value.tags.split(' ').join(',').split(',').map(s => s.trim()).filter(item => item.trim() !== '')
    const loginResponse = await axiosInstance.post(endpoint, noteRequest.value, {
      withCredentials: true
    })
    sidebarStore.page = loginResponse.data.title
    await router.push('/note/' + loginResponse.data.id)
  } catch (error) {
    console.log(error.toString())
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div class="flex flex-col gap-9">
        <form class="space-y-4 md:space-y-6" @submit.prevent="newNote">
          <div class="mx-6">
            <label class="mb-2.5 pt-2.5 block text-primary font-medium dark:text-white"> Başlık </label>
            <input
              v-model="noteRequest.title"
              placeholder="Yazınız için bir başlık girin"
              class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              type="text"
            />
            <label class="mb-2.5 pt-2.5 block text-primary font-medium dark:text-white"> Etiketler </label>
            <input
              v-model="tagString.tags"
              placeholder="Etiketler boşluk yada virgül ile ayırılabilir (e.g. sağlık, teknoloji, yazılım)"
              class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              type="text"
            />
            <label class="mb-2.5 pt-2.5 block text-primary font-medium dark:text-white"> İçerik </label>
            <jodit-editor v-model="noteRequest.text" />
            <button
              class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
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
