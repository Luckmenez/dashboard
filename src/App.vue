<script setup>
import { defineComponent, watch } from '@vue/runtime-core'
import ModalFactory from './components/ModalFactory/index.vue'
import { useRoute } from 'vue-router'
import router from './router'
import services from './services'
import { setCurrentUser } from './store/user'

defineComponent({
  components: [ModalFactory]
})

const route = useRoute()

watch(() => route.path, async () => {
  if (route.meta.hasAuth) {
    const token = window.localStorage.getItem('token')
    if (!token) {
      router.push({ name: 'Home' })
      return
    }
    const { data } = await services.users.getMe()
    setCurrentUser(data)
  }
})

</script>

<template>
  <modal-factory/>
  <router-view />
</template>
