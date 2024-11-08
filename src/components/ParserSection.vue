<template>
    <div 
      class="shadow mb-3 section" 
      :class="isParserSectionInvalid ? 'bg-red-100' : 'bg-white'"
    >
      <div class="p-4">
        <div 
          class="flex justify-between items-center cursor-pointer relative"
          @click="$emit('toggle-section', 'parser')"
        >
          <div class="flex items-center">
            <h3 class="text-lg font-semibold">Parser Section</h3>
            <i 
            v-if="!isParserSectionInvalid"
            class="pi pi-check-circle text-lg ml-2 text-green-500"
            ></i>
            <i 
            v-if="isParserSectionInvalid"
            class="pi pi-times text-lg ml-2 text-red-500"
            ></i>
            <div 
              v-if="showStartLabel"
              class="flex items-center ml-3 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium"
            >
              <i class="pi pi-arrow-right me-3 animate-bounce"></i>First step!
            </div>
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
            Fill out the required <span class="text-red-300">*</span> field configuration below.
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
  </template>

<script>
import { computed } from 'vue'

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
    showStartLabel: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'toggle-section', 'help'],
  setup(props, { emit }) {
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
      isParserSectionInvalid,
      getDefaultValue,
      updateField
    }
  }
}
</script>
