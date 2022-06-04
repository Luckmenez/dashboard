<script setup>
import HeaderLogged from '../../components/HeaderLogged'
import ContentLoader from '../../components/ContentLoader'
import useStore from '../../hooks/useStore'
import Icon from '../../components/Icon'
import palette from '../../../palette'
import { defineComponent, reactive } from 'vue'

defineComponent({
  components: [Icon, ContentLoader, HeaderLogged]
})

const brandColors = palette.brand
const store = useStore()

const state = reactive({
  isLoading: true
})

</script>

<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged/>
  </div>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de criação e instalação de suas credenciais
    </p>
  </div>
  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e Configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Esta aqui é a sua chave de api
      </p>

      <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex py-3 pl-5 mt-2 rounded justify-between items-center bg-brand-gray w-full lg:w-1/2"
      >
        <span>{{ store.currentUser.apiKey }}</span>
        <div class="flex ml-20 mr-5">
          <Icon
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <Icon
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo para começar a receber feedbacks
      </p>

      <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="py-3 pl-5 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <pre>&lt;script scr="https://Luckmenez-feedbacker-widget.netlify.app:apiKey={{ store.currentUser.apiKey }}"&gt;&lt;/script&gt;</pre>
      </div>
    </div>
  </div>
</template>
