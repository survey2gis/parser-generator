<template>
  <div class="flex h-screen flex-col">
    <!-- Header -->
    <div class="bg-white p-4  border-b border-grey">
    <div class="  mx-2 flex justify-between items-center">
      <!-- Logo -->
      <h1 class="text-lg font-semibold"><i class="pi pi-bullseye me-3 text-black-500"></i><a href="/">Survey2GIS Parser Generator</a></h1>
  
      <!-- menu -->
      <!-- Inside your navigation menu div -->
        <div class="flex items-center gap-6">


        <!-- Import Options Dropdown -->


        <div class="relative" v-click-outside="closeDropdown">
  <button
    @click="isDropdownOpen = !isDropdownOpen"
    class="px-4 py-2 border border-gray-300 flex items-center gap-2 bg-white hover:bg-gray-50 w-full transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  >
    <span class="text-gray-700 font-medium px-2">{{ $t('navigation.loadParser') }}</span>
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
            @click.prevent="uploadisDisabled && triggerFileUpload"
        >
            <i class="pi pi-upload text-blue-600 me-3"></i>
            <span class="text-gray-700">{{ $t('navigation.uploadParser') }}</span>
        </label>
        
        <button
            class="w-full text-left flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
            :class="{ 'opacity-50 cursor-not-allowed': uploadisDisabled }"

            @click="uploadisDisabled && loadSampleData"
        >
            <i class="pi pi-cloud-download text-blue-600 me-3"></i>
            <span class="text-gray-700">{{ $t('navigation.loadSample') }}</span>
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
            <span>{{ $t('navigation.download') }}</span>
        </button>

                <!-- Language Selector -->
            <select
                v-model="$i18n.locale"
                class="px-3 py-2 border border-gray-300  bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {{ $t('navigation.imprint') }}
            </button>

            <button 
            @click.stop="showHelp('help')" 
            class="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            >
            {{ $t('navigation.help') }}
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
          :mandatory-fields="mandatoryFields.parser"
          :is-open="openSection === 'parser'"
          :show-start-label="showStartLabel"
          :started="hasStarted" 
          @toggle-section="toggleSection"
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
                :mandatory-fields="mandatoryFields.field"
                @toggle-section="toggleSection"
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

    <!-- Help Sidebar -->
    <div 
  v-if="showHelpSidebar" 
  class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
  @click.self="closeHelp"
>
<HelpSidebar 
    :is-visible="showHelpSidebar"
    :section="currentHelpSection"
    @close="closeHelp"
  />

  </div>
      <!-- guid Notification -->
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



<script>
import HelpSidebar from './components/HelpSidebar.vue'
import ParserSection from './components/ParserSection.vue'
import FieldSection from './components/FieldSection.vue'
import AddFieldButton from './components/AddFieldButton.vue'
import { useI18n } from 'vue-i18n'
import {
    ref,
    watch,
    onMounted,
    nextTick,
    computed
} from 'vue'
import {
    setupPrism,
    highlightElement
} from './utils/prism-setup'
import 'primeicons/primeicons.css'
import 'prismjs/themes/prism-tomorrow.css'

// Initialize Prism syntax highlighting
setupPrism()

export default {
    name: 'Survey2GISGenerator',

    components: {
        HelpSidebar,
        ParserSection,
        FieldSection,
        AddFieldButton
    },

    setup() {
        const hasStarted = ref(false);
        const { t } = useI18n()
        const uploadisDisabled = ref(true)

        // State management using refs
        const state = {
            parserSection: ref({
                info: '',
                name: '',
                comment_mark: '#',
                coor_x: 'COORX',
                coor_y: 'COORY',
                coor_z: 'COORZ',
                geom_tag_point: '.',
                geom_tag_line: '$',
                geom_tag_poly: '@',
                key_field: '',
                key_unique: 'No',
                no_data: '-1',
                tag_field: '',
                tagging_mode: 'none',
                tag_strict: 'No',
                hasStarted: ref(false)
            }),
            fieldSections: ref([]),
            validationErrors: ref({}),
            openSection: ref(''),
            showHelpSidebar: ref(false),
            currentHelpSection: ref(''),
            showStartLabel: ref(true),
            isDropdownOpen: ref(false),
            generatedIni: ref(`# ${t('parser.code_comment')}`),
            fileError: ref(''),
            showTooltip: ref(null),
            openFieldIndex: ref(null),
            showToast: ref(false)
        }

        watch(() => t('parser.code_comment'), (newComment) => {
            if (!state.generatedIni.value.includes('=')) {  // Only update if it's still the initial comment
                state.generatedIni.value = `# ${newComment}`
            }
        })

        // Constants
        const mandatoryFields = {
            parser: ['name', 'coor_x', 'coor_y', 'coor_z'],
            field: ['name', 'type']
        }

        const defaults = {
            comment_mark: '#',
            coor_x: 'COORX',
            coor_y: 'COORY',
            coor_z: 'COORZ',
            geom_tag_point: '.',
            geom_tag_line: '$',
            geom_tag_poly: '@',
            no_data: '-1'
        }


        // Computed properties

const isFormValid = computed(() => {
    // Check parser section
    const isParserValid = mandatoryFields.parser.every(field =>
        state.parserSection.value[field] &&
        state.parserSection.value[field].trim() !== ''
    )

    // Check field sections including aliases
    const areFieldSectionsValid = state.fieldSections.value.every((field, index) => {
        // Check mandatory fields
        const mandatoryFieldsValid = mandatoryFields.field.every(fieldName =>
            field[fieldName] && field[fieldName].trim() !== ''
        )

        // Check for any validation errors in this field section
        const hasValidationErrors = Object.keys(state.validationErrors.value)
            .some(key => key.startsWith(`field-${index}`))

        return mandatoryFieldsValid && !hasValidationErrors
    })

    return isParserValid && areFieldSectionsValid && state.fieldSections.value.length > 0
})



        const isParserSectionInvalid = () => {
            return mandatoryFields.parser.some(field =>
                !state.parserSection.value[field] ||
                state.parserSection.value[field].trim() === ''
            )
        }

        



        // Methods for field management
        const fieldManagement = {
            isFieldSectionInvalid: (fieldIndex) => {
                const field = state.fieldSections.value[fieldIndex]

                if (state.validationErrors.value[`field-${fieldIndex}`]) {
                    return true
                }

                return mandatoryFields.field.some(fieldName =>
                    !field[fieldName] || field[fieldName].trim() === ''
                )
            },

            validateField: (fieldIndex, fieldName, value) => {
    if (fieldName === 'aliases') {
        if (value) { // value here is the validation error
            state.validationErrors.value = {
                ...state.validationErrors.value,
                [`field-${fieldIndex}-aliases`]: value
            }
        } else {
            const newErrors = { ...state.validationErrors.value }
            delete newErrors[`field-${fieldIndex}-aliases`]
            state.validationErrors.value = newErrors
        }
        return
    }

    // Existing name validation logic
    const errors = fieldManagement.validateFieldName(value)
    if (errors.length > 0) {
        state.validationErrors.value = {
            ...state.validationErrors.value,
            [`field-${fieldIndex}`]: errors
        }
    } else {
        const newErrors = { ...state.validationErrors.value }
        delete newErrors[`field-${fieldIndex}`]
        state.validationErrors.value = newErrors
    }
},

            validateFieldName: (name) => {
                const errors = []
                if (name.length > 10) {
                    errors.push('Field name must be 10 characters or less')
                }
                if (!/^[A-Za-z0-9_]*$/.test(name)) {
                    errors.push('Field name can only contain letters, numbers, and underscores')
                }
                return errors
            },

            addFieldSection: () => {
                const newField = {
                    name: '',
                    change_case: 'lower',
                    empty_allowed: 'no',
                    info: '',
                    merge_separators: 'no',
                    persistent: 'no',
                    quotation: "'",
                    skip: 'no',
                    separator: ';',
                    type: 'text',
                    unique: 'no',
                    aliases: ''
                }
                state.fieldSections.value.push(newField)
                state.openSection.value = state.fieldSections.value.length - 1
                scrollManagement.scrollToSection(state.fieldSections.value.length - 1)
            },

            removeFieldSection: (fieldIndex) => {
                state.fieldSections.value.splice(fieldIndex, 1)
                const newErrors = {
                    ...state.validationErrors.value
                }
                delete newErrors[`field-${fieldIndex}`]
                state.validationErrors.value = newErrors

                if (state.openSection.value === fieldIndex) {
                    state.openSection.value = null
                } else if (typeof state.openSection.value === 'number' && state.openSection.value > fieldIndex) {
                    state.openSection.value--
                }

                generateIni()
            }
        }

        // Methods for scroll management
        // Todo: improve scolling
        const scrollManagement = {
            scrollToSection: (section) => {
                nextTick(() => {
                    const scrollContainer = document.querySelector('.code__wrapper');
                    const preElement = document.querySelector('.code__field');
                    const leftPanelItems = document.querySelectorAll('.left-panel .section');

                    if (!scrollContainer || !preElement || !leftPanelItems.length) {
                        console.error('Required elements not found');
                        return;
                    }

                    console.log('Left Panel Items:', leftPanelItems); // Log all left panel items for inspection

                    const lines = state.generatedIni.value.split('\n');
                    let targetLineIndex = 0;

                    // Locate the line for the desired section
                    if (section === 'parser') {
                        targetLineIndex = lines.findIndex(line => line.trim() === '[Parser]');
                    } else {
                        let fieldCount = -1;
                        targetLineIndex = lines.findIndex((line) => {
                            if (line.trim() === '[Field]') {
                                fieldCount++;
                                if (fieldCount === section) {
                                    return true;
                                }
                            }
                            return false;
                        });
                    }

                    if (targetLineIndex === -1) {
                        console.error('Target section not found');
                        return;
                    }

                    const lineHeight = parseInt(window.getComputedStyle(preElement).lineHeight) || 20;
                    const scrollPosition = targetLineIndex * lineHeight;

                    // Locate the corresponding left panel item
                    let leftPanelItem;
                    if (section === 'parser') {
                        // Special case for the 'parser' section
                        console.log('Looking for parser in the left panel'); // Debug log
                        leftPanelItem = Array.from(leftPanelItems).find(item => item.textContent.includes('Parser')); // Update this if needed
                    } else {
                        leftPanelItem = leftPanelItems[section];
                    }

                    console.log('Left Panel Item for Section:', leftPanelItem); // Log the item for inspection

                    if (!leftPanelItem) {
                        console.error(`Left panel item for section ${section} not found`);
                        return;
                    }

                    const leftPanelY = leftPanelItem.getBoundingClientRect().top;
                    const scrollContainerTop = scrollContainer.getBoundingClientRect().top;
                    let targetScrollPosition = scrollPosition + (leftPanelY - scrollContainerTop);

                    // Define an offset for the first few sections, including 'parser'
                    const initialSectionOffset = 30; // Adjust as needed for the padding
                    if (section === 'parser' || section <= 2) { // Apply threshold for initial sections
                        targetScrollPosition -= initialSectionOffset;
                    }

                    scrollContainer.scrollTo({
                        top: Math.max(0, targetScrollPosition),
                        behavior: 'smooth'
                    });
                });
            },
            toggleSection: (section) => {
                const wasOpen = state.openSection.value === section;
                state.openSection.value = wasOpen ? null : section;

                if (!wasOpen && section !== null) {
                    scrollManagement.scrollToSection(section);
                }
            }
        };

        // Methods for file handling
// In App.vue
const fileHandling = {
    // Helper function for alias validation (inside fileHandling)
    validateAliases: (aliases) => {
        if (!aliases) return null // Empty is valid

        const lines = aliases.split('\n').filter(line => line.trim())
        const keys = new Set()
        const lowercaseKeys = new Set()

        for (const line of lines) {
            if (!line.startsWith('@')) {
                return 'Each line must start with @'
            }

            const [keyPart, ...valueParts] = line.substring(1).split('=')
            const key = keyPart.trim()
            const value = valueParts.join('=').trim()
            
            if (!key || !value) {
                return 'Each line must be in format @key=value'
            }

            // Check for special characters and German umlauts
            const specialCharsRegex = /[^a-zA-Z0-9_]/
            if (specialCharsRegex.test(key) || specialCharsRegex.test(value)) {
                return 'Keys and values can only contain letters, numbers, and underscores'
            }

            // Check for duplicate keys (case-sensitive)
            if (keys.has(key)) {
                return `Duplicate key found: ${key}`
            }
            keys.add(key)

            // Check for duplicate keys (case-insensitive)
            const lowercaseKey = key.toLowerCase()
            if (lowercaseKeys.has(lowercaseKey) && !keys.has(key)) {
                return `Case-insensitive duplicate key found: ${key}`
            }
            lowercaseKeys.add(lowercaseKey)
        }

        return null // No validation errors
    },

    loadSampleData: () => {
        const samplePath = './parser/parser_desc_min.txt'
        fetch(samplePath)
            .then(response => response.text())
            .then(content => {
                fileHandling.parseIniContent(content)
                uiManagement.closeDropdown()
            })
            .catch(error => {
                state.fileError.value = `Error loading sample data: ${error.message}`
            })
    },

    handleFileUpload: async (event) => {
        const file = event.target.files[0]
        if (!file) {
            state.fileError.value = 'No file selected'
            return
        }

        if (!file.name.toLowerCase().endsWith('.ini') && !file.name.toLowerCase().endsWith('.txt')) {
            state.fileError.value = 'Invalid file type. Please upload an .ini or .txt file'
            return
        }

        try {
            const content = await fileHandling.readFileContent(file)
            fileHandling.parseIniContent(content)
            state.fileError.value = ''
        } catch (error) {
            state.fileError.value = `Error reading file: ${error.message}`
        }
    },

    readFileContent: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => {
                try {
                    resolve(event.target.result)
                } catch (error) {
                    reject(error)
                }
            }

            reader.onerror = (event) => {
                reject(new Error(event.target.error))
            }

            reader.readAsText(file)
        })
    },

    parseIniContent: (content) => {
        try {
            // Reset current state
            state.parserSection.value = {
                info: '',
                name: '',
                comment_mark: '#',
                coor_x: 'COORX',
                coor_y: 'COORY',
                coor_z: 'COORZ',
                geom_tag_point: '.',
                geom_tag_line: '$',
                geom_tag_poly: '@',
                key_field: '',
                key_unique: 'No',
                no_data: '-1',
                tag_field: '',
                tagging_mode: 'none',
                tag_strict: 'No'
            }
            state.fileError.value = '' // Clear any previous global errors
            state.validationErrors.value = {} // Reset validation errors

            hasStarted.value = true
            state.openSection.value = 'parser'

            let currentSection = null
            let currentAliases = []
            let currentFieldIndex = -1
            const lines = content.split('\n')

            for (let line of lines) {
                line = line.trim()

                if (!line || line.startsWith('#')) continue

                // Handle new section
                if (line.startsWith('[') && line.endsWith(']')) {
                    // Process aliases for the previous field section before moving to new section
                    if (currentSection === 'field' && currentAliases.length > 0 && 
                        state.fieldSections.value.length > 0) {
                        const currentField = state.fieldSections.value[state.fieldSections.value.length - 1]
                        const aliasesString = currentAliases.join('\n')
                        
                        // Validate aliases before assigning
                        const validationError = fileHandling.validateAliases(aliasesString)
                        if (validationError) {
                            state.validationErrors.value[`field-${currentFieldIndex}-aliases`] = validationError
                        }
                        currentField.aliases = aliasesString
                    }
                    
                    currentSection = line.slice(1, -1).toLowerCase()
                    currentAliases = [] // Reset aliases for new section
                    
                    if (currentSection === 'field') {
                        currentFieldIndex++
                        state.fieldSections.value.push({
                            change_case: 'lower',
                            empty_allowed: 'no',
                            info: '',
                            merge_separators: 'no',
                            name: '',
                            persistent: 'no',
                            quotation: "'",
                            skip: 'no',
                            separator: ';',
                            type: 'text',
                            unique: 'no',
                            aliases: ''
                        })
                    }
                    continue
                }

                // Handle line content
                if (currentSection) {
                    if (line.startsWith('@')) {
                        // This is an alias line
                        currentAliases.push(line)
                    } else if (line.includes('=')) {
                        // This is a regular property
                        const [key, ...valueParts] = line.split('=')
                        const trimmedKey = key.trim()
                        const value = valueParts.join('=').trim()

                        if (currentSection === 'parser') {
                            if (trimmedKey in state.parserSection.value) {
                                state.parserSection.value[trimmedKey] = value
                            }
                        } else if (currentSection === 'field' && state.fieldSections.value.length > 0) {
                            const currentField = state.fieldSections.value[state.fieldSections.value.length - 1]
                            if (trimmedKey in currentField) {
                                currentField[trimmedKey] = value
                            }
                        }
                    }
                }
            }

            // Don't forget to process aliases for the last field section
            if (currentSection === 'field' && currentAliases.length > 0 && 
            state.fieldSections.value.length > 0) {
            const currentField = state.fieldSections.value[state.fieldSections.value.length - 1]
            const aliasesString = currentAliases.join('\n')
            
            // Validate aliases before assigning
            const validationError = fileHandling.validateAliases(aliasesString)
            if (validationError) {
                // Instead of setting fileError, set it in validationErrors
                state.validationErrors.value[`field-${currentFieldIndex}-aliases`] = [validationError]
            }
            currentField.aliases = aliasesString
        }

            // Validate field names
            state.fieldSections.value.forEach((field, index) => {
                fieldManagement.validateField(index, field.name)
            })

            generateIni()
        } catch (error) {
        state.fileError.value = `Error parsing INI content: ${error.message}`
        console.error('Error parsing INI content:', error)
    }
    }
}

        // UI management methods
        const uiManagement = {
            showHelp: (section) => {
                state.currentHelpSection.value = section
                state.showHelpSidebar.value = true
            },

            closeHelp: () => {
                state.showHelpSidebar.value = false
                state.currentHelpSection.value = ''
            },

            closeToast: () => {
                state.showToast.value = false
            },

            closeDropdown: () => {
                state.isDropdownOpen.value = false
            },

            triggerFileUpload: () => {
                document.querySelector('#file-upload').click()
            }
        }

        // INI generation and download
        const generateIni = () => {
    let ini = '[Parser]\n'
    
    // Add parser section properties
    const parserEntries = Object.entries(state.parserSection.value)
        .filter(([value]) => value !== '')
        .map(([key, value]) => `${key} = ${value}`)
        .join('\n')
    ini += parserEntries

    // Add field sections
    state.fieldSections.value.forEach((field) => {
        ini += '\n\n[Field]\n'
        
        // Add regular fields
        const regularFields = Object.entries(field)
            .filter(([key, value]) => key !== 'aliases' && value !== '')
            .map(([key, value]) => `${key} = ${value}`)
            .join('\n')
        ini += regularFields

        // Add aliases if they exist
        if (field.aliases) {
            const validAliases = field.aliases
                .split('\n')
                .filter(line => line.trim() && !line.includes('error'))
                .map(line => {
                    line = line.trim()
                    if (line.startsWith('@')) {
                        // Always normalize to single spaces around equals
                        const [keyPart, ...valueParts] = line.split('=')
                        const key = keyPart.trim()  // Removes all spaces after @
                        const value = valueParts.join('=').trim()
                        return `${key} = ${value}`  // Consistent single space format
                    }
                    return line
                })
                .join('\n')
            if (validAliases) {
                ini += regularFields ? '\n' : ''
                ini += validAliases
            }
        }
    })

    state.generatedIni.value = ini + '\n'
}

        const downloadIni = () => {
            const blob = new Blob([state.generatedIni.value], {
                type: 'text/plain'
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'survey2gis_parser.ini'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        }



        // Lifecycle hooks
        onMounted(() => {
    const scrollContainer = document.querySelector('.code__wrapper')
    if (scrollContainer) {
        scrollContainer.style.overflowY = 'auto'
        scrollContainer.style.position = 'relative'
    }

    // Set up watches here
    // Watch for syntax highlighting
    watch(
        () => state.generatedIni.value,
        () => {
            nextTick(() => {
                document.querySelectorAll('pre code').forEach((block) => {
                    highlightElement(block)
                })
            })
        },
        { immediate: true }
    )

    // Watch for content changes including validation errors
    watch(
        [
            () => state.parserSection.value, 
            () => state.fieldSections.value,
            () => state.validationErrors.value // This will make form validation reactive to alias errors
        ],
        () => {
            generateIni()
        },
        { deep: true }
    )

    state.showToast.value = true
    setTimeout(() => {
        uiManagement.closeToast()
    }, 10000)
})





        return {
            ...state,
            hasStarted,
            mandatoryFields,
            isParserSectionInvalid,
            isFormValid,
            ...fieldManagement,
            ...scrollManagement,
            ...fileHandling,
            ...uiManagement,
            generateIni,
            downloadIni,
            uploadisDisabled,
            getDefaultValue: (key) => defaults[key] ? `Default: ${defaults[key]}` : ''
        }
    }
}
</script>
<style>

#right_panel {
  background: #2d2d2d;
}

/* Additional styling for Prism */
.code__wrapper pre {
  margin: 0;
  padding: 1rem;
}

.code__wrapper pre code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Override some Prism theme colors if needed */
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
</style>