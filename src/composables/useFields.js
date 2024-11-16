import { DEFAULT_FIELD } from '../constants/parser'
import { ref } from 'vue'
import { validateFieldName } from '../utils/validation'

export function useFields() {
  const fieldSections = ref([])
  const validationErrors = ref({})

  const validateField = (fieldIndex, fieldName, value) => {
    if (fieldName === 'aliases') {
      if (value) {
        validationErrors.value = {
          ...validationErrors.value,
          [`field-${fieldIndex}-aliases`]: value
        }
      } else {
        const newErrors = { ...validationErrors.value }
        delete newErrors[`field-${fieldIndex}-aliases`]
        validationErrors.value = newErrors
      }
      return
    }

    const errors = validateFieldName(value)
    if (errors.length > 0) {
      validationErrors.value = {
        ...validationErrors.value,
        [`field-${fieldIndex}`]: errors
      }
    } else {
      const newErrors = { ...validationErrors.value }
      delete newErrors[`field-${fieldIndex}`]
      validationErrors.value = newErrors
    }
  }

  const addFieldSection = () => {
    fieldSections.value.push({ ...DEFAULT_FIELD })
    return fieldSections.value.length - 1
  }

  const removeFieldSection = (fieldIndex) => {
    fieldSections.value.splice(fieldIndex, 1)
    const newErrors = { ...validationErrors.value }
    delete newErrors[`field-${fieldIndex}`]
    validationErrors.value = newErrors
  }

  return {
    fieldSections,
    validationErrors,
    validateField,
    addFieldSection,
    removeFieldSection
  }
}