import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n.js'
import { clickOutside } from './directives/clickOutside.js'

const app = createApp(App)

// Global direktifleri kaydet
app.directive('click-outside', clickOutside)

app.use(i18n)
  .mount('#app')
