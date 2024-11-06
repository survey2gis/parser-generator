<!-- HelpSidebar.vue -->
<template>
    <div 
      v-if="isVisible" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
      @click.self="close"
    >
      <div class="w-1/2 bg-white h-full p-4 overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">{{ title }}</h3>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        <!-- Parser Section Help Content -->
        <div v-if="section === 'parser'" class="prose prose-sm">
          <h4>Parser Configuration Help</h4>
          <p>The parser section defines how your data will be processed. Here are the key fields:</p>
          
          <div class="mb-4">
            <h5 class="font-bold">Name</h5>
            <p>Required. The name of your parser configuration.</p>
          </div>
          
          <div class="mb-4">
            <h5 class="font-bold">Coordinate Fields</h5>
            <ul>
              <li><strong>coor_x</strong>: Required. Field name for X coordinates</li>
              <li><strong>coor_y</strong>: Required. Field name for Y coordinates</li>
              <li><strong>coor_z</strong>: Optional. Field name for Z coordinates</li>
            </ul>
          </div>
          
          <div class="mb-4">
            <h5 class="font-bold">Geometry Tags</h5>
            <ul>
              <li><strong>geom_tag_point</strong>: Symbol for point features (default: .)</li>
              <li><strong>geom_tag_line</strong>: Symbol for line features (default: $)</li>
              <li><strong>geom_tag_poly</strong>: Symbol for polygon features (default: @)</li>
            </ul>
          </div>
          
          <div class="mb-4">
            <h5 class="font-bold">Other Settings</h5>
            <ul>
              <li><strong>comment_mark</strong>: Symbol for comments (default: #)</li>
              <li><strong>no_data</strong>: Value for missing data (default: -1)</li>
              <li><strong>key_unique</strong>: Whether keys must be unique</li>
              <li><strong>tag_strict</strong>: Enforce strict tagging rules</li>
            </ul>
          </div>
        </div>
  
        <!-- Imprint  Content -->
        <div v-if="section === 'imprint'" class="prose prose-sm">
          <p>Each field section defines how to parse a specific data field:</p>
        </div>

        <!-- Help  Content -->
        <div v-if="section === 'help'" class="prose prose-sm">
          <p>Help</p>
        </div>

        <!-- Field Section Help Content -->
        <div v-if="section === 'field'" class="prose prose-sm">
          <h4>Field Configuration Help</h4>
          <p>Each field section defines how to parse a specific data field:</p>
          
          <div class="mb-4">
            <h5 class="font-bold">Name</h5>
            <p>Required. Maximum 10 characters, letters, numbers, and underscores only.</p>
          </div>
          
          <div class="mb-4">
            <h5 class="font-bold">Type</h5>
            <p>Required. Choose from:</p>
            <ul>
              <li><strong>integer</strong>: Whole numbers</li>
              <li><strong>double</strong>: Decimal numbers</li>
              <li><strong>text</strong>: Text strings</li>
            </ul>
          </div>
          
          <div class="mb-4">
            <h5 class="font-bold">Other Settings</h5>
            <ul>
              <li><strong>change_case</strong>: Convert text to upper/lower case</li>
              <li><strong>empty_allowed</strong>: Whether empty values are allowed</li>
              <li><strong>merge_separators</strong>: Combine multiple separators</li>
              <li><strong>persistent</strong>: Keep value for subsequent records</li>
              <li><strong>skip</strong>: Skip this field during processing</li>
              <li><strong>unique</strong>: Enforce unique values</li>
            </ul>
          </div>
          
          <div class="mb-4">
            <h5 class="font-bold">Formatting</h5>
            <ul>
              <li><strong>quotation</strong>: Character used for quotes</li>
              <li><strong>separator</strong>: Character used to separate values</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelpSidebar',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      section: {
        type: String,
        required: true
      }
    },
    computed: {
      title() {
        const titles = {
          parser: 'Parser Section Help',
          field: 'Field Section Help',
          imprint: 'Imprint',
          help: 'Help',
        }
        return titles[this.section] || ''
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
  </script>
  
  <style scoped>
  .prose h4 { @apply text-lg font-semibold mb-2; }
  .prose h5 { @apply font-semibold mb-1; }
  .prose ul { @apply list-disc ml-4 mb-2; }
  .prose li { @apply mb-1; }
  </style>