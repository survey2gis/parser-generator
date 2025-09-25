<template>
  <component :is="localizedComponent" :section="section" />
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HelpSidebarDe from './HelpSidebarDe.vue'
import HelpSidebarEn from './HelpSidebarEn.vue'

defineProps({
  section: {
    type: String,
    required: true
  }
})

const { locale } = useI18n()

const localizedComponent = computed(() => {
  return locale.value === 'de' ? HelpSidebarDe : HelpSidebarEn
})
</script>