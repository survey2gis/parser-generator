<template>
    <div class="flex h-screen flex-col">
      <!-- Header -->
      <div class="bg-white p-4 border-b border-grey">
        <div class="mx-2 flex justify-between items-center">
          <!-- Logo -->
          <h1 class="text-lg font-semibold">
            <i class="pi pi-bullseye me-3 text-black-500"></i>
            <a href="/">Survey2GIS Parser Generator <span class="text-red-500 italic">DEV</span></a>
          </h1>
  
          <!-- menu -->
          <div class="flex items-center gap-6">
            <!-- Import Options Dropdown -->
            <div class="relative" v-click-outside="closeDropdown">
              <button
                @click="isDropdownOpen = !isDropdownOpen"
                class="px-4 py-2 border border-gray-300 flex items-center gap-2 bg-white hover:bg-gray-50 w-full transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span class="text-gray-700 font-medium px-2">{{ t('navigation.loadParser') }}</span>
                <i 
                  class="pi pi-chevron-down text-gray-500 transition-transform duration-200"
                  :class="{'rotate-180': isDropdownOpen}"
                ></i>
              </button>
  
              <!-- Dropdown Menu -->
              <div 
                v-if="isDropdownOpen"
                class="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full overflow-hidden"
              >
                <div class="py-1">
                  <label 
                    for="file-upload" 
                    class="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer w-full transition-colors duration-150"
                    :class="{ 'opacity-50 cursor-not-allowed': uploadisDisabled }"
                    @click.prevent="!uploadisDisabled && triggerFileUpload()"
                  >
                    <i class="pi pi-upload text-blue-600 me-3"></i>
                    <span class="text-gray-700">{{ t('navigation.uploadParser') }}</span>
                  </label>
                  
                  <button
                    class="w-full text-left flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                    :class="{ 'opacity-50 cursor-not-allowed': uploadisDisabled }"
                    @click="!uploadisDisabled && loadSampleData()"
                  >
                    <i class="pi pi-cloud-download text-blue-600 me-3"></i>
                    <span class="text-gray-700">{{ t('navigation.loadSample') }}</span>
                  </button>

                  <button
                    class="w-full text-left flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                    :class="{ 'opacity-50 cursor-not-allowed': uploadisDisabled }"

                    @click="!uploadisDisabled && showRepository()"
                    >
                    <i class="pi pi-database text-blue-600 me-3"></i>
                    <span class="text-gray-700">{{ t('navigation.parser_repository') }}</span>
                    </button>

                    <button
                      class="hidden w-full text-left flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                      :class="{ 'opacity-50 cursor-not-allowed': uploadisDisabled }"
                      @click="!uploadisDisabled && showFormatDetector()"
                    >
                      <i class="pi pi-search text-blue-600 me-3"></i>
                      <span class="text-gray-700">{{ t('format.detected_input_format') }}</span>
                    </button>

                </div>
              </div>
  
              <input
                type="file"
                accept=".ini,.txt"
                @change="handleFileUpload"
                class="hidden"
                ref="fileInput"
                id="file-upload"
              />
            </div>
  
            <!-- Download Button -->
            <button
              @click="downloadIni"
              :disabled="!isFormValid"
              class="py-2 px-4 flex items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              :class="isFormValid 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm focus:ring-green-500' 
                : 'bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed'"
            >
              <i class="pi pi-download"></i>
              <span>{{ t('navigation.download') }}</span>
            </button>
  
            <!-- Language Selector -->
            <select
              v-model="$i18n.locale"
              class="px-3 py-2 border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'hidden': uploadisDisabled }"

              >
              <option value="en">En</option>
              <option value="de">De</option>
            </select>
  
            <!-- Help Links -->
            <div class="flex items-center gap-4">
              <button 
                @click.stop="showHelp('imprint')" 
                class="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
              >
                {{ t('navigation.imprint') }}
              </button>
  
              <button 
                @click.stop="showHelp('help')" 
                class="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
              >
                {{ t('navigation.help') }}
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Left Panel -->
        <div class="w-1/2 p-4 bg-gray-100 overflow-auto left-panel ps-6 pe-6 pt-6" id="left_panel">
          <!-- Parser Section Card -->
          <ParserSection
          v-model="parserSection"
                :mandatory-fields="MANDATORY_FIELDS.parser"
                :is-open="openSection === 'parser'"
                :show-start-label="showStartLabel"
                :started="hasStarted" 
                @toggle-section="handleToggleSection"
                @help="showHelp"
                @started="hasStarted = true"
          />
  
          <!-- Field Sections -->
          <template v-for="(field, index) in fieldSections" :key="index">
            <FieldSection
              v-model="fieldSections[index]"
              :index="index"
              :is-open="openSection === index"
              :validation-errors="validationErrors"
              :mandatory-fields="MANDATORY_FIELDS.field"
              @toggle-section="handleToggleSection"
              @help="showHelp"
              @remove="removeFieldSection"
              @validate="validateField"
            />
          </template>
  
          <!-- Add Field Button -->
          <AddFieldButton 
            v-if="hasStarted"
            @add="addFieldSection"
          />
        </div>
  
        <!-- Right Panel -->
        <div class="w-1/2 flex flex-col pb-4 ps-4" id="right_panel">
          <div class="flex-grow overflow-auto code__wrapper">
            <pre class="rounded-lg"><code class="language-ini code__field">{{ generatedIni }}</code></pre>
          </div>
        </div>
      </div>
  
        <!-- Sidebar -->
        <DynamicSidebar 
            v-if="showSidebar"
            :title="sidebarConfig.title"
            :component="sidebarConfig.component"
            :component-props="{
            ...sidebarConfig.props,
            onSelectParser: handleParserSelection
            }"
            @close="closeSidebar"
        />

      <!-- Guide Notification -->
      <div
        v-if="showToast"
        class="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-md border border-gray-200 transform transition-all duration-500 ease-in-out z-50"
        :class="showToast ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'"
      >
        <div class="flex items-start">
          <div class="flex-1 mr-4">
            <p class="text-gray-900">
              👋 Welcome! New here? Start  
              <a 
                href="#" 
                @click.prevent="showHelp('help')" 
                class="text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                here
              </a> 
            </p>
          </div>
          <button
            @click="closeToast"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setupPrism } from './utils/prism-setup'
import { useParser } from './composables/useParser'
import { useFields } from './composables/useFields'
import { useUI } from './composables/useUI'
import { useFileHandler } from './composables/useFileHandler'
import { useIniGenerator } from './composables/useIniGenerator'
import { MANDATORY_FIELDS } from './constants/parser'

import DynamicSidebar from './components/DynamicSidebar.vue'
import ParserSection from './components/ParserSection.vue'
import FieldSection from './components/FieldSection.vue'
import AddFieldButton from './components/AddFieldButton.vue'

import 'primeicons/primeicons.css'
import 'prismjs/themes/prism-tomorrow.css'

// Initialize Prism and i18n
setupPrism()
const { t } = useI18n()
const hasStarted = ref(false)

// Initialize composables
const { parserSection, resetParser } = useParser()

const handleParserSelection = async ({ content }) => {
  try {
    await parseIniContent(content)
    closeSidebar()
    closeDropdown()
  } catch (error) {
    console.error('Error loading parser:', error)
  }
}

const { 
  fieldSections, 
  validationErrors, 
  validateField, 
  addFieldSection, 
  removeFieldSection 
} = useFields()


const {
  generatedIni,
  downloadIni
} = useIniGenerator(parserSection, fieldSections)

const { 
  showSidebar, 
  showRepository,
  sidebarConfig, 
  showStartLabel,
  isDropdownOpen,
  showToast,
  openSection,
  showHelp,
  closeSidebar,
  closeToast, 
  closeDropdown,
  toggleSection,
  showFormatDetector
} = useUI()

const {
  uploadisDisabled,
  handleFileUpload,
  loadSampleData,
  triggerFileUpload,
  parseIniContent
} = useFileHandler({
  parserSection,
  fieldSections,
  hasStarted,
  openSection,
  resetParser,
  validationErrors,
  addFieldSection,
  validateField
})



const handleToggleSection = (section) => {
  toggleSection(section, generatedIni.value)
}

// Form validation
const isFormValid = computed(() => {
  const isParserValid = Object.entries(parserSection.value)
    .filter(([key]) => MANDATORY_FIELDS.parser.includes(key))
    .every(([, value]) => value && value.trim() !== '')

  const areFieldsValid = fieldSections.value.length > 0 && 
    !Object.keys(validationErrors.value).length &&
    fieldSections.value.every(field => 
      field.name && field.name.trim() !== '' &&
      field.type && field.type.trim() !== ''
    )

  return isParserValid && areFieldsValid
})

// Setup
onMounted(() => {
  showToast.value = true
  setTimeout(() => {
    closeToast()
  }, 10000)
})
</script>

<style>
#right_panel {
  background: #2d2d2d;
}

.code__wrapper pre {
  margin: 0;
  padding: 1rem;
}

.code__wrapper pre code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.token.section {
  color: #79b8ff !important;
}

.token.key {
  color: #e1e4e8 !important;
}

.token.value {
  color: #85e89d !important;
}

.token.comment {
  color: #959da5 !important;
  font-style: italic;
}


/* Global scrollbar styling */
* {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: transparent transparent; /* Firefox */
}

*:hover {
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent; /* Firefox */
}

/* Webkit scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.3s;
}

*:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
}

*:hover::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>