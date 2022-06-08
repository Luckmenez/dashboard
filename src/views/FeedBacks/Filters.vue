<script setup>
import { onMounted, reactive, defineEmits } from 'vue'
import services from '../../services'
import store from '../../store'

const emit = defineEmits(['select'])
// import useStore from '../../hooks/useStore'

// const store = useStore('Global')
const state = reactive({
  hasError: false,
  filters: [
    { label: null, amount: null }
  ]
})

const LABELS = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideias',
  other: 'Outros'
}

const COLORS = {
  all: 'brand-info',
  issue: 'brand-danger',
  idea: 'brand-warning',
  other: 'brand-graydark'
}

function applyFiltersStructure (summary) {
  return Object.keys(summary).reduce((acc, cur) => {
    const currentFilter = {
      label: LABELS[cur],
      color: COLORS[cur],
      amount: summary[cur]
    }
    if (cur === 'all') {
      currentFilter.active = true
    } else {
      currentFilter.type = cur
    }

    return [...acc, currentFilter]
  }, [])
}

function handleSelection ({ type }) {
  if (store.isLoading) {
    state.filters = state.filters.map(filter => {
      if (filter.type === type) {
        return { ...filter, active: true }
      }
      return { ...filter, active: false }
    })
    emit('select', type)
  }
}

console.log(handleSelection('ok'))

onMounted(async () => {
  try {
    const { data } = await services.feedbacks.getSummary()
    console.log('data: ', data)
    state.filters = applyFiltersStructure(data)
  } catch (error) {
    console.log('erro: ', error)
    state.hasError = !!error
    state.filters = applyFiltersStructure({ all: 0, issue: 0, idea: 0, other: 0 })
  }
})
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-regular text-brand-darkgray">
      Filtros
    </h1>

    <ul class="flex flex-col mt-3 list-none">
      <li
        v-for="filter in state.filters"
        :key="filter.label"
        :class="{
          'bg-gray-200 bg-opacity-50': filter.active
        }"
        class="flex items-center justify-between px-4 py-1 rounded cursor-pointer"
        @click="() => handleSelection(filter)"
      >
        <div class="flex items-center">
          <span
            :class="`bg-${filter.color}`"
            class="inline-block w-2 h-2 mr-2 rounded-full "
          />{{ filter.label }}

          <span
            :class="filter.active ? `text-${filter.color}` : 'text-brand-graydark'"
            class="font-bold"
          >
            {{ filter.amount }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
