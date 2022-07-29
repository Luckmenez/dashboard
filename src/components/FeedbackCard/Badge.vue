<script setup>
import { defineProps, computed, toRefs } from 'vue'

const props = defineProps({
  type: { type: String, required: true }
})

const { type } = toRefs(props)

const label = computed(() => {
  if (type.value === 'ISSUE') {
    return 'problema'
  }
  if (type.value === 'IDEA') {
    return 'ideia'
  }

  return 'outros'
})

const clasColor = computed(() => {
  if (type.value === 'ISSUE') {
    return 'brand-danger'
  }
  if (type.value === 'IDEA') {
    return 'brand-warning'
  }

  return 'brand-graydark'
})
</script>

<template>
  <span
    :class="`bg-${clasColor}`"
    class="p-2 text-xs font-black uppercase rounded-full"
  >
    {{ label }}
  </span>
</template>
