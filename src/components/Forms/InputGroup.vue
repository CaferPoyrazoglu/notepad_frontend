<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: String,
    type: String,
    placeholder: String,
    customClasses: String,
    required: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<template>
  <div :class="customClasses">
    <label class="mb-2.5 block text-primary dark:text-white">
      {{ label }}
      <span v-if="required" class="text-primary">*</span>
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    />
  </div>
</template>
