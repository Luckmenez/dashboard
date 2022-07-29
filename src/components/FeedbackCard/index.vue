<script setup>
import { defineComponent, defineProps } from 'vue'
import Badge from './badge'

defineComponent([Badge])

defineProps({
  feedback: { type: Object, required: true }
})

function handleToogle () {
  console.log('toogle')
}
</script>

<template>
  <div
    @click="handleToogle"
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
  >
    <div class="flex items-center justify-center w-full mb-8">
      <badge :type="feedback.type"/>
      <span class="font-regular text-brand-graydark">
        {{ feedback.createdAt}}
      </span>
    </div>
  </div>
</template>
