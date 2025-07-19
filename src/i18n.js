import { createI18n } from 'vue-i18n'
import tr from './locales/tr.js'
import en from './locales/en.js'

const i18n = createI18n({
  legacy: false, // Composition API için
  locale: 'tr', // Varsayılan dil
  fallbackLocale: 'en', // Eğer bir çeviri bulunamazsa İngilizce'ye dön
  messages: {
    tr,
    en
  }
})

export default i18n 