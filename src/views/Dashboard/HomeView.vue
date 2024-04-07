<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import {useRouter} from "vue-router";
const router = useRouter()

redirect()
function redirect() {
  try {
    router.push('/notes')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <DefaultLayout> </DefaultLayout>
</template>
