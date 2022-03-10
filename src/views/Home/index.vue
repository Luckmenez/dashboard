<script setup>
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import contact from './Contact.vue'
import customHeader from './CustomHeader.vue'

const router = useRouter()

onMounted(() => {
  const token = window.localStorage.getItem('token')
  if (token) {
    router.push({ name: 'Feedbacks' })
  }
})

function handleLogin () {
  console.log('logged in')
}

function handleAccountCreation () {
  console.log('account created')
}
</script>

<template>
  <custom-header
    @create-account="handleAccountCreation"
    @login="handleLogin"
  />
  <contact/>
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedbacker © 2022</p>
  </div>
</template>
