<script setup lang="ts">
const props = defineProps(['subtitle', 'title', 'customClasses'])
</script>

<template>
    <div class="w-1/5">
      <div class="w-full">
        <span class="mb-1.5 block font-medium">{{ props.subtitle }}</span>
        <h2 class="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          {{ props.title }}
        </h2>
        <slot></slot>
      </div>
    </div>
</template>
