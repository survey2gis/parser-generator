import './assets/tailwind.css'

import App from './App.vue'
import { createApp } from 'vue'
import i18n from './i18n'

const app = createApp(App)

// Register directive before mounting
app.directive('click-outside', {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      // Check if binding.value is a function before calling it
      if (!(el === event.target || el.contains(event.target))) {
        if (typeof binding.value === 'function') {
          binding.value(event)
        }
      }
    }
    document.body.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    if (el._clickOutside) {
      document.body.removeEventListener('click', el._clickOutside)
      delete el._clickOutside
    }
  }
})

app.use(i18n)
app.mount('#app')