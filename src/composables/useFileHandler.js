import { readFileContent } from '../utils/file'
import { ref } from 'vue'
import { validateAliases } from '../utils/validation'

export function useFileHandler({
  parserSection,
  fieldSections,
  hasStarted,
  openSection,
  resetParser,
  validationErrors,
  addFieldSection,
  validateField
}) {
  const fileError = ref('')
  const uploadisDisabled = ref(false)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) {
      fileError.value = 'No file selected'
      return
    }

    if (!file.name.toLowerCase().endsWith('.ini') && !file.name.toLowerCase().endsWith('.txt')) {
      fileError.value = 'Invalid file type. Please upload an .ini or .txt file'
      return
    }

    try {
      const content = await readFileContent(file)
      parseIniContent(content)
      fileError.value = ''
    } catch (error) {
      fileError.value = `Error reading file: ${error.message}`
    }
  }

  const loadSampleData = () => {
    const samplePath = './parser/parser_desc_min.txt'
    fetch(samplePath)
      .then(response => response.text())
      .then(content => {
        parseIniContent(content)
      })
      .catch(error => {
        fileError.value = `Error loading sample data: ${error.message}`
      })
  }

  const parseIniContent = (content) => {
    try {
      resetParser()
      fileError.value = ''
      validationErrors.value = {}

      hasStarted.value = true
      openSection.value = 'parser'

      let currentSection = null
      let currentAliases = []
      let currentFieldIndex = -1
      const lines = content.split('\n')

      // Clear existing fields
      fieldSections.value = []

      for (let line of lines) {
        line = line.trim()

        if (!line || line.startsWith('#')) continue

        if (line.startsWith('[') && line.endsWith(']')) {
          if (currentSection === 'field' && currentAliases.length > 0 && 
              fieldSections.value.length > 0) {
            const currentField = fieldSections.value[fieldSections.value.length - 1]
            const aliasesString = currentAliases.join('\n')
            
            const validationError = validateAliases(aliasesString)
            if (validationError) {
              validationErrors.value[`field-${currentFieldIndex}-aliases`] = validationError
            }
            currentField.aliases = aliasesString
          }
          
          currentSection = line.slice(1, -1).toLowerCase()
          currentAliases = []
          
          if (currentSection === 'field') {
            currentFieldIndex++
            addFieldSection()
          }
          continue
        }

        if (currentSection) {
          if (line.startsWith('@')) {
            currentAliases.push(line)
          } else if (line.includes('=')) {
            const [key, ...valueParts] = line.split('=')
            const trimmedKey = key.trim()
            const value = valueParts.join('=').trim()

            if (currentSection === 'parser') {
              if (trimmedKey in parserSection.value) {
                parserSection.value[trimmedKey] = value
              }
            } else if (currentSection === 'field' && fieldSections.value.length > 0) {
              const currentField = fieldSections.value[fieldSections.value.length - 1]
              if (trimmedKey in currentField) {
                currentField[trimmedKey] = value
              }
            }
          }
        }
      }

      if (currentSection === 'field' && currentAliases.length > 0 && 
          fieldSections.value.length > 0) {
        const currentField = fieldSections.value[fieldSections.value.length - 1]
        const aliasesString = currentAliases.join('\n')
        
        const validationError = validateAliases(aliasesString)
        if (validationError) {
          validationErrors.value[`field-${currentFieldIndex}-aliases`] = validationError
        }
        currentField.aliases = aliasesString
      }

      fieldSections.value.forEach((field, index) => {
        validateField(index, field.name)
      })
    } catch (error) {
      fileError.value = `Error parsing INI content: ${error.message}`
      console.error('Error parsing INI content:', error)
    }
  }

  const triggerFileUpload = () => {
    document.querySelector('#file-upload').click()
  }

  return {
    fileError,
    uploadisDisabled,
    handleFileUpload,
    loadSampleData,
    triggerFileUpload,
    parseIniContent
  }
}