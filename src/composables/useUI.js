import { nextTick, ref } from 'vue'

export function useUI() {
  const showHelpSidebar = ref(false)
  const currentHelpSection = ref('')
  const showStartLabel = ref(true)
  const isDropdownOpen = ref(false)
  const showToast = ref(false)
  const openSection = ref('')

  const showHelp = (section) => {
    currentHelpSection.value = section
    showHelpSidebar.value = true
  }

  const closeHelp = () => {
    showHelpSidebar.value = false
    currentHelpSection.value = ''
  }

  const closeToast = () => {
    showToast.value = false
  }

  const closeDropdown = () => {
    isDropdownOpen.value = false
  }

  const toggleSection = (section) => {
    const wasOpen = openSection.value === section
    openSection.value = wasOpen ? null : section

    if (!wasOpen && section !== null) {
      scrollToSection(section)
    }
  }

  const scrollToSection = (section) => {
    nextTick(() => {
      const scrollContainer = document.querySelector('.code__wrapper')
      const preElement = document.querySelector('.code__field')
      const leftPanelItems = document.querySelectorAll('.left-panel .section')

      if (!scrollContainer || !preElement || !leftPanelItems.length) {
        console.error('Required elements not found')
        return
      }

      const lines = document.querySelector('.code__field').textContent.split('\n')
      let targetLineIndex = 0

      if (section === 'parser') {
        targetLineIndex = lines.findIndex(line => line.trim() === '[Parser]')
      } else {
        let fieldCount = -1
        targetLineIndex = lines.findIndex((line) => {
          if (line.trim() === '[Field]') {
            fieldCount++
            if (fieldCount === section) {
              return true
            }
          }
          return false
        })
      }

      if (targetLineIndex === -1) {
        console.error('Target section not found')
        return
      }

      const lineHeight = parseInt(window.getComputedStyle(preElement).lineHeight) || 20
      const scrollPosition = targetLineIndex * lineHeight

      let leftPanelItem
      if (section === 'parser') {
        leftPanelItem = Array.from(leftPanelItems).find(item => item.textContent.includes('Parser'))
      } else {
        leftPanelItem = leftPanelItems[section]
      }

      if (!leftPanelItem) {
        console.error(`Left panel item for section ${section} not found`)
        return
      }

      const leftPanelY = leftPanelItem.getBoundingClientRect().top
      const scrollContainerTop = scrollContainer.getBoundingClientRect().top
      let targetScrollPosition = scrollPosition + (leftPanelY - scrollContainerTop)

      const initialSectionOffset = 30
      if (section === 'parser' || section <= 2) {
        targetScrollPosition -= initialSectionOffset
      }

      scrollContainer.scrollTo({
        top: Math.max(0, targetScrollPosition),
        behavior: 'smooth'
      })
    })
  }

  return {
    showHelpSidebar,
    currentHelpSection,
    showStartLabel,
    isDropdownOpen,
    showToast,
    openSection,
    showHelp,
    closeHelp,
    closeToast,
    closeDropdown,
    toggleSection,
    scrollToSection
  }
}