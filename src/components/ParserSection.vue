<template>
    <div class="section">
      <!-- Start New Parser Button -->
      <div v-if="!isStarted" class="flex justify-center py-8">
        <button
          @click="startNewParser"
          class="flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <i class="pi pi-file-edit text-xl"></i>
          {{ $t('parser.startNew') }}
        </button>
      </div>
  
      <!-- Parser Section Content -->
      <div 
        v-show="isStarted"
        class="shadow mb-3" 
        :class="isParserSectionInvalid ? 'bg-red-100' : 'bg-white'"
      >
        <div class="p-4">
          <div 
            class="flex justify-between items-center cursor-pointer relative"
            @click="$emit('toggle-section', 'parser')"
          >
            <div class="flex items-center">
              <h3 class="text-lg font-semibold">{{ $t('parser.section') }}</h3>
              <i 
                v-if="!isParserSectionInvalid"
                class="pi pi-check-circle text-lg ml-2 text-green-500"
              ></i>
              <i 
                v-if="isParserSectionInvalid"
                class="pi pi-times text-lg ml-2 text-red-500"
              ></i>

            </div>
            <div class="flex items-center">
              <button 
                @click.stop="$emit('help', 'parser')" 
                class="text-blue-500 hover:text-blue-600"
              >
                <i class="pi pi-question-circle"></i>
              </button>
              <i 
                class="pi pi-chevron-down text-lg ml-2 transform transition-transform"
                :class="{'rotate-180': isOpen}"
              ></i>
            </div>
          </div>
    
          <div v-show="isOpen" class="mt-4">
            <p class="text-gray-400 mb-4">
              {{ $t('parser.required') }}
            </p>
            <div class="grid grid-cols-2 gap-4">
              <template v-for="(value, key) in modelValue" :key="key">
                <div class="mb-2">
                  <div class="flex items-center justify-between mb-1">
                    <label class="text-xs font-medium text-gray-700">
                      {{ key }}
                      <span v-if="mandatoryFields.includes(key)" class="text-red-500">*</span>
                    </label>
                  </div>
                  <select
                    v-if="['key_unique', 'tag_strict'].includes(key) || key === 'tagging_mode'"
                    :value="value"
                    @input="updateField(key, $event.target.value)"
                    class="w-full border rounded p-1 text-sm"
                    :class="{'border-red-500': mandatoryFields.includes(key) && !value}"
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
                    :value="value"
                    @input="updateField(key, $event.target.value)"
                    type="text"
                    class="w-full border rounded p-1 text-sm"
                    :class="{'border-red-500': mandatoryFields.includes(key) && !value}"
                    :placeholder="getDefaultValue(key)"
                  />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, ref, watch } from 'vue'
  
  export default {
    name: 'ParserSection',
    props: {
      modelValue: {
        type: Object,
        required: true
      },
      mandatoryFields: {
        type: Array,
        required: true
      },
      isOpen: {
        type: Boolean,
        default: false
      },
      started: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue', 'toggle-section', 'help', 'started'],
    setup(props, { emit }) {
      const isStarted = ref(props.started)
  
      // Watch for changes to the started prop
      watch(() => props.started, (newValue) => {
        isStarted.value = newValue
      }, { immediate: true })
  
      const startNewParser = () => {
        isStarted.value = true
        emit('started', true)
        emit('toggle-section', 'parser')
      }
  
      const isParserSectionInvalid = computed(() => {
        return props.mandatoryFields.some(field => 
          !props.modelValue[field] || props.modelValue[field].trim() === ''
        )
      })
  
      const getDefaultValue = (key) => {
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
      }
  
      const updateField = (key, value) => {
        const updatedParser = { ...props.modelValue, [key]: value }
        emit('update:modelValue', updatedParser)
      }
  
      return {
        isStarted,
        startNewParser,
        isParserSectionInvalid,
        getDefaultValue,
        updateField
      }
    }
  }
  </script>