<template>
  <ul class="pagination-container">
    <li>
      <button
        :class="small ? 'pagination-btn-small' : ''"
        class="pagination-btn pagination-first-btn"
        @click="first()"
      >
        <span>{{ props.firstBtn }}</span>
      </button>
    </li>

    <li>
      <button
        :class="small ? 'pagination-btn-small' : ''"
        class="pagination-btn pagination-prev-btn"
        @click="prev()"
      >
        <span>{{ props.prevBtn }}</span>
      </button>
    </li>

    <li v-if="paginationItems.length > 4 && parseInt(props.modelValue) > 3">
      <button :class="small ? 'pagination-btn-small' : ''" class="pagination-btn">...</button>
    </li>

    <template v-for="(item, index) in paginationItems" :key="index">
      <li v-if="verifyRange(item)">
        <button
          :class="[
            item == parseInt(props.modelValue) ? 'active-pagination-btn' : '',
            small ? 'pagination-btn-small' : ''
          ]"
          class="pagination-btn"
          @click="updateModel(item)"
        >
          {{ item }}
        </button>
      </li>
    </template>

    <li
      v-if="paginationItems.length > 4 && parseInt(props.modelValue) < paginationItems.length - 1"
    >
      <button :class="small ? 'pagination-btn-small' : ''" class="pagination-btn">...</button>
    </li>

    <li>
      <button
        :class="small ? 'pagination-btn-small' : ''"
        class="pagination-btn pagination-next-btn"
        @click="next()"
      >
        <span>{{ props.nextBtn }}</span>
      </button>
    </li>

    <li>
      <button
        :class="small ? 'pagination-btn-small' : ''"
        class="pagination-btn pagination-last-btn"
        @click="last()"
      >
        <span>{{ props.lastBtn }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  totalRows: {
    type: Number,
    default: 1
  },
  perPage: {
    type: Number,
    default: 1
  },
  modelValue: {
    default: ''
  },
  prevBtn: {
    type: String,
    default: '‹'
  },
  nextBtn: {
    type: String,
    default: '›'
  },
  firstBtn: {
    type: String,
    default: '«'
  },
  lastBtn: {
    type: String,
    default: '»'
  },
  small: {
    type: Boolean,
    default: false
  }
})

const paginationItems = computed(() => {
  let pages = Math.ceil(props.totalRows / props.perPage)
  return Array.from({ length: pages }, (_, i) => i + 1)
})

const verifyRange = (item: number) => {
  if (parseInt(props.modelValue) < 4 && item < 5) return true
  else if (
    parseInt(props.modelValue) == paginationItems.value.length &&
    item > parseInt(props.modelValue) - 3
  )
    return true
  else if (item >= parseInt(props.modelValue) - 1 && item <= parseInt(props.modelValue) + 1)
    return true
  else return false
}

const prev = () => {
  if (parseInt(props.modelValue) > 1) updateModel(parseInt(props.modelValue) - 1)
}

const next = () => {
  if (parseInt(props.modelValue) < paginationItems.value.length)
    updateModel(parseInt(props.modelValue) + 1)
}

const first = () => {
  updateModel(1)
}

const last = () => {
  updateModel(paginationItems.value.length)
}

const updateModel = (num: number) => {
  emit('update:modelValue', num)
  emit('change', num)
}
</script>

<style scoped>
.pagination-container {
  display: inline-flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.pagination-btn {
  cursor: pointer;
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #a11744;
  background-color: #fff;
  font-weight: medium;
}

.pagination-btn-small {
  padding: 0.25rem 0.5rem !important;
}

.pagination-btn:hover {
  color: #a11744;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.active-pagination-btn,
.active-pagination-btn:hover {
  color: #a11744;
  background-color: transparent;
  font-weight: bolder;
}
</style>
