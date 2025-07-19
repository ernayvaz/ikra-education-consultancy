<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted, watchEffect } from 'vue'

const { locale, t } = useI18n()

const isOpen = ref(false)
const isMounted = ref(false)

const languages = computed(() => [
  { code: 'tr', name: t('languageSwitcher.tr'), nativeName: 'Türkçe' },
  { code: 'en', name: t('languageSwitcher.en'), nativeName: 'English' }
])

const currentLanguage = computed(() => {
  return languages.value.find(lang => lang.code === locale.value)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const changeLanguage = (langCode) => {
  locale.value = langCode
  isOpen.value = false
  localStorage.setItem('ikra-language', langCode)
}

const closeDropdown = (event) => {
  // Close dropdown when clicking outside
  if (isOpen.value && !event.target.closest('.language-switcher')) {
    isOpen.value = false
  }
}

onMounted(() => {
  // Check saved language preference
const savedLanguage = localStorage.getItem('ikra-language')
if (savedLanguage) {
  locale.value = savedLanguage
}
  
  // Add click event listener to document
  document.addEventListener('click', closeDropdown)
  
  // Set mounted flag for animations
  setTimeout(() => {
    isMounted.value = true
  }, 100)
})

watchEffect(() => {
  // Update document language attribute when locale changes
  if (document && document.documentElement) {
    document.documentElement.setAttribute('lang', locale.value)
  }
})
</script>

<template>
  <div class="language-switcher">
    <button 
      class="language-button" 
      :class="{ 'is-open': isOpen }"
      @click.stop="toggleDropdown"
      aria-haspopup="true"
      :aria-expanded="isOpen"
    >
      <span class="language-code">{{ currentLanguage.code.toUpperCase() }}</span>
      <span class="language-divider"></span>
      <svg class="language-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    </button>
    
    <transition name="dropdown">
      <div v-if="isOpen" class="language-dropdown" role="menu">
      <button 
        v-for="lang in languages" 
        :key="lang.code" 
        @click="changeLanguage(lang.code)"
        class="language-option"
        :class="{ 'active': lang.code === locale }"
          role="menuitem"
      >
          <span class="language-native">{{ lang.nativeName }}</span>
          <svg v-if="lang.code === locale" class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
      </button>
    </div>
    </transition>
  </div>
</template>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
  z-index: 1100;
  font-family: 'Poppins', sans-serif;
  margin-left: 1rem;
}

.language-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  padding: 0.35rem 0.7rem;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  gap: 0.45rem;
  min-width: 68px;
  height: 32px;
}

.language-button:hover {
  background-color: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.language-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15);
}

.language-button.is-open {
  background-color: rgba(255, 255, 255, 0.06);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.language-code {
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 0.8rem;
}

.language-divider {
  width: 1px;
  height: 14px;
  background-color: rgba(255, 255, 255, 0.2);
}

.language-icon {
  color: rgba(255, 255, 255, 0.85);
  transition: transform 0.3s ease;
  width: 16px;
  height: 16px;
}

.is-open .language-icon {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background-color: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.05);
  min-width: 120px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform-origin: top center;
}

.language-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.7rem 1rem;
  border: none;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.85rem;
  text-align: left;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.language-option:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.language-option.active {
  background-color: rgba(220, 53, 69, 0.08);
  color: var(--primary-color);
  font-weight: 600;
}

.language-native {
  font-size: 0.85rem;
}

.check-icon {
  color: var(--primary-color);
  stroke-width: 2.5;
  width: 14px;
  height: 14px;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
  transform: translateY(-8px) scale(0.95);
  }

@media (max-width: 768px) {
  .language-switcher {
    margin-left: 0.5rem;
  }
  
  .language-button {
    padding: 0.35rem 0.7rem;
    min-width: 68px;
    height: 32px;
    font-size: 0.85rem;
  }
  
  .language-code {
    font-size: 0.8rem;
  }
  
  .language-divider {
    height: 14px;
  }
  
  .language-icon {
    width: 16px;
    height: 16px;
  }
  
  .language-dropdown {
    min-width: 120px;
    right: 0;
    top: calc(100% + 8px);
  }
  
  .language-option {
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
  }
}
</style> 