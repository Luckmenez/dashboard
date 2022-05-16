<script setup>
import { reactive, defineComponent } from 'vue'
import { useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import useModal from '../../hooks/useModal'
import Icon from '../Icon/index.vue'
import { validateEmptyAndLength3, validateEmptyAndEmail } from '../../utils/validators'
import services from '../../services'

defineComponent({
  components: [Icon]
})

const modal = useModal()
const router = useRouter()
const toast = useToast()

const {
  value: emailValue,
  errorMessage: emailErrorMessage
} = useField('email', validateEmptyAndEmail)

const {
  value: passwordValue,
  errorMessage: passwordErrorMessage
} = useField('password', validateEmptyAndLength3)

const state = reactive({
  hasErrors: false,
  isLoading: false,
  email: {
    value: emailValue,
    errorMessage: emailErrorMessage
  },
  password: {
    value: passwordValue,
    errorMessage: passwordErrorMessage
  }
})
/* eslint-disable */
async function handleSubmit (event) {
  try {
    toast.clear()
    state.isLoading = true
    const { data, errors } = await services.auth.login({
      email: state.email.value,
      password: state.password.value,
    })

    if(!errors){
      window.localStorage.setItem('token', data.token)
      router.push({ name: 'Feedbacks' })
      state.isLoading = false
      modal.close()
      return
    }

    if(errors.status === 404){
      toast.error('E-mail não encontrado')
    }
    if(errors.status === 401){
      toast.error('E-mail/senha inválido')
    }
    if(errors.status === 400){
      toast.error('Ocorreu um erro ao tentar fazer o login')
    }
    state.isLoading = false
  } catch (error) {
    state.isLoading = false
    state.hasErrors = !!error
    toast.error('Ocorreu um erro ao tentar fazer o login')
  }
}
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
      Entre na Sua Conta
    </h1>
    <button
      class="text-4xl flex items-center justify-center text-gray-600 focus:outline-none"
      @click="modal.close"
    >
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail:</span>
        <input
          v-model="state.email.value"
          type="email"
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-grey-100 border-2 border-transparent rounded"
          placeholder="John.doe@email.com"
        >
      </label>
      <span
        v-if="!!state.email.errorMessage"
        class="block font-medium text-brand-danger"
      >
        {{ state.email.errorMessage }}
      </span>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha:</span>
        <input
          v-model="state.password.value"
          type="password"
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-grey-100 border-2 border-transparent rounded"
        >
      </label>
      <span
        v-if="!!state.password.errorMessage"
        class="block font-medium text-brand-danger"
      >
        {{ state.password.errorMessage }}
      </span>
      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading
        }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <Icon v-if="state.isLoading" name="loading" class="animate-spin"/>
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>
