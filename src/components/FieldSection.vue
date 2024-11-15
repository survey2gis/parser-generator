<!-- components/FieldSection.vue -->
<template>
    <div 
      class="shadow mb-3 rounded-lg section" 
      :class="isFieldSectionInvalid ? 'bg-red-100' : 'bg-white'"
    >
      <div class="p-4">
        <!-- Header -->
        <div 
          class="flex justify-between items-center cursor-pointer"
          @click="$emit('toggle-section', index)"
        >
          <div class="flex items-center">
            <h3 class="text-lg font-semibold">Field Section {{ index + 1 }} </h3>

            <i 
            v-if="!isFieldSectionInvalid"
            class="pi pi-check-circle text-lg ml-2 text-green-500"
            ></i>
            <i 
            v-if="isFieldSectionInvalid"
            class="pi pi-times text-lg ml-2 text-red-500"
            ></i>
            <span class="ms-2 text-gray-400">{{ modelValue.name }}</span>
          </div>
          <div class="flex items-center">
            <button 
              @click.stop="$emit('help', 'field')" 
              class="text-blue-500 hover:text-blue-600 mr-2"
            >
              <i class="pi pi-question-circle"></i>
            </button>
            <button 
              @click.stop="$emit('remove', index)" 
              class="text-red-500"
            >
              <i class="pi pi-trash"></i>
            </button>
            <i 
            class="pi pi-chevron-down text-lg ml-2 transform transition-transform"
            :class="{'rotate-180': isOpen}"
            ></i>
          </div>
        </div>
  
        <!-- Field Content -->
        <div v-show="isOpen" class="mt-4">
            <p class="text-gray-400 mb-4">
            Fill out the required <span class="text-red-300">*</span> field configuration below.
          </p>
          <div class="grid grid-cols-2 gap-3">
            <!-- Name field -->
            <div class="col-span-2">
              <label class="text-xs font-medium text-gray-700">
                Name
                <span class="text-red-500">*</span>
              </label>
              <input
                :value="modelValue.name"
                @input="updateField('name', $event.target.value)"
                type="text"
                class="w-full border rounded p-1 text-sm"
                :class="{'border-red-500': !modelValue.name || validationErrors[`field-${index}`]}"
              />
              <p v-if="validationErrors[`field-${index}`]" class="text-xs text-red-500 mt-1">
                {{ validationErrors[`field-${index}`].join(', ') }}
              </p>
            </div>
  
            <!-- Info field -->
            <div class="col-span-2">
              <label class="text-xs font-medium text-gray-700">Info</label>
              <textarea
                :value="modelValue.info"
                @input="updateField('info', $event.target.value)"
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
              <select 
                :value="modelValue.type"
                @change="updateField('type', $event.target.value)"
                class="w-full border rounded p-1 text-sm"
              >
                <option value="integer">integer</option>
                <option value="double">double</option>
                <option value="text">text</option>
              </select>
            </div>
  
            <!-- Change Case field -->
            <div class="mb-2">
              <label class="text-xs font-medium text-gray-700">Change Case</label>
              <select 
                :value="modelValue.change_case"
                @change="updateField('change_case', $event.target.value)"
                class="w-full border rounded p-1 text-sm"
              >
                <option value="lower">lower</option>
                <option value="upper">upper</option>
              </select>
            </div>
  
            <!-- Empty Allowed field -->
            <div class="mb-2">
              <label class="text-xs font-medium text-gray-700">Empty Allowed</label>
              <select 
                :value="modelValue.empty_allowed"
                @change="updateField('empty_allowed', $event.target.value)"
                class="w-full border rounded p-1 text-sm"
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>
  
            <!-- Merge Separators field -->
            <div class="mb-2">
              <label class="text-xs font-medium text-gray-700">Merge Separators</label>
              <select 
                :value="modelValue.merge_separators"
                @change="updateField('merge_separators', $event.target.value)"
                class="w-full border rounded p-1 text-sm"
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>
  
            <!-- Persistent field -->
            <div class="mb-2">
              <label class="text-xs font-medium text-gray-700">Persistent</label>
              <select 
                :value="modelValue.persistent"
                @change="updateField('persistent', $event.target.value)"
                class="w-full border rounded p-1 text-sm"
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>
  
            <!-- Skip field -->
            <div class="mb-2">
              <label class="text-xs font-medium text-gray-700">Skip</label>
              <select 
                :value="modelValue.skip"
                @change="updateField('skip', $event.target.value)"
                class="w-full border rounded p-1 text-sm"
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>
  
            <!-- Unique field -->
            <div class="mb-2">
              <label class="text-xs font-medium text-gray-700">Unique</label>
              <select 
                :value="modelValue.unique"
                @change="updateField('unique', $event.target.value)"
                class="w-full border rounded p-1 text-sm"
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>
  
            <!-- Quotation and Separator fields -->
            <div class="mb-2">
              <label class="text-xs font-medium text-gray-700">Quotation</label>
              <input
                :value="modelValue.quotation"
                @input="updateField('quotation', $event.target.value)"
                type="text"
                class="w-full border rounded p-1 text-sm"
                placeholder="'"
              />
            </div>
  
            <div class="mb-2">
              <label class="text-xs font-medium text-gray-700">Separator</label>
              <input
                :value="modelValue.separator"
                @input="updateField('separator', $event.target.value)"
                type="text"
                class="w-full border rounded p-1 text-sm"
                placeholder=";"
              />
            </div>

            <div class="col-span-2 mb-2">
  <div class="flex justify-between items-center">
    <label class="text-xs font-medium text-gray-700">Aliases</label>
    <span class="text-xs text-gray-400">Optional</span>
  </div>
  <textarea
    :value="modelValue.aliases"
    @input="updateField('aliases', $event.target.value)"
    class="w-full border rounded p-1 text-sm font-mono"
    :class="{
      'border-red-500': aliasesValidationError || validationErrors[`field-${index}-aliases`]
    }"
    rows="4"
    placeholder="@key=value&#10;@key2=value2&#10;@key3=value3"
    spellcheck="false"
  ></textarea>
  <p v-if="aliasesValidationError || validationErrors[`field-${index}-aliases`]" 
     class="text-xs text-red-500 mt-1">
    {{ aliasesValidationError || validationErrors[`field-${index}-aliases`] }}
  </p>
  <p class="text-xs text-gray-500 mt-1">
    Add one alias per line using the format @key=value
  </p>
</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { computed, ref, onUnmounted } from 'vue'

export default {
  name: 'FieldSection',
  
  props: {
    modelValue: {
      type: Object,
      required: true,
      default: () => ({
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
    },
    index: {
      type: Number,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    validationErrors: {
      type: Object,
      default: () => ({})
    },
    mandatoryFields: {
      type: Array,
      default: () => ['name', 'type']
    }
  },

  emits: ['update:modelValue', 'remove', 'toggle-section', 'help', 'validate'],

  setup(props, { emit }) {
    const aliasesValidationError = ref('')
    const validationTimeout = ref(null)

    const validateAliases = (value) => {
  if (!value) return null // Empty is valid as it's optional

  const lines = value.split('\n').filter(line => line.trim())
  const keys = new Set()
  const lowercaseKeys = new Set()

  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue

    // Check basic format
    if (!line.startsWith('@')) {
      return 'Each line must start with @'
    }

    // Split into key and value, preserving original spacing
    const [keyPart, ...valueParts] = line.substring(1).split('=')
    const key = keyPart.trim()
    const value = valueParts.join('=').trim()
    
    if (!key || !value) {
      return 'Each line must be in format @key=value'
    }

    // Only check for internal spaces in key and value
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
}

const updateField = (key, value) => {
    if (key === 'aliases') {
        // Always update the value first
        const updatedField = { ...props.modelValue, [key]: value }
        emit('update:modelValue', updatedField)

        // Validate with debounce
        if (validationTimeout.value) clearTimeout(validationTimeout.value)
        
        validationTimeout.value = setTimeout(() => {
            const error = validateAliases(value)
            aliasesValidationError.value = error

            // Emit validation result to parent
            emit('validate', props.index, 'aliases', error)
        }, 300)
    } else {
        const updatedField = { ...props.modelValue, [key]: value }
        emit('update:modelValue', updatedField)
        
        if (key === 'name') {
            emit('validate', props.index, 'name', value)
        }
    }
}
    // Clean up timeout when component unmounts
    onUnmounted(() => {
      if (validationTimeout.value) {
        clearTimeout(validationTimeout.value)
      }
    })

    const isFieldSectionInvalid = computed(() => {
  // Check for aliases validation errors
  const hasAliasesError = aliasesValidationError.value || 
                         props.validationErrors[`field-${props.index}-aliases`]
  
  // Check for existing validation errors
  const hasExistingErrors = props.validationErrors[`field-${props.index}`]
  
  // Check mandatory fields
  const hasMissingMandatory = props.mandatoryFields.some(fieldName => 
    !props.modelValue[fieldName] || props.modelValue[fieldName].trim() === ''
  )

  return hasAliasesError || hasExistingErrors || hasMissingMandatory
})

    return {
      isFieldSectionInvalid,
      updateField,
      aliasesValidationError
    }
  }
}
  </script>