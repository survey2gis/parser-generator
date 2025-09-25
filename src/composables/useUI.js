import { nextTick, ref } from 'vue'

import FormatDetector from '../components/FormatDetector.vue'
import HelpSidebar from '../components/help/HelpSidebar.vue'
import ParserRepository from '../components/ParserRepository.vue'

export function useUI() {
  const showSidebar = ref(false)
  const sidebarConfig = ref({
    title: '',
    component: null,
    props: {}
  })
  
  const showStartLabel = ref(true)
  const isDropdownOpen = ref(false)
  const showToast = ref(false)
  const openSection = ref('')

  const scrollToSection = (section, iniContent) => {
    nextTick(() => {
      // First scroll the code section
      const codeWrapper = document.querySelector('.code__wrapper')
      const codeElement = document.querySelector('.code__field')
      
      if (!codeWrapper || !codeElement) {
        console.error('Required elements not found')
        return
      }
  
      // Split content into lines and find target section
      const lines = iniContent.split('\n')
      let targetLineIndex = -1
  
      // Find the section index
      if (section === 'parser') {
        targetLineIndex = lines.findIndex(line => line.trim().toLowerCase() === '[parser]')
      } else {
        let currentField = -1
        targetLineIndex = lines.findIndex(line => {
          if (line.trim().toLowerCase() === '[field]') {
            currentField++
            return currentField === section
          }
          return false
        })
      }
  
      if (targetLineIndex === -1) {
        console.error('Target section not found')
        return
      }
  
      // Get the computed styles and calculate code scroll position
      const styles = window.getComputedStyle(codeElement)
      const lineHeight = parseFloat(styles.lineHeight) || 21
      const wrapperPadding = parseFloat(window.getComputedStyle(codeWrapper).paddingTop) || 0
      const targetPosition = (targetLineIndex * lineHeight) - wrapperPadding
  
      // Scroll code wrapper
      codeWrapper.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      })
  
      // After 1 second, scroll the left panel section into view
      setTimeout(() => {
        // Find the left panel section
        const leftPanel = document.querySelector('.left-panel')
        if (!leftPanel) return
  
        let targetSection
        if (section === 'parser') {
          targetSection = leftPanel.querySelector('.section')  // First section is parser
        } else {
          const sections = Array.from(leftPanel.querySelectorAll('.section'))
          targetSection = sections[section + 1]  // +1 because parser is first
        }
  
        if (targetSection) {
          // Calculate target position relative to left panel
          const leftPanelTop = leftPanel.getBoundingClientRect().top
          const sectionTop = targetSection.getBoundingClientRect().top
          const scrollTop = leftPanel.scrollTop + (sectionTop - leftPanelTop)
  
          // Scroll left panel
          leftPanel.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })
        }
      }, 200)  // 1 second delay
  
      // Debug info
      console.log({
        targetLineIndex,
        lineHeight,
        wrapperPadding,
        targetPosition,
        currentScroll: codeWrapper.scrollTop,
        wrapperHeight: codeWrapper.clientHeight,
        totalHeight: codeElement.clientHeight
      })
    })
  }
  
  const showFormatDetector = () => {
    sidebarConfig.value = {
      title: 'Format Detector',
      component: FormatDetector,
      props: {}
    }
    showSidebar.value = true
    closeDropdown()
  }

  const showHelp = (section) => {
    const titles = {
      parser: 'Parser Section Help',
      field: 'Field Section Help',
      imprint: 'Imprint',
      help: 'Help'
    }
    
    sidebarConfig.value = {
      title: titles[section] || '',
      component: HelpSidebar,
      props: { section }
    }
    showSidebar.value = true
  }

  const showComponent = (component, title, props = {}) => {
    sidebarConfig.value = {
      title,
      component,
      props
    }
    showSidebar.value = true
  }

  const closeSidebar = () => {
    showSidebar.value = false
  }

  const closeToast = () => {
    showToast.value = false
  }

  const closeDropdown = () => {
    isDropdownOpen.value = false
  }

  const toggleSection = (section, iniContent) => {
    const wasOpen = openSection.value === section
    openSection.value = wasOpen ? null : section
    
    // Add scroll to code section if not closing
    if (!wasOpen && iniContent) {
      scrollToSection(section, iniContent)
    }
  }

  const showRepository = () => {
    sidebarConfig.value = {
      title: 'Parser Repository',
      component: ParserRepository,
      props: {}
    }
    showSidebar.value = true
  }

  return {
    showSidebar,
    sidebarConfig,
    showStartLabel,
    isDropdownOpen,
    showToast,
    openSection,
    showHelp,
    showComponent,
    closeSidebar,
    closeToast,
    closeDropdown,
    toggleSection,
    showRepository,
    showFormatDetector
  }
}