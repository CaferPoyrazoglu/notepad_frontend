<script setup lang="ts">
import HeaderArea from '@/components/Header/HeaderArea.vue'
import SidebarArea from '@/components/Sidebar/SidebarArea.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <SidebarArea />
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <HeaderArea />
      <main>
        <div class="">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>
