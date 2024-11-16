import { validateAliases, validateFieldName } from '../utils/validation'

import { DEFAULT_FIELD } from '../constants/parser'
import { ref } from 'vue'

export function useFields() {
  const fieldSections = ref([])
  const validationErrors = ref({})

  const cleanupValidationErrors = (removedIndex) => {
    // Create new object to store shifted errors
    const newErrors = {}

    Object.entries(validationErrors.value).forEach(([key, value]) => {
      const fieldMatch = key.match(/field-(\d+)/)
      if (fieldMatch) {
        const fieldIndex = parseInt(fieldMatch[1])
        
        // Skip errors for the removed field
        if (fieldIndex === removedIndex) {
          return
        }

        // Keep errors for fields before the removed one
        if (fieldIndex < removedIndex) {
          newErrors[key] = value
          return
        }

        // Shift errors for fields after the removed one
        if (fieldIndex > removedIndex) {
          const newIndex = fieldIndex - 1
          const newKey = key.replace(`field-${fieldIndex}`, `field-${newIndex}`)
          newErrors[newKey] = value
        }
      }
    })

    validationErrors.value = newErrors
  }

  const removeFieldSection = (fieldIndex) => {
    fieldSections.value.splice(fieldIndex, 1)
    cleanupValidationErrors(fieldIndex)
  }

  const validateField = (fieldIndex, fieldName, value) => {
    const errorKey = fieldName === 'aliases' 
      ? `field-${fieldIndex}-aliases`
      : `field-${fieldIndex}`

    // Clear existing error for this field
    const newErrors = { ...validationErrors.value }
    delete newErrors[errorKey]

    // Perform validation
    if (fieldName === 'aliases') {
      const aliasError = value ? validateAliases(value) : null
      if (aliasError) {
        newErrors[errorKey] = aliasError
      }
    } else {
      const errors = validateFieldName(value)
      if (errors.length > 0) {
        newErrors[errorKey] = errors
      }
    }

    validationErrors.value = newErrors
  }

  const addFieldSection = () => {
    const newIndex = fieldSections.value.length
    fieldSections.value.push({ ...DEFAULT_FIELD })
    return newIndex
  }

  return {
    fieldSections,
    validationErrors,
    validateField,
    addFieldSection,
    removeFieldSection
  }
}