<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import DropdownUser from './DropdownUser.vue'
import { useIsLoadingStore } from '@/stores/isLoading'
import LoadingView from "@/views/LoadingView.vue";

const isLoadingStore = useIsLoadingStore()


const { isSidebarOpen, toggleSidebar, page } = useSidebarStore()
</script>

<template>
  <header
    class="sticky top-0 z-999 flex w-full bg-white"
  >
    <div class="flex flex-grow items-center justify-between py-6.5 px-4  md:px-6">
      <div class="flex items-center gap-2 sm:gap-4 lg:hidden">
        <!-- Hamburger Toggle BTN -->
        <button
          class="z-99999 block rounded-sm bg-white p-1.5 dark:border-strokedark dark:bg-boxdark lg:hidden"
          @click="
            () => {
              toggleSidebar()
            }
          "
        >
          <span class="relative block h-5.5 w-5.5 cursor-pointer">
            <span class="du-block absolute right-0 h-full w-full">
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-300': !isSidebarOpen }"
              ></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-400': !isSidebarOpen }"
              ></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-500': !isSidebarOpen }"
              ></span>
            </span>
            <span class="du-block absolute right-0 h-full w-full rotate-45">
              <span
                class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white"
                :class="{ '!h-0 delay-[0]': !isSidebarOpen }"
              ></span>
              <span
                class="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white"
                :class="{ '!h-0 dealy-200': !isSidebarOpen }"
              ></span>
            </span>
          </span>
        </button>
      </div>
      <LoadingView v-if="isLoadingStore.isLoading"></LoadingView>
      <h1 v-else class="text-black font-bold text-xl text-primary">{{ page }}</h1>
      <div class="flex items-center gap-3 2xsm:gap-7">
        <ul class="flex items-center gap-2 2xsm:gap-4">
          <li></li>
        </ul>
        <DropdownUser />
      </div>
    </div>
  </header>
</template>
