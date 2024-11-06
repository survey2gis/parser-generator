<template>
  <div class="flex h-screen flex-col">
    <!-- Header -->
    <div class="bg-white p-4  border-b border-grey">
  <div class="container mx-auto flex justify-between items-center">
    <h1 class="text-lg font-semibold">Survey2GIS Parser Generator</h1>
    <div class="flex items-center gap-4">
      <div class="relative" v-click-outside="closeDropdown">
  <button
    @click="isDropdownOpen = !isDropdownOpen"
    class="px-4 py-2 border rounded flex items-center gap-2 bg-white hover:bg-gray-50 w-full"
  >
    <i class="mr-2">↑</i>
    Select Import Option
    <svg 
      class="w-4 h-4 transform transition-transform ml-auto"
      :class="{'rotate-180': isDropdownOpen}"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>

  <div 
    v-if="isDropdownOpen"
    class="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-10 w-full"
  >
    <div class="py-1">
      <label 
        for="file-upload" 
        class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer w-full"
        @click.prevent="triggerFileUpload"
      >
        <i class="mr-2">↑</i>
        Load Parser File
      </label>
      
      <button
        class="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100"
        @click="loadSampleData"
      >
        <i class="mr-2">📄</i>
        Load Sample Data
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

      <button
        @click="downloadIni"
        :disabled="!isFormValid"
        class="py-1 px-4 rounded"
        :class="isFormValid ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-400 cursor-not-allowed'"
      >
        Download parser
      </button>

      <span class='text-gray-500'>|</span>


      <button 
        @click.stop="showHelp('imprint')" 
        class="text-gray-600 hover:text-gray-900"
      >
        Imprint
      </button>

      <button 
        @click.stop="showHelp('help')" 
        class="text-gray-600 hover:text-gray-900"
      >
        Help
      </button>



    </div>
  </div>
</div>

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Panel -->
      <div class="w-1/2 p-4 bg-gray-100 overflow-auto">
        <!-- Error Message -->
        <div v-if="fileError" class="mb-4 p-4 bg-red-100 text-red-700 rounded">
          <div class="flex items-center">
            <span class="mr-2">⚠️</span>
            <span>{{ fileError }}</span>
          </div>
        </div>

        <!-- Parser Section Card -->
        <div 
          class="shadow mb-3" 
          :class="isParserSectionInvalid ? 'bg-red-50' : 'bg-white'"
        >
          <div class="p-4">
            <div 
  class="flex justify-between items-center cursor-pointer relative"
  @click="toggleSection('parser')"
>
  <div class="flex items-center">
    <h3 class="text-lg font-semibold">Parser Section</h3>
    <svg 
      v-if="!isParserSectionInvalid"
      class="w-5 h-5 ml-2 text-green-500" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M5 13l4 4L19 7"
      />
    </svg>
    <!-- Start Here Label - Always visible -->
    <div 
      v-if="showStartLabel"
      class="flex items-center ml-3 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium animate-pulse transition-opacity duration-500"
      :class="{'opacity-0': isLabelFading}"
    >
      <svg 
        class="w-4 h-4 mr-1 animate-bounce" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
      First step!
    </div>
  </div>
  <div class="flex items-center">
    <button 
      @click.stop="showHelp('parser')" 
      class="text-blue-500 hover:text-blue-600 mr-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    </button>
    <svg 
      class="w-5 h-5 ml-2 transform transition-transform"
      :class="{'rotate-180': openSection === 'parser'}"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

            <!-- Parser Content -->
            <div v-show="openSection === 'parser'"  class="mt-4">
              <p class="text-gray-600 mb-4">
                Fill out the required parser configuration below. Need help? Click the (?) icon for guidance.
              </p>
            <div class="grid grid-cols-2 gap-4">
              <template v-for="(value, key) in parserSection" :key="key">
                <div class="mb-2">
                  <div class="flex items-center justify-between mb-1">
                    <label class="text-xs font-medium text-gray-700">
                      {{ key }}
                      <span v-if="isFieldMandatory('parser', key)" class="text-red-500">*</span>
                    </label>
                  </div>
                  <select
                    v-if="['key_unique', 'tag_strict'].includes(key) || key === 'tagging_mode'"
                    v-model="parserSection[key]"
                    class="w-full border rounded p-1 text-sm"
                    :class="{'border-red-500': isFieldMandatory('parser', key) && !parserSection[key]}"
                  >
                    <template v-if="['key_unique', 'tag_strict'].includes(key)">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </template>
                    <template v-else>
                      <option v-for="opt in ['min', 'max', 'end', 'none']" :key="opt" :value="opt">
                        {{ opt }}
                      </option>
                    </template>
                  </select>
                  <input
                    v-else
                    v-model="parserSection[key]"
                    type="text"
                    class="w-full border rounded p-1 text-sm"
                    :class="{'border-red-500': isFieldMandatory('parser', key) && !parserSection[key]}"
                    :placeholder="getDefaultValue(key)"
                  />
                </div>
              </template>
            </div>
        </div>
      </div>
    </div>

      <!-- Field Sections -->
      <template v-for="(field, fieldIndex) in fieldSections" :key="fieldIndex">
        <div 
          class="shadow mb-3  rounded-lg" 
          :class="isFieldSectionInvalid(fieldIndex) ? 'bg-red-50' : 'bg-white'"
        >
          <div class="p-4">
            <div 
  class="flex justify-between items-center cursor-pointer"
  @click="toggleSection(fieldIndex)"
>
  <div class="flex items-center">
    <h3 class="text-lg font-semibold">Field Section {{ fieldIndex + 1 }}</h3>
    <svg 
      v-if="!isFieldSectionInvalid(fieldIndex)"
      class="w-5 h-5 ml-2 text-green-500" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M5 13l4 4L19 7"
      />
    </svg>
  </div>
  <div class="flex items-center">
    <button @click.stop="showHelp('field')" class="text-blue-500 hover:text-blue-600 mr-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    </button>
    <button @click.stop="removeFieldSection(fieldIndex)" class="text-red-500">
      🗑
    </button>
    <svg 
      class="w-5 h-5 ml-2 transform transition-transform"
      :class="{'rotate-180': openSection === fieldIndex}"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>
            <!-- Field Content -->
              <div v-show="openSection === fieldIndex" class="mt-4">
                <div class="grid grid-cols-2 gap-3">
                  <!-- Name field -->
                  <div class="col-span-2">
                    <label class="text-xs font-medium text-gray-700">
                      Name
                      <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="field.name"
                      type="text"
                      class="w-full border rounded p-1 text-sm"
                      :class="{'border-red-500': !field.name || validationErrors[`field-${fieldIndex}`]}"
                      @input="validateField(fieldIndex, field.name)"
                    />
                    <p v-if="validationErrors[`field-${fieldIndex}`]" class="text-xs text-red-500 mt-1">
                      {{ validationErrors[`field-${fieldIndex}`].join(', ') }}
                    </p>
                  </div>

                  <!-- Info field -->
                  <div class="col-span-2">
                    <label class="text-xs font-medium text-gray-700">Info</label>
                    <textarea
                      v-model="field.info"
                      class="w-full border rounded p-1 text-sm"
                      rows="2"
                    ></textarea>
                  </div>

                  <!-- Type field -->
                  <div class="mb-2">
                    <label class="text-xs font-medium text-gray-700">
                      Type
                      <span class="text-red-500">*</span>
                    </label>
                    <select v-model="field.type" class="w-full border rounded p-1 text-sm">
                      <option value="integer">integer</option>
                      <option value="double">double</option>
                      <option value="text">text</option>
                    </select>
                  </div>

                  <!-- Change Case field -->
                  <div class="mb-2">
                    <label class="text-xs font-medium text-gray-700">Change Case</label>
                    <select v-model="field.change_case" class="w-full border rounded p-1 text-sm">
                      <option value="lower">lower</option>
                      <option value="upper">upper</option>
                    </select>
                  </div>

                  <!-- Empty Allowed field -->
                  <div class="mb-2">
                    <label class="text-xs font-medium text-gray-700">Empty Allowed</label>
                    <select v-model="field.empty_allowed" class="w-full border rounded p-1 text-sm">
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </div>

                  <!-- Merge Separators field -->
                  <div class="mb-2">
                    <label class="text-xs font-medium text-gray-700">Merge Separators</label>
                    <select v-model="field.merge_separators" class="w-full border rounded p-1 text-sm">
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </div>

                  <!-- Persistent field -->
                  <div class="mb-2">
                    <label class="text-xs font-medium text-gray-700">Persistent</label>
                    <select v-model="field.persistent" class="w-full border rounded p-1 text-sm">
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </div>

                  <!-- Skip field -->
                  <div class="mb-2">
                    <label class="text-xs font-medium text-gray-700">Skip</label>
                    <select v-model="field.skip" class="w-full border rounded p-1 text-sm">
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </div>

                  <!-- Unique field -->
                  <div class="mb-2">
                    <label class="text-xs font-medium text-gray-700">Unique</label>
                    <select v-model="field.unique" class="w-full border rounded p-1 text-sm">
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </div>

                  <!-- Quotation and Separator in one row -->
                  <div class="mb-2">
                    <label class="text-xs font-medium text-gray-700">Quotation</label>
                    <input
                      v-model="field.quotation"
                      type="text"
                      class="w-full border rounded p-1 text-sm"
                      placeholder="'"
                    />
                  </div>

                  <div class="mb-2">
                    <label class="text-xs font-medium text-gray-700">Separator</label>
                    <input
                      v-model="field.separator"
                      type="text"
                      class="w-full border rounded p-1 text-sm"
                      placeholder=";"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Add Field Button at the bottom -->
        <div class="flex justify-end mb-6">
        <button
          @click="addFieldSection"
          class="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
        >
          Add Field Section
        </button>
      </div>
      </div>

      <!-- Right Panel -->
      <div class="w-1/2 flex flex-col pb-4 bg-gray-800">
        <div class="flex-grow bg-gray-800 text-white overflow-auto code__wrapper ">
          <pre class="w-full h-full bg-gray-900 font-mono text-sm p-8 code__field">{{ generatedIni }}</pre>
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
      <!-- Toast Notification -->
      <div
      v-if="showToast"
      class="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-md border border-gray-200 transform transition-all duration-500 ease-in-out z-50"
      :class="showToast ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'"
    >
      <div class="flex items-start">
        <div class="flex-1 mr-4">
          <p class="text-gray-900">
            👋 Welcome! Take a quick tour through our help guide - you'll find it in the top right corner.
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

export default {
  components: {
    HelpSidebar
  },
  name: 'Survey2GISGenerator',
  mounted() {
  // Existing scroll container code
  const scrollContainer = document.querySelector('.code__wrapper');
  if (scrollContainer) {
    scrollContainer.style.overflowY = 'auto';
    scrollContainer.style.position = 'relative';
  }

    this.showToast = true;
      setTimeout(() => {
        this.closeToast();
      }, 6000);

    // Check for first visit (toast logic)
    // if (!this.getCookie('hasVisitedSurvey2GIS')) {
    //   this.showToast = true;
    //   this.setCookie('hasVisitedSurvey2GIS', 'true', 365);
      
    //   // Auto-hide toast after 8 seconds
    //   setTimeout(() => {
    //     this.closeToast();
    //   }, 8000);
    // }

    // Handle start label visibility (moved outside the cookie check)
    this.showStartLabel = true;  // Ensure it's visible initially
    this.isLabelFading = false; // Reset fade state
    
    // Start the hide sequence
    setTimeout(() => {
      this.isLabelFading = true;  // Start fade out
      setTimeout(() => {
        this.showStartLabel = false;  // Remove from DOM after fade
      }, 500);  // Wait for fade animation to complete
    }, 3000); 
  },
  data() {
    return {
      parserSection: {
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
      },
      isDropdownOpen: false,
      fieldSections: [],
      generatedIni: '# preview of parser file',
      validationErrors: {},
      fileError: '',
      showTooltip: null,
      showHelpSidebar: false,
      currentHelpSection: '',
      openSection: '', // open parser oin start by setting value to parser
      openFieldIndex: null,
      showToast: false, 
      showStartLabel: true,
      isLabelFading: false,
      mandatoryFields: {
        parser: ['name', 'coor_x', 'coor_y'],
        field: ['name', 'type']
      }
    }
  },

  computed: {

    isParserSectionInvalid() {
    return this.mandatoryFields.parser.some(field => 
      !this.parserSection[field] || this.parserSection[field].trim() === ''
    );
  },

    isFormValid() {
      // Check mandatory parser fields
      const isParserValid = this.mandatoryFields.parser.every(field => 
        this.parserSection[field] && this.parserSection[field].trim() !== ''
      )

      // Check mandatory field sections
      const areFieldSectionsValid = this.fieldSections.every(field => 
        this.mandatoryFields.field.every(fieldName => 
          field[fieldName] && field[fieldName].trim() !== ''
        ) && !this.validationErrors[`field-${this.fieldSections.indexOf(field)}`]
      )

      return isParserValid && areFieldSectionsValid && this.fieldSections.length > 0
    }
  },

  watch: {
    parserSection: {
      deep: true,
      handler: 'generateIni'
    },
    fieldSections: {
      deep: true,
      handler: 'generateIni'
    }
  },

  methods: {

    isFieldSectionInvalid(fieldIndex) {
    const field = this.fieldSections[fieldIndex];
    
    // Check if there are any validation errors for this field
    if (this.validationErrors[`field-${fieldIndex}`]) {
      return true;
    }
    
    // Check mandatory fields
    return this.mandatoryFields.field.some(fieldName => 
      !field[fieldName] || field[fieldName].trim() === ''
    );
  },



    closeDropdown() {
      this.isDropdownOpen = false;
    },

    loadSampleData() {
      // Create a mock file event with the sample.ini path
      const samplePath = './parser/parser_desc_min.txt';
      fetch(samplePath)
        .then(response => response.text())
        .then(content => {
          this.parseIniContent(content);
          this.closeDropdown();
        })
        .catch(error => {
          this.fileError = `Error loading sample data: ${error.message}`;
        });
    },

    showHelp(section) {
      this.currentHelpSection = section
      this.showHelpSidebar = true
    },
    closeHelp() {
      this.showHelpSidebar = false
      this.currentHelpSection = ''
    },

    closeToast() {
      this.showToast = false;
    },

    setCookie(name, value, days) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + days);
      document.cookie = `${name}=${value};expires=${expiryDate.toUTCString()};path=/`;
    },

    getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },

    isFieldMandatory(section, fieldName) {
      return this.mandatoryFields[section]?.includes(fieldName)
    },


    toggleFieldSection(index) {
      this.toggleSection(index);
    },

    triggerFileUpload() {
      this.$refs.fileInput.click()
    },

    validateField(fieldIndex, name) {
      const errors = this.validateFieldName(name)
      if (errors.length > 0) {
        this.validationErrors = {
          ...this.validationErrors,
          [`field-${fieldIndex}`]: errors
        }
      } else {
        const newErrors = { ...this.validationErrors }
        delete newErrors[`field-${fieldIndex}`]
        this.validationErrors = newErrors
      }
    },

    validateFieldName(name) {
      const errors = []
      if (name.length > 10) {
        errors.push('Field name must be 10 characters or less')
      }
      if (!/^[A-Za-z0-9_]*$/.test(name)) {
        errors.push('Field name can only contain letters, numbers, and underscores')
      }
      return errors
    },

    scrollToSection(section) {
      this.$nextTick(() => {
        // Get both the scroll container and the pre element
        const scrollContainer = document.querySelector('.code__wrapper');
        const preElement = document.querySelector('.code__field');
        
        if (!scrollContainer || !preElement) {
          console.error('Required elements not found');
          return;
        }

        const lines = this.generatedIni.split('\n');
        let targetLineIndex = 0;

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

        // Calculate scroll position
        const lineHeight = parseInt(window.getComputedStyle(preElement).lineHeight) || 20;
        const scrollPosition = targetLineIndex * lineHeight;
        const visibleHeight = scrollContainer.clientHeight;
        const centerOffset = (visibleHeight / 2 ) - (9 * lineHeight);
        const targetPosition = Math.max(0, scrollPosition - centerOffset) ;

        // Log scroll attempt
        console.log('Attempting to scroll:', {
          section,
          targetLineIndex,
          scrollPosition,
          visibleHeight,
          centerOffset,
          targetPosition,
          containerScrollHeight: scrollContainer.scrollHeight,
          lineHeight
        });

        // Force scroll on the container
        scrollContainer.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Fallback direct scrollTop setting if smooth scroll doesn't work
        if (!('scrollBehavior' in document.documentElement.style)) {
          scrollContainer.scrollTop = targetPosition;
        }
      });
    },

    toggleSection(section) {
      const wasOpen = this.openSection === section;
      this.openSection = wasOpen ? null : section;
      
      // Only scroll if we're opening a section
      if (!wasOpen && section !== null) {
        this.scrollToSection(section);
      }
    },

    addFieldSection() {
      const newField = {
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
        unique: 'no'
      }
      this.fieldSections.push(newField)
      // Update this line to use the field index
      this.openSection = this.fieldSections.length - 1
      this.scrollToSection(this.fieldSections.length - 1) 
    },

    removeFieldSection(fieldIndex) {
      this.fieldSections.splice(fieldIndex, 1)
      const newErrors = { ...this.validationErrors }
      delete newErrors[`field-${fieldIndex}`]
      this.validationErrors = newErrors
      
      // Update this part to handle openSection properly
      if (this.openSection === fieldIndex) {
        this.openSection = null
      } else if (typeof this.openSection === 'number' && this.openSection > fieldIndex) {
        // Decrement openSection if we removed a field before the currently open one
        this.openSection--
      }
      
      this.generateIni()
    },


    generateIni() {
      let ini = '[Parser]\n'
      Object.entries(this.parserSection).forEach(([key, value]) => {
        if (value !== '') {
          ini += `${key} = ${value}\n`
        }
      })

      this.fieldSections.forEach((field) => {
        ini += '\n[Field]\n'  // Always use [Field] instead of [Field1], [Field2], etc.
        Object.entries(field).forEach(([key, value]) => {
          if (value !== '') {
            ini += `${key} = ${value}\n`
          }
        })
      })

      this.generatedIni = ini
    },

    downloadIni() {
      const blob = new Blob([this.generatedIni], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'survey2gis_parser.ini'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    },

    getDefaultValue(key) {
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
      return defaults[key] ? `Default: ${defaults[key]}` : ''
    },

    async handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
      this.fileError = 'No file selected';
      return;
    }

    // Check file extension
    if (!file.name.toLowerCase().endsWith('.ini') && !file.name.toLowerCase().endsWith('.txt')) {
      this.fileError = 'Invalid file type. Please upload an .ini or .txt file';
      return;
    }

    try {
      const content = await this.readFileContent(file);
      this.parseIniContent(content);
      this.fileError = '';
    } catch (error) {
      this.fileError = `Error reading file: ${error.message}`;
    }
  },

      readFileContent(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        // Use event.target.result instead of e.target.result
        reader.onload = (event) => {
          try {
            resolve(event.target.result);
          } catch (error) {
            reject(error);
          }
        };
        
        // Add proper error handling
        reader.onerror = (event) => {
          reject(new Error(event.target.error));
        };

        reader.readAsText(file);
      });
    },

    parseIniContent(content) {
    try {
      // Reset current state
      this.parserSection = {
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
      };
      this.fieldSections = [];

      let currentSection = null;
      let lines = content.split('\n');

      for (let line of lines) {
        line = line.trim();
        
        // Skip empty lines and comments
        if (!line || line.startsWith('#')) continue;

        // Check for section headers
        if (line.startsWith('[') && line.endsWith(']')) {
          currentSection = line.slice(1, -1).toLowerCase();
          if (currentSection === 'field') {
            this.fieldSections.push({
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
              unique: 'no'
            });
          }
          continue;
        }

        // Parse key-value pairs
        if (currentSection && line.includes('=')) {
          const [key, ...valueParts] = line.split('=');
          const trimmedKey = key.trim();
          const value = valueParts.join('=').trim();

          if (currentSection === 'parser') {
            if (trimmedKey in this.parserSection) {
              this.parserSection[trimmedKey] = value;
            }
          } else if (currentSection === 'field' && this.fieldSections.length > 0) {
            const currentField = this.fieldSections[this.fieldSections.length - 1];
            if (trimmedKey in currentField) {
              currentField[trimmedKey] = value;
            }
          }
        }
      }

      // Validate field names after parsing
      this.fieldSections.forEach((field, index) => {
        this.validateField(index, field.name);
      });

      // Generate INI preview
      this.generateIni();
    } catch (error) {
      this.fileError = `Error parsing INI content: ${error.message}`;
      console.error('Error parsing INI content:', error);
    }
  }

  }
}
</script>
<style scoped>
.flex { display: flex; }
.h-screen { height: 100vh; }
.w-1\/2 { width: 50%; }
.prose h4 { @apply text-lg font-semibold mb-2; }
.prose h5 { @apply font-semibold mb-1; }
.prose ul { @apply list-disc ml-4 mb-2; }
.prose li { @apply mb-1; }

.code__wrapper {
  overflow-y: auto;
  position: relative;
  scroll-behavior: smooth;
}

.code__field {
  white-space: pre;
  line-height: 1.5;
}

</style>