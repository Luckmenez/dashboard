<script setup>
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import ChevronDown from './ChevronDown.vue'
import { defineProps, defineComponent } from 'vue'

defineComponent({
  components: [Loading, Copy]
})

defineProps({
  name: { type: String, required: true }
})

function handleIconToogle (iconName) {
  switch (iconName) {
    case 'loading':
      return Loading
    case 'copy':
      return Copy
    case 'chevronDown':
      return ChevronDown
  }
}
</script>

<template>
  <component :is="handleIconToogle(name)" v-bind="$props"/>
</template>
