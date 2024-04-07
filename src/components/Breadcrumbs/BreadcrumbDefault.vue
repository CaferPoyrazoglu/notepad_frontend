<script setup lang="ts">
const props = defineProps(['pageTitle'])
</script>

<template>
  <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <nav>
      <ol class="flex items-center gap-2">
        <li class="font-medium text-primary text-2xl">{{ props.pageTitle }}</li>
      </ol>
    </nav>
  </div>
</template>
