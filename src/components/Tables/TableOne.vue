<script setup lang="ts">
import { ref } from 'vue'

import BrandThree from '@/assets/images/brand/brand-01.svg'

const brandData = ref([
  {
    logo: BrandThree,
    name: 'Yazılım',
    visitors: 63
  },
  {
    logo: BrandThree,
    name: 'Teknoloji',
    visitors: 4
  },
  {
    logo: BrandThree,
    name: 'Spor',
    visitors: 21
  },
  {
    logo: BrandThree,
    name: 'Sağlıklı Yaşam',
    visitors: 4
  }
])
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Çalışma Masası</h4>

    <div class="flex flex-col">
      <div class="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
        <div class="p-2.5 xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Konu</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Defter Sayısı</h5>
        </div>
      </div>

      <div
        v-for="(brand, key) in brandData"
        :key="key"
        :class="`grid grid-cols-3 sm:grid-cols-2 ${
          key === brandData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
        }`"
      >
        <div class="flex items-center gap-3 p-2.5 xl:p-5">
          <div class="flex-shrink-0">
            <img :src="brand.logo" alt="Brand" />
          </div>
          <p class="hidden text-black dark:text-white sm:block">{{ brand.name }}</p>
        </div>

        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white">{{ brand.visitors }}</p>
        </div>

      </div>
    </div>
  </div>
</template>
