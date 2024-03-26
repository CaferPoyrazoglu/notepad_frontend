<script setup lang="ts">
import { ref } from 'vue'

const tagData = ref([
  {
    name: 'yazilim',
    count: 63
  },
  {
    name: 'teknoloji',
    count: 4
  },
  {
    name: 'spor',
    count: 21
  },
  {
    name: 'saglik',
    count: 4
  },
  {
    name: 'sosyalmedya',
    count: 21
  },
  {
    name: 'gundem',
    count: 43
  },
  {
    name: 'sondakika',
    count: 37
  },
  {
    name: 'egitim',
    count: 12
  }
])
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

          <p class="hidden text-black dark:text-white sm:block">#{{ tag.name }}</p>
        </div>

        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white">{{ tag.count }}</p>
        </div>

      </div>
    </div>
  </div>
</template>
