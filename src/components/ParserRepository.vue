<template>
    <div class="space-y-6">
      <!-- Search and Status Bar -->
      <div class="flex justify-between items-center">
        <div class="relative flex-grow max-w-md">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search parsers..."
            class="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <i class="pi pi-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        
        <!-- Loading/Error State -->
        <div v-if="loading || error" class="text-sm">
          <span v-if="loading" class="text-blue-600">
            <i class="pi pi-spinner animate-spin mr-2"></i>Loading...
          </span>
          <span v-if="error" class="text-red-600">
            <i class="pi pi-exclamation-circle mr-2"></i>{{ error }}
          </span>
        </div>
      </div>
  
      <!-- Parser List -->
      <div v-if="!loading && !error" class="space-y-4">
        <div v-for="parser in filteredParsers" 
             :key="parser.id"
             @click="selectParser(parser)"
             class="bg-white p-4 rounded-lg border hover:border-blue-500 cursor-pointer transition-all hover:shadow-md"
        >
          <div class="flex justify-between items-start">
            <div class="space-y-1">
              <h3 class="font-medium text-gray-900">{{ parser.name }}</h3>
              <p class="text-sm text-gray-600">{{ parser.description }}</p>
              <p class="text-xs text-gray-500">Author: {{ parser.author }}</p>
            </div>
            <button 
              class="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
            >
              <i class="pi pi-download mr-1"></i>
              Load
            </button>
          </div>
        </div>
  
        <!-- No Results -->
        <div v-if="filteredParsers.length === 0" class="text-center py-8 text-gray-500">
          No parsers found matching your search.
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { fetchParserData, fetchParserContent, defineEmits  } from '../utils/github'

  const parsers = ref([])
  const searchTerm = ref('')
  const loading = ref(true)
  const error = ref(null)
  
  // Filter parsers based on search term
  const filteredParsers = computed(() => {
    if (!searchTerm.value) return parsers.value
  
    const term = searchTerm.value.toLowerCase()
    return parsers.value.filter(parser => 
      parser.name.toLowerCase().includes(term) ||
      parser.description.toLowerCase().includes(term) ||
      parser.author.toLowerCase().includes(term)
    )
  })
  
  // Load parser list on component mount
  onMounted(async () => {
    try {
      parsers.value = await fetchParserData()
      loading.value = false
    } catch (err) {
      error.value = 'Failed to load parser list'
      loading.value = false
    }
  })
  
  const emit = defineEmits(['select-parser'])
  
  // Handle parser selection
  const selectParser = async (parser) => {
    try {
      loading.value = true
      error.value = null
      
      // Fetch the parser content
      const content = await fetchParserContent(parser.filename)
      
      // Emit the content to parent
      emit('select-parser', {
        name: parser.name,
        content: content
      })
    } catch (err) {
      error.value = `Failed to load parser: ${err.message}`
    } finally {
      loading.value = false
    }
  }
  </script>