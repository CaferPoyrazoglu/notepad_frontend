<script setup lang="ts">
import { ref } from 'vue'

const tagData = ref([
  {
    name: 'Fit Yaşam',
  },
  {
    name: 'Kariyer Planı',
  },
  {
    name: 'iOS 17 ile Gelen Yeni Özellikler',
  },
  {
    name: 'Spring Boot nedir?',
  },
  {
    name: 'Twitter neden X oldu?',
  },
  {
    name: 'Film ve Dizi Tavsiyeleri - Mart 2024',
  },
  {
    name: 'GTA 6 Sistem Gereksinimleri',
  },
  {
    name: "Türkiye'de Kesin Görülmesi Gereken Yerler",
  }
])
</script>

<template>
  <div
      class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Başlık</h4>

    <div class="flex flex-col">


      <div
          v-for="(tag, key) in tagData"
          :key="key"
          :class="`grid grid-cols-3 sm:grid-cols-2 ${
          key === tagData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
        }`"
      >
        <div class="flex items-center gap-3 p-2.5 xl:p-5">

          <p class="hidden text-black dark:text-white sm:block">{{ tag.name }}</p>
        </div>


      </div>
    </div>
  </div>
</template>
