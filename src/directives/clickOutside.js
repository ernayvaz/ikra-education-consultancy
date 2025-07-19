export const clickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = event => {
      // Eğer tıklanan element veya alt elementlerden biri değilse
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
} 