import { nextTick, ref, watch } from 'vue'

import { highlightElement } from '../utils/prism-setup'

export function useIniGenerator(parserSection, fieldSections) {
  const generatedIni = ref('')

  const generateIni = () => {
    let ini = '[Parser]\n'
    
    const parserEntries = Object.entries(parserSection.value)
      .filter(([, value]) => value !== '')
      .map(([key, value]) => `${key} = ${value}`)
      .join('\n')
    ini += parserEntries

    fieldSections.value.forEach((field) => {
      ini += '\n\n[Field]\n'
      
      const regularFields = Object.entries(field)
        .filter(([key, value]) => key !== 'aliases' && value !== '')
        .map(([key, value]) => `${key} = ${value}`)
        .join('\n')
      ini += regularFields

      if (field.aliases) {
        const validAliases = field.aliases
          .split('\n')
          .filter(line => line.trim() && !line.includes('error'))
          .map(line => {
            line = line.trim()
            if (line.startsWith('@')) {
              const [keyPart, ...valueParts] = line.split('=')
              const key = keyPart.trim()
              const value = valueParts.join('=').trim()
              return `${key} = ${value}`
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

    generatedIni.value = ini + '\n'

    // Update syntax highlighting after content changes
    nextTick(() => {
      const codeElement = document.querySelector('.code__field')
      if (codeElement) {
        highlightElement(codeElement)
      }
    })
  }

  // Watch for changes and regenerate INI
  watch([parserSection, fieldSections], generateIni, { deep: true })

  const downloadIni = () => {
    const blob = new Blob([generatedIni.value], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'survey2gis_parser.ini'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return {
    generatedIni,
    generateIni,
    downloadIni
  }
}