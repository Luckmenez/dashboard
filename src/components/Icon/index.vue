<script setup>
import Loading from './Loading.vue'
import { defineProps, defineComponent } from 'vue'

defineComponent({
  components: [Loading]
})

defineProps({
  name: { type: String, required: true }
})

function handleIconToogle (iconName) {
  console.log(iconName)
  switch (iconName) {
    case 'loading':
      return Loading
  }
}
</script>

<template>
  <component :is="handleIconToogle(name)" v-bind="$props"/>
</template>
