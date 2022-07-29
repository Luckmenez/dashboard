<script setup>
import { defineComponent } from 'vue'
import ContentLoader from '../ContentLoader'

defineComponent([ContentLoader])
</script>

<template>
  <ContentLoader
    class="flex flex-col items-center rounded"
    width="100%"
    height="300px"
  >
    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2s"
    />
    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2.3s"
    />
    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2.7s"
    />
  </ContentLoader>
</template>
