<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
    @click.self="$emit('close')"
  >
    <div class="w-5/6 bg-white h-full overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <button 
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <component 
          :is="component"
          v-bind="componentProps"
          @close="$emit('close')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  component: {
    type: [Object, String],
    required: true
  },
  componentProps: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['close'])
</script>