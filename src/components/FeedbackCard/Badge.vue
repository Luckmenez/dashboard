<script setup>
import { defineProps, computed, toRefs } from 'vue'

const props = defineProps({
  type: { type: String, required: true }
})

const { type } = toRefs(props)

const label = computed(() => {
  if (type === 'ISSUE') {
    return 'problema'
  }
  if (type === 'IDEA') {
    return 'ideia'
  }

  return 'outros'
})

const clasColor = computed(() => {
  if (type === 'ISSUE') {
    return 'brand-danger'
  }
  if (type === 'IDEA') {
    return 'brand-warning'
  }

  return 'brand-graydark'
})
</script>

<template>
  <span
    :class="`br-${clasColor}`"
    class="p-2 text-xs font-black uppercase rounded-full"
  >
    {{ label }}
  </span>
</template>
