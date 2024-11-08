import Prism from 'prismjs'

export const setupPrism = () => {
  // Define custom language for INI files
  Prism.languages.ini = {
    'comment': /#.*/,
    'section': {
      pattern: /^\s*\[.*?\]/m,
      inside: {
        'section-name': {
          pattern: /\[.*?\]/,
          inside: {
            'punctuation': /\[|\]/
          }
        }
      }
    },
    'key': {
      pattern: /^\s*[^\s=]+(?=\s*=)/m,
      alias: 'attr-name'
    },
    'value': {
      pattern: /=.*/,
      alias: 'attr-value',
      inside: {
        'punctuation': /^=/,
        'number': /\b\d+\.?\d*\b/,
        'boolean': /\b(?:yes|no|true|false)\b/i,
        'string': /'[^']*'|"[^"]*"|[^=\s]+/,
        'type': /\b(?:integer|double|text)\b/i
      }
    }
  }

  // Add custom styling
  const additionalStyles = `
    .token.number {
      color: #f08d49 !important;
    }
    .token.boolean {
      color: #7ec699 !important;
    }
    .token.string {
      color: #f1fa8c !important;
    }
    .token.type {
      color: #bd93f9 !important;
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
  `

  // Add styles to document head
  const styleElement = document.createElement('style')
  styleElement.textContent = additionalStyles
  document.head.appendChild(styleElement)
}

// Optional: Add a function to highlight specific elements
export const highlightElement = (element) => {
  if (element) {
    Prism.highlightElement(element)
  }
}

// Optional: Add a function to highlight all code blocks
export const highlightAll = () => {
  document.querySelectorAll('pre code').forEach((block) => {
    Prism.highlightElement(block)
  })
}

// Optional: Add a function to clean up Prism (if needed)
export const cleanupPrism = () => {
  // Remove custom styles
  const customStyles = document.querySelector('style[data-prism-custom]')
  if (customStyles) {
    customStyles.remove()
  }
}