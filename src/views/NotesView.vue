<script setup lang="ts">

import NotesTable from '@/components/Tables/NotesTable.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
      <div class="col-span-12 xl:col-span-8">
        <NotesTable />
      </div>
  </DefaultLayout>
</template>
