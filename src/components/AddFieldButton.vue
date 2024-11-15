<template>
    <div class="flex justify-center my-6">
      <button
        @click="$emit('add')"
        class="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
      >
        <i class="pi pi-plus text-xl"></i>
        Add New Field Section
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddFieldButton',
    emits: ['add']
  }
  </script>