import HelpSidebar from '../components/HelpSidebar.vue'
import ParserRepository from '../components/ParserRepository.vue'
import { ref } from 'vue'

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

  const toggleSection = (section) => {
    const wasOpen = openSection.value === section
    openSection.value = wasOpen ? null : section
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
    showRepository
  }
}