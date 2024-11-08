<template>
    <div class="flex justify-end mb-6">
      <button
        @click="$emit('add')"
        class="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
      >
        <i class="pi pi-plus me-3"></i>add field section
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddFieldButton',
    emits: ['add']
  }
  </script>